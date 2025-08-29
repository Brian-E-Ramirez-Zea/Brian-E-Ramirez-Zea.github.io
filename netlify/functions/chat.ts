import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log("--- Netlify function 'chat' started ---");

  // 1. Only accept POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Allow': 'POST' }
    };
  }

  try {
    // 2. Parse the request body
    if (!event.body) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing request body' }),
      };
    }
    const { message: userMessage } = JSON.parse(event.body);
    if (!userMessage) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing message in request body' }),
      };
    }
    console.log("2. Received user message:", userMessage);

    // 3. Get API Key from environment variables
    const apiKey = process.env['GEMINI_API_KEY'];
    if (!apiKey) {
      console.error("---!!! GEMINI_API_KEY not found in environment variables. !!!---");
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: 'Sorry, the API key is missing.' }),
      };
    }
    console.log("3. API key found.");

    // 4. Initialize Google Generative AI
    console.log("4. Initializing Google Generative AI...");
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    console.log("5. Google AI Initialized. Starting chat...");

    // 6. Send Message
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "Hello, I have some questions about Brian." }],
        },
        {
          role: "model",
          parts: [{ text: "Hello! I'm an AI assistant with information about Brian Ramirez-Zea. I can answer questions about his skills, experience, and projects. What would you like to know?" }],
        },
      ],
      generationConfig: {
        maxOutputTokens: 100,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const botResponse = response.text();
    console.log("6. Received response from Gemini.");

    // 7. Return the response
    console.log("7. Sending response back to client.");
    return {
      statusCode: 200,
      body: JSON.stringify({ reply: botResponse }),
      headers: { 'Content-Type': 'application/json' },
    };

  } catch (error) {
    console.error("---!!! UNCAUGHT ERROR IN CHAT FUNCTION !!!---");
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "An internal server error occurred." }),
    };
  }
};

export { handler };
