const db = require('../models/index.model');
const { handleSuccess, handleFailed } = require('../utils/handleResponse.util');
const { Op } = require('sequelize');
const { writeContract, readContract } = require('./web3.service');
const ExcelJS = require('exceljs');
const path = require('path');
const _ = require('lodash');

// LIST TEAM
const listTeam = async ({ page = 1, limit = 10, keyword = '', topic_id = '', active = true }) => {
  try {
    let offset = (page - 1) * limit;
    let where = {
      active,
      [Op.or]: [
        { school_name: { [Op.like]: `%${keyword}%` } },
        { team_name: { [Op.like]: `%${keyword}%` } },
      ],
    };
    if (topic_id) where.topic_id = topic_id;

    const response = await db.tb_team.findAndCountAll({
      where,
      attributes: [
        'id',
        'team_name',
        'school_name',
        'faculty_major',
        'topic_id',
        'leader_name',
        'phone_number',
        'email',
        'amount_member',
        'active',
      ],
      offset: Number(offset),
      limit: Number(limit),
      order: [['id', 'DESC']],
    });
    return handleSuccess(response, 'Get list team successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// LIST USER
const listUser = async ({ page = 1, limit = 10, keyword = '', role = '' }) => {
  try {
    let offset = (page - 1) * limit;
    let where = {
      [Op.or]: [{ wallet: { [Op.like]: `%${keyword}%` } }],
    };
    if (role) where.role = role;
    const response = await db.tb_user.findAndCountAll({
      where,
      include: [
        {
          model: db.tb_team,
          as: 'teams',
          attributes: ['id', 'team_name'],
        },
      ],
      offset: Number(offset),
      limit: Number(limit),
    });
    return handleSuccess(response, 'Get list users successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// DETAIL TEAM
const detailTeam = async (id) => {
  try {
    const response = await db.tb_team.findOne({
      where: {
        id,
      },
      include: [
        {
          model: db.tb_team_member,
          as: 'members',
        },
        {
          model: db.tb_user,
          as: 'leader',
          attributes: ['id', 'wallet'],
        },
      ],
    });

    return handleSuccess(response, 'Get detail team successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// DETAIL TEAM
const detailTeamContract = async (id) => {
  try {
    const team = await db.tb_team.findByPk(id);
    if (!team) return handleFailed('Team not found!');
    const user = await db.tb_user.findByPk(team.userid);

    const contract = await readContract({
      name: 'getRegistrationOf',
      data: [user.wallet],
    });
    if (!contract.success) return handleFailed('Invalid team!');

    const safeData = JSON.parse(
      JSON.stringify(contract.data, (key, value) =>
        typeof value === 'bigint' ? value.toString() : value
      )
    );
    return handleSuccess(safeData, 'Get contract detail team successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// LIST CONTEST PRELIMINARY
const listPreliminary = async ({ page = 1, limit = 10, keyword = '' }) => {
  try {
    const offset = (page - 1) * limit;
    const contest = await db.tb_contest.findAndCountAll({
      where: {
        [Op.or]: [
          { team_name: { [Op.like]: `%${keyword}%` } },
          { team_leader: { [Op.like]: `%${keyword}%` } },
        ],
      },
      offset: Number(offset),
      limit: Number(limit),
    });

    return handleSuccess(contest, 'Get list contest premilinary!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// LIST CONTEST SEMIFINAL
const listSemifinal = async ({ page = 1, limit = 10, keyword = '' }) => {
  try {
    const offset = (page - 1) * limit;
    const contest = await db.tb_team.findAndCountAll({
      where: {
        semifinal: true,
        [Op.or]: [
          { team_name: { [Op.like]: `%${keyword}%` } },
          { leader_name: { [Op.like]: `%${keyword}%` } },
        ],
      },
      offset: Number(offset),
      limit: Number(limit),
    });

    return handleSuccess(contest, 'Get list contest semifinal!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// UPDATE TEAM
const updateTeam = async ({ id, members, ...data }) => {
  try {
    await db.tb_team.update({ ...data }, { where: { id } });

    if (members && members.length) {
      await db.tb_team_member.destroy({ where: { team_id: id } });

      for (const element of members) {
        let useridMember;
        const checkMember = await db.tb_user.findOne({
          where: { wallet: element.address_wallet },
        });
        if (checkMember) {
          useridMember = checkMember.id;
          checkMember.team_id = id;
          checkMember.role = 'MEMBER';
          await checkMember.save();
        } else {
          const createMember = await db.tb_user.create({
            wallet: element.address_wallet,
            team_id: id,
            role: 'MEMBER',
          });
          useridMember = createMember.id;
        }
        await db.tb_team_member.create({
          team_id: id,
          userid: useridMember,
          wallet: element.address_wallet,
          ...element,
        });
      }
    }
    return handleSuccess(null, 'Update team successfuly!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// EXPORT EXCEL
const exportExcel = async () => {
  try {
    const team = await db.tb_team.findAll({
      where: { active: true },
      include: [
        {
          model: db.tb_team_member,
          as: 'members',
        },
      ],
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('THÔNG TIN CÁC ĐỘI THI');

    worksheet.columns = [
      { header: 'STT', key: 'col1', width: 10 },
      { header: 'ID', key: 'col2', width: 10 },
      { header: 'TEAM NAME', key: 'col3', width: 30 },
      { header: 'SCHOOL NAME', key: 'col4', width: 30 },
      { header: 'TOPIC', key: 'col5', width: 10 },
      { header: 'LEADER NAME', key: 'col6', width: 30 },
      { header: 'STUDENT CODE', key: 'col7', width: 20 },
      { header: 'PHONE NUMBER', key: 'col8', width: 15 },
      { header: 'EMAIL', key: 'col9', width: 40 },
      { header: 'HASH', key: 'col10', width: 40 },
      { header: 'AMOUNT MEMBER', key: 'col11', width: 15 },
      { header: 'NAME MEMBER', key: 'col12', width: 30 },
      { header: 'EMAIL MEMBER', key: 'col13', width: 40 },
      { header: 'PHONE MEMBER', key: 'col14', width: 15 },
      { header: 'STUDENT CODE MEMBER', key: 'col15', width: 20 },
    ];

    let currentRow = 2;
    let teamRowInfo = [];
    let a = 1;

    for (let teamIndex = 0; teamIndex < team.length; teamIndex++) {
      const item = team[teamIndex];
      const members = item.members || [];
      const memberCount = item?.amount_member;

      teamRowInfo.push({
        teamIndex: teamIndex,
        startRow: currentRow,
        endRow: currentRow + memberCount - 1,
        isEven: teamIndex % 2 === 0,
      });

      for (let col = 1; col <= 11; col++) {
        worksheet.mergeCells(currentRow, col, currentRow + memberCount - 1, col);
      }

      const firstRow = worksheet.getRow(currentRow);
      firstRow.getCell(1).value = a++;
      firstRow.getCell(2).value = item.id;
      firstRow.getCell(3).value = item.team_name;
      firstRow.getCell(4).value = item.school_name;
      firstRow.getCell(5).value = item.topic_id;
      firstRow.getCell(6).value = item.leader_name;
      firstRow.getCell(7).value = item.student_code;
      firstRow.getCell(8).value = item.phone_number;
      firstRow.getCell(9).value = item.email;
      firstRow.getCell(10).value = item.hash;
      firstRow.getCell(11).value = item.amount_member;

      for (let i = 0; i < memberCount; i++) {
        const row = worksheet.getRow(currentRow + i);
        const member = members[i];
        row.getCell(12).value = member?.member_name;
        row.getCell(13).value = member?.email;
        row.getCell(14).value = member?.phone_number;
        row.getCell(15).value = member?.student_code;
      }

      currentRow += memberCount;
    }

    // Style header
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1E90FF' },
      };
      cell.font = { name: 'Times New Roman', color: { argb: 'FFFFFFFF' }, bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    });

    teamRowInfo.forEach((teamInfo) => {
      for (let rowNum = teamInfo.startRow; rowNum <= teamInfo.endRow; rowNum++) {
        const row = worksheet.getRow(rowNum);
        row.eachCell((cell) => {
          cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
          cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: teamInfo.isEven ? { argb: 'FFFDEBD0' } : { argb: 'FFD6EAF8' },
          };
          cell.border = {
            top: { style: 'thin' },
            left: { style: 'thin' },
            bottom: { style: 'thin' },
            right: { style: 'thin' },
          };
        });
      }
    });

    const tempFilePath = path.join(__dirname, 'statistical_team.xlsx');
    await workbook.xlsx.writeFile(tempFilePath);
    return tempFilePath;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// EXPORT EXCEL PRELIMINARY
const exportExcelPreliminary = async () => {
  try {
    const contest = await db.tb_contest.findAll();

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('DANH SÁCH CÁC BÀI THI VÒNG LOẠI');

    worksheet.columns = [
      { header: 'STT', key: 'col1', width: 10 },
      { header: 'TEAM NAME', key: 'col2', width: 30 },
      { header: 'TEAM LEADER', key: 'col3', width: 30 },
      { header: 'PHONE NUMBER', key: 'col4', width: 15 },
      { header: 'EMAIL', key: 'col5', width: 40 },
      { header: 'TRACK', key: 'col6', width: 15 },
      { header: 'GITHUB URL', key: 'col7', width: 50 },
      { header: 'DEMO URL', key: 'col8', width: 50 },
      { header: 'VIDEO URL', key: 'col9', width: 50 },
      { header: 'SEFT EVALUATION', key: 'col10', width: 50 },
      { header: 'PITCH DECK URL ', key: 'col11', width: 50 },
      { header: 'DOCUMENT URL', key: 'col12', width: 50 },
    ];

    contest.forEach((item, index) => {
      worksheet.addRow({
        col1: index + 1,
        col2: item.team_name,
        col3: item.team_leader,
        col4: item.phone_number,
        col5: item.email,
        col6: item.topic_id,
        col7: item.github_url,
        col8: item.demo_url,
        col9: item.video_url,
        col10: item.self_evaluation,
        col11: item.pitch_deck_url,
        col12: item.document_url,
      });
    });

    // Style header
    const headerRow = worksheet.getRow(1);
    headerRow.eachCell((cell) => {
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF1E90FF' },
      };
      cell.font = { color: { argb: 'FFFFFFFF' }, bold: true };
      cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
    });

    const lastCol = worksheet.columns.length;

    worksheet.eachRow((row) => {
      for (let col = 1; col <= lastCol; col++) {
        const cell = row.getCell(col);
        cell.alignment = { vertical: 'middle', horizontal: 'left', wrapText: true };
        cell.border = {
          top: { style: 'thin' },
          left: { style: 'thin' },
          bottom: { style: 'thin' },
          right: { style: 'thin' },
        };
      }
    });

    const tempFilePath = path.join(__dirname, 'statistical_preliminary.xlsx');
    await workbook.xlsx.writeFile(tempFilePath);
    return tempFilePath;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// SET FINAL TEAM
const setFinal = async ({ teams }) => {
  try {
    const team = await db.tb_team.findAll({
      where: {
        id: { [Op.in]: teams },
        active: true,
      },
      include: [
        {
          model: db.tb_user,
          as: 'leader',
          attributes: ['id', 'wallet'],
        },
      ],
    });

    const wallets = _.map(team, 'leader.wallet');

    const contract = await writeContract({
      name: 'setFinalists',
      data: [wallets, true],
    });
    if (!contract.success) return handleFailed('Invalid team!');

    for (const element of team) {
      element.semifinal = true;
      element.hash_semifinal = contract?.data?.hash;
      await element.save();
    }

    return handleSuccess(null, 'Set the team to the semi-finals successfully!');
  } catch (error) {
    console.log(error);
    throw error;
  }
};

module.exports = {
  listTeam,
  listUser,
  listPreliminary,
  listSemifinal,
  detailTeam,
  detailTeamContract,
  exportExcel,
  exportExcelPreliminary,
  setFinal,
  updateTeam,
};
