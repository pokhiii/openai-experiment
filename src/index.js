/* eslint-disable no-console */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-constant-condition */
/* eslint-disable no-continue */
const axios = require('axios');
const readline = require('readline');
const { saveResponse } = require('./utils');

require('dotenv').config();

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  while (true) {
    try {
      const prompt = await new Promise((resolve) => {
        rl.question('Enter your prompt (type "exit" to stop): ', (answer) => {
          resolve(answer);
        });
      });

      if (prompt === 'exit') {
        console.log('Exiting...');
        break;
      }

      if (!prompt) {
        console.log('No prompt given!');
        continue;
      }

      const { data } = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: prompt }],
          temperature: 0.7,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );

      const { choices } = data;

      const response = choices
        .map((choice) => choice.message.content)
        .join('\n');

      const fileContent = `\nPROMPT: "${prompt}"\nRESPONSE:\n${response}`;

      console.log(fileContent);

      saveResponse({ prompt, response });
    } catch (err) {
      console.log(err.toString());
    }
  }

  rl.close();
}

main();
