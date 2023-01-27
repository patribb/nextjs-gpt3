// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Configuration, OpenAIApi } from 'openai'

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openAI = new OpenAIApi(configuration)

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const prompt = req.query.prompt
  if(!prompt) return res.status(400).json({error: 'Prompt missing'})
  if(prompt.length > 100) return res.status(400).json({error: 'Prompt too long'})
  const completion = await openAI.createCompletion({
    model: 'text-davinci-003',
    prompt: `Create a cringy motivational quote based on the following topic.\n
    Topic: ${prompt}\n
    Cringy motivational quote:`,
    temperature: 1,
    max_tokens: 500,
    frequency_penalty: 0,
    presence_penalty: 0,
  })
  const quote = completion.data.choices[0].text;
  return res.status(200).json({quote})
}

