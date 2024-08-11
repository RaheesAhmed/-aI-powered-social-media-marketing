import OpenAI from "openai";
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;
const openai = new OpenAI({ apiKey });

interface ImprovedQuestion {
  question: string;
  choices: string[];
}

export const improveContent = async (question: string): Promise<ImprovedQuestion> => {
  const systemPrompt = `
    You are an AI assistant specialized in improving NCLEX-style questions and generating appropriate answer choices. Your task is to:
    1. Enhance the given question to make it clearer, more challenging, and more engaging.
    2. Generate four plausible answer choices, with one being the correct answer.
    3. Return the improved question and choices in a JSON format.

    Ensure that:
    - The question is clear, concise, and tests important nursing concepts.
    - The answer choices are distinct and plausible.
    - The correct answer is not always in the same position.

    always Return your response in the following JSON format:
    {
      "question": "The improved question text.",
      "choices": [
        "Choice A",
        "Choice B",
        "Choice C",
        "Choice D"
      ]
    }
  `;

  const completion = await openai.chat.completions.create({
    messages: [
      { "role": "system", "content": systemPrompt },
      { "role": "user", "content": `Improve this question: ${question} and Return your response in the following JSON format:
    {
      "question": "The improved question text.",
      "choices": [
        "Choice A",
        "Choice B",
        "Choice C",
        "Choice D"
      ]
    } no explnanion needed only return clean json dont noy use word json at the start of response` }
    ],
    model: "gpt-4o-mini",
    
    
  });

  const result = JSON.parse(completion.choices[0].message.content || '{}');
  return result;
};
