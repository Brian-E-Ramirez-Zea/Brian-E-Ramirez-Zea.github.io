import type { Handler, HandlerEvent, HandlerContext } from "@netlify/functions";
import { GoogleGenerativeAI } from "@google/generative-ai";

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  console.log("--- Netlify function 'chat' started ---");

  // 1. Check for API Key
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("--- ERROR: 'GEMINI_KEY' not found in environment variables. ---");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "API key is not set in Netlify." }),
    };
  }
  console.log("1. API key found.");

  // 2. Check HTTP Method
  if (event.httpMethod !== "POST") {
    console.error(`--- ERROR: Incorrect HTTP method (${event.httpMethod}). Only POST is allowed. ---`);
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }
  console.log("2. Request is a POST request.");

  try {
    // 3. Parse Body
    const body = JSON.parse(event.body || "{}");
    const userMessage = body.message;
    if (!userMessage) {
      console.error("--- ERROR: No message provided in the request body. ---");
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "No message provided." }),
      };
    }
    console.log(`3. Received user message: "${userMessage}"`);

    // 4. Initialize Google AI
    console.log("4. Initializing Google Generative AI...");
    const apiKey = process.env['GEMINI_API_KEY'];
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ reply: 'Sorry, the API key is missing.' }),
      };
    }
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });
    console.log("5. Google AI Initialized. Starting chat...");

    // 6. Send Message
    const chat = model.startChat();
    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    const botResponse = response.text();
    console.log("6. Received response from Gemini.");

    // 7. Return Response
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
