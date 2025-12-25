const dayjs = require('dayjs');
const fs = require('fs');
const path = require('path');

// SAVE LOG ERROR
const saveLogsError = (error, fileName) => {
  const folderName = dayjs().format('YYYY-MM-DD');
  const directoryPath = './src/errors/' + folderName;
  const filePath = path.join(directoryPath, fileName + '.txt');

  if (!fs.existsSync(directoryPath)) {
    fs.mkdirSync(directoryPath);
  }
  let newContent = '';
  if (fs.existsSync(filePath)) {
    const content = fs.readFileSync(filePath, 'utf8');
    newContent = content + '\n' + error;
  } else {
    newContent = error;
  }
  fs.writeFileSync(filePath, newContent);
  return true;
};

module.exports = {
  saveLogsError,
};
