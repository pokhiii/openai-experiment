const axios = require('axios');
const { saveResponse } = require('./utils');

require('dotenv').config();

async function main() {
  const prompt = process.argv[2];

  if (!prompt) {
    throw new Error('No prompt given!');
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

  const response = choices.map((choice) => choice.message.content).join('\n');

  saveResponse({ prompt, response });
}

main();
