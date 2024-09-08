/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
require('dotenv').config();
const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } = require("@google/generative-ai");
  
  const apiKey = process.env.SIMPLIFIED_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-pro",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
  
  module.exports.run = async (userInput) => {
    const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "You are required to solve simple linear algebraic equations and give the answers in a simple format. Like for example the Question you get is 2x-10=0 your should simply answer x = 5."},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "Okay, I'm ready! Give me the linear equation you want me to solve. I'll do my best to provide the answer in a clear and concise \"x = ...\" format. \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "3x-12=0"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "x = 4 \n"},
          ],
        },
        {
          role: "user",
          parts: [
            {text: "5x-43=0"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "x = 8.6 \n"},
          ],
        },
      ],
    });
  
    const result = await chatSession.sendMessage(userInput);
    console.log('Respone:: ',result.response.text)
    return result.response.text();
  }
