const { TEMPLATE } = require('../constants/template.constant');
const db = require('../models/index.model');
const { sendMail } = require('../utils/email.util');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const dayjs = require('dayjs');
const { verifyTransaction, writeContract } = require('./web3.service');

//----------------------------------ADMIN-------------------------------------
// GET TOPIC ADMIN
const getTopicAdmin = async () => {
  try {
    const response = await db.tb_contest_topic.findAll();
    return handleSuccess(response, 'Get topic successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GET TIMELINE ADMIN
const getTimelineAdmin = async () => {
  try {
    const response = await db.tb_contest_timeline.findAll();
    return handleSuccess(response, 'Get timeline successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// UPDATE TOPIC
const updateTopic = async ({ id, ...data }) => {
  try {
    await db.tb_contest_topic.update({ ...data }, { where: { id } });
    return handleSuccess(null, 'Update topic successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// UPDATE TIMELINE
const updateTimeline = async ({ id, ...data }) => {
  try {
    await db.tb_contest_timeline.update({ ...data }, { where: { id } });
    return handleSuccess(null, 'Update timeline successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// DELETE TIMELINE
const deleteTimeline = async (id) => {
  try {
    await db.tb_contest_timeline.destroy({ where: { id } });
    return handleSuccess(null, 'Delete timeline successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// REGISTRATION DEADLINE
const registrationDeadline = async ({ end_time }) => {
  try {
    const time = dayjs(end_time).unix();

    // call contract
    const contract = await writeContract({
      name: 'setRegistrationEndTime',
      data: [time],
    });
    if (!contract.success) return handleFailed('Update deadline registration fail!');

    // update contest timeline
    const timeFormat = dayjs(end_time).format('YYYY-MM-DD');
    await db.tb_contest_timeline.update({ end_time: timeFormat }, { where: { id: 1 } });
    await db.tb_contest_timeline.update(
      {
        start_time: timeFormat,
        end_time: timeFormat,
      },
      { where: { id: 2 } }
    );

    return handleSuccess(null, 'Update deadline registration successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

//----------------------------------CLIENT-------------------------------------
// GET TOPIC
const getTopic = async ({ lang = 'vi' }) => {
  try {
    let attributes = ['id', 'name', 'description', 'link_demo', 'active'];
    if (lang === 'en') {
      attributes = [
        'id',
        ['name_en', 'name'],
        ['description_en', 'description'],
        'link_demo',
        'active',
      ];
    }
    const response = await db.tb_contest_topic.findAll({
      where: { active: true },
      attributes,
    });
    return handleSuccess(response, 'Get topic successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// GET TIMELINE
const getTimeline = async ({ lang = 'vi' }) => {
  try {
    let attributes = ['id', 'title', 'description', 'start_time', 'end_time', 'expected_time'];
    if (lang === 'en') {
      attributes = [
        'id',
        ['title_en', 'title'],
        ['description_en', 'description'],
        'start_time',
        'end_time',
        'expected_time',
      ];
    }
    const today = dayjs().format('YYYY-MM-DD');
    const response = await db.tb_contest_timeline.findAll({
      order: [['start_time', 'ASC']],
      attributes,
    });
    for (const element of response) {
      element.dataValues.status = false;
      if (today >= element.start_time && today <= element.end_time)
        element.dataValues.status = true;
    }
    return handleSuccess(response, 'Get timeline successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// REGISTER TEAM
const registerTeam = async ({ userid, ...data }) =>
  new Promise(async (resolve, reject) => {
    try {
      const user = await db.tb_user.findByPk(userid);
      if (!user || !user?.active || user.role)
        return resolve(handleFailed('Invalid or blocked user !'));

      // check hash
      const checkHash = await verifyTransaction({ hash: data.hash, wallet: user.wallet });
      if (!checkHash) return resolve(handleFailed('Hash invalid !'));

      const { member, ...teamData } = data;
      const checkTopic = await db.tb_contest_topic.findByPk(teamData.topic_id);
      if (!checkTopic) return resolve(handleFailed('Topic invalid!'));

      // run BE
      resolve(handleSuccess(null, 'Register team successfully!'));

      //update team
      const amountNumber = member.length;
      const createTeam = await db.tb_team.create({
        ...teamData,
        amount_member: amountNumber,
        userid,
      });

      user.role = 'LEADER';
      user.team_id = createTeam.id;
      await user.save();

      for (const element of member) {
        let useridMember;
        const checkMember = await db.tb_user.findOne({
          where: { wallet: element.wallet },
        });
        if (checkMember) {
          useridMember = checkMember.id;
          checkMember.team_id = createTeam.id;
          checkMember.role = 'MEMBER';
          await checkMember.save();
        } else {
          const createMember = await db.tb_user.create({
            wallet: element.wallet,
            team_id: createTeam.id,
            role: 'MEMBER',
          });
          useridMember = createMember.id;
        }

        await db.tb_team_member.create({
          team_id: createTeam.id,
          userid: useridMember,
          ...element,
        });
      }

      // // send mail user
      await sendMail(
        TEMPLATE.REGISTER,
        { team_name: data.team_name },
        data.email,
        `Hackathon Pione Dream 2025 | Thông báo`
      );

      // send mail manage
      let memberRows = member
        .map(
          (m, index) =>
            `<li style="line-height: 23.8px;"><span style="color: rgb(0, 0, 0); line-height: 23.8px;">Thành viên ${index}:&nbsp;</span>
            <ul style="list-style-type: square;">
              <li style="line-height: 23.8px;">Tên thành viên: <span style="color: rgb(0, 0, 0); line-height: 19.6px">${m.member_name}</span>&nbsp;</li>
              <li style="line-height: 23.8px;">Email liên hệ: <span style="color: rgb(0, 0, 0); line-height: 19.6px">${m.email}</span>&nbsp;</li>
              <li style="line-height: 23.8px;">Số điện thoại: <span style="color: rgb(0, 0, 0); line-height: 19.6px">${m.phone_number}</span>&nbsp;</li>
              <li style="line-height: 23.8px;">Mã số sinh viên: <span style="color: rgb(0, 0, 0); line-height: 19.6px">${m.student_code}</span>&nbsp;</li>
              <li style="line-height: 23.8px;">Địa chỉ ví: <span style="color: rgb(0, 0, 0); line-height: 19.6px">${m.wallet}</span>&nbsp;</li>
            </ul>
          </li>`
        )
        .join('');
      const mailManage = process.env.MAIL_MANAGE;
      await sendMail(
        TEMPLATE.MANAGE_REGISTER,
        { ...teamData, memberRows, amount_member: amountNumber },
        mailManage,
        `Thông báo Pione Dream 2025 | Đăng ký đội thi mới`
      );
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

// UPDATE TEAM
const updateTeam = ({ userid, ...data }) =>
  new Promise(async (resolve, reject) => {
    try {
      const { members, ...teamData } = data;
      const user = await db.tb_user.findByPk(userid);
      if (!user || !user?.team_id) return resolve(handleFailed('User invalid!'));

      // check hash
      const checkHash = await verifyTransaction({ hash: data.hash, wallet: user.wallet });
      if (!checkHash) return resolve(handleFailed('Hash invalid !'));
      resolve(handleSuccess(null, 'Update team successfully!'));

      // delete
      await db.tb_team.destroy({ where: { id: user.team_id } });
      await db.tb_team_member.destroy({ where: { team_id: user.team_id } });
      await db.tb_user.update(
        {
          team_id: null,
          role: null,
        },
        {
          where: {
            team_id: user.team_id,
            role: 'MEMBER',
          },
        }
      );

      //create
      const amountNumber = members.length;
      const createTeam = await db.tb_team.create({
        ...teamData,
        amount_member: amountNumber,
        userid,
      });

      user.team_id = createTeam.id;
      await user.save();

      for (const element of members) {
        let useridMember;
        const checkMember = await db.tb_user.findOne({
          where: { wallet: element.address_wallet },
        });
        if (checkMember) {
          useridMember = checkMember.id;
          checkMember.team_id = createTeam.id;
          checkMember.role = 'MEMBER';
          await checkMember.save();
        } else {
          const createMember = await db.tb_user.create({
            wallet: element.address_wallet,
            team_id: createTeam.id,
            role: 'MEMBER',
          });
          useridMember = createMember.id;
        }

        await db.tb_team_member.create({
          team_id: createTeam.id,
          userid: useridMember,
          wallet: element.address_wallet,
          ...element,
        });
      }
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });

// SUBMIT PRELIMINARY
const submitPreliminary = async ({ userid, ...data }) => {
  try {
    const team = await db.tb_team.findOne({
      where: { userid },
    });
    if (!team) return handleFailed('Team not found or user is not a leader!');

    const checkContest = await db.tb_contest.findOne({
      where: { team_id: team.id },
    });
    if (checkContest) return handleFailed('Each team can only submit once!');
    await db.tb_contest.create({ team_id: team.id, ...data });

    await sendMail(
      TEMPLATE.SUBMIT_PRELIMINARY,
      { first_name: data.team_name },
      data.email,
      `Hackathon Pione Dream 2025 | Thông báo nộp bài dự thi thành công`
    );
    return handleSuccess(null, 'Submit preliminary successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// MY TEAM
const myTeam = async (userid) => {
  try {
    const user = await db.tb_user.findByPk(userid);
    if (!user || !user.active) return handleFailed('User invalid!');
    if (!user.team_id) return handleFailed('User not a member of any team!');
    const team = await db.tb_team.findOne({
      where: { id: user.team_id },
      include: [
        {
          model: db.tb_team_member,
          as: 'members',
        },
      ],
    });
    return handleSuccess(team, 'Get my team successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};
module.exports = {
  getTopic,
  getTopicAdmin,
  getTimeline,
  getTimelineAdmin,
  registerTeam,
  registrationDeadline,
  submitPreliminary,
  updateTopic,
  updateTimeline,
  updateTeam,
  deleteTimeline,
  myTeam,
};
