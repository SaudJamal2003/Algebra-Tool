// import { NextResponse } from "next/server";
const { Pinecone } = require("@pinecone-database/pinecone");
const { GoogleGenerativeAI } = require("@google/generative-ai");
const { ReadableStream } = require('stream/web'); // Ensure you import ReadableStream
const { Readable } = require('stream');  // Import Node.js Readable stream


const systemPrompt = 
`
You are an Algebra Solver assistant designed to help students solve linear equation problems. Using Retrieval-Augmented Generation (RAG), you will search through a database of algebra problem solutions and provide step-by-step solutions for the user's input equation.
Instructions:
User Query Interpretation:

Analyze the user's input to identify the linear equation they need solved.
Example queries might include: "Solve for x: 2x + 6 = 10", "Find the value of x in the equation 3x + 9 = 18".

Search and Retrieval:

Utilize the RAG model to retrieve the most relevant solution steps from the database of pre-solved linear equations.
Focus on finding the solution that matches the user's input equation as closely as possible.

Response Generation:

Present the step-by-step solution for the user's linear equation.
Include the original equation, the step-by-step workings, and the final solution.
Provide a clear, concise explanation for each step of the solution process.

Clarification and Follow-up:

If the user's input is unclear or the equation does not match any in the database, ask the user for clarification before providing a solution.
Offer follow-up support by suggesting alternative approaches or providing additional examples if the user is not satisfied with the initial solution.

Your goal is to provide accurate, detailed, and helpful solutions to ensure the student can understand the process of solving linear equations and apply it to their own work.
`

module.exports.generateResponse = async(req) => {
    // console.log("generateResponse called");  // Check if this gets printed
    const data = req.body;
    // console.log("Received data:", data); 

    const pc = new Pinecone({
        apiKey: process.env.PINECONE_KEY
    })

    const index = pc.Index("rag-alg").namespace("ns1")
    const genAI = new GoogleGenerativeAI(process.env.API_KEY)

    const text = data[data.length - 1].content
    let model = genAI.getGenerativeModel({ model: "text-embedding-004" })
    const result = await model.embedContent(text)
    const embedding = result.embedding;
    // console.log(result, embedding)
    // console.log("embeddings created")

    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding.values
    })

    // console.log("\nResults: ", results)
    
    let resultString = "\n\nReturned results from Vector DB (done automatically): "
    results.matches.forEach((match) => {
        resultString += `
        \n
        Question ID: ${match.id}
        Question: ${match.metadata.question}
        Solution: ${match.metadata.solution}
        Topic: ${match.metadata.topic}
        Difficulty: ${match.metadata.difficulty}
        Steps: ${match.metadata.steps}
        Tags: ${match.metadata.tags}
        \n\n
        `;
    })
    // console.log("\nResults string: ", resultString)
    // console.log("response agya")
    
    const lastMessageContent = data[data.length - 1].content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1)

    const conversation = [
        { role: "system", content: systemPrompt },
        ...lastDataWithoutLastMessage,
        { role: "user", content: lastMessageContent },
    ]
    const conversationText = conversation.map(message => `${message.role}: ${message.content}`).join('\n')
    // console.log("Conversation text: ", conversationText)
    
    genAIModel = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const completions = await genAIModel.generateContentStream(conversationText);

    // console.log(completions)

    // Create a ReadableStream to stream the response back to the client
    // const stream = new ReadableStream({
    //     async start(controller) {
    //         const encoder = new TextEncoder();
    //         for await (const chunk of completions.stream) {
    //             // console.log("Chunk: ", chunk)
    //             const encodedChunk = encoder.encode(JSON.stringify(chunk));
    //             controller.enqueue(encodedChunk);
    //         }
    //         controller.close();
    //     }
    // });

    // console.log("Stream: ", stream)
    // console.log("Stream type: ", typeof stream)

    // return stream;

    // Use an array to accumulate the chunks
    const chunks = [];

    for await (const chunk of completions.stream) {
        chunks.push(JSON.stringify(chunk) + "\n");  // Append newline delimiter
    }

    // Create a Node.js Readable stream from the accumulated chunks
    const nodeStream = Readable.from(chunks);

    return nodeStream;  // Return a Node.js-readable stream

}