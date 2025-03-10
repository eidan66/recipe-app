// import { NextRequest, NextResponse } from 'next/server';
// import OpenAI from 'openai';

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
// export async function POST(req: NextRequest) {
//   try {
//     console.log('API Key:', process.env.OPENAI_API_KEY);
//     const { text } = await req.json();
//     if (!text) {
//       return NextResponse.json({ error: 'Missing text input' }, { status: 400 });
//     }

//     const prompt = `המר את הטקסט הבא למבנה JSON של מתכון:
//     ---
//     ${text}
//     ---
//     הפלט חייב להיות JSON בלבד, עם המפתחות הבאים:
//     {
//       "id": "string",
//       "title": "string",
//       "description": "string",
//       "image": "string (optional, if missing, return empty string)",
//       "prepTime": number,
//       "cookTime": number,
//       "servings": number,
//       "ingredients": { "section": ["ingredient1", "ingredient2"] },
//       "instructions": { "section": ["step1", "step2"] },
//       "tips": ["string (optional)"],
//       "tags": ["string"],
//       "category": "string",
//       "allergens": ["string"],
//       "nutrition": {
//         "calories": number,
//         "protein": number,
//         "fat": number,
//         "carbs": number
//       }
//     }`;

//     const response = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       // model: 'gpt-4',
//       messages: [{ role: 'user', content: prompt }],
//       temperature: 0.5,
//     });

//     const generatedRecipe = JSON.parse(response.choices[0].message.content || '{}');

//     return NextResponse.json(generatedRecipe, { status: 200 });
//   } catch (error) {
//     console.error('Error generating recipe:', error);
//     return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
//   }
// }
