const fs = require('fs');

function saveResponse({ prompt, response }) {
  const currentDate = new Date().toISOString().slice(0, 10);
  const fileName = `${currentDate}.txt`;
  const fileContent = `\nPROMPT: "${prompt}"\nRESPONSE:\n${response}`;

  const dir = './responses';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.appendFileSync(`${dir}/${fileName}`, fileContent);
}

module.exports = saveResponse;
