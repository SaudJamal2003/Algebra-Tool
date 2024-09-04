// import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import { GoogleGenerativeAI } from "@google/generative-ai";

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

module.exports.generateResponse =  async(req) => {
    const data = await req.json()
    const pc = new Pinecone({
        apiKey: process.env.PINECONE_KEY
    })

    const index = pc.Index("rag").namespace("ns1")
    const genAI = new GoogleGenerativeAI(process.env.API_KEY)

    const text = data[data.length - 1].content
    let model = genAI.getGenerativeModel({ model: "text-embedding-004"})
    const result = await model.embedContent(text)
    const embedding = result.embedding;
    // console.log(result, embedding)
    // console.log("embeddings created")

    const results = await index.query({
        topK: 3,
        includeMetadata: true,
        vector: embedding.values
    })

    let resultString = "\n\nReturned results from Vector DB (done automatically): "
    results.matches.forEach((match) => {
        resultString += `
        Question ID: ${match.id}
        Question: ${match.metadata.question}
        Solution: ${match.metadata.solution}
        Topic: ${match.metadata.topic}
        Difficulty: ${match.metadata.difficulty}
        Steps: ${match.metadata.steps.join('\n')}

        `;
    })

    const lastMessage = data[data.length - 1]
    const lastMessageContent = lastMessage.content + resultString
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1)

    const conversation = [
        { role: "system", content: systemPrompt },
        ...lastDataWithoutLastMessage,
        { role: "user", content: lastMessageContent },
    ]
    const conversationText = conversation.map(message => `${message.role}: ${message.content}`).join('\n')
    // console.log(conversationText)
    
    model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


    const completions = await model.generateContentStream(conversationText);

    // Create a ReadableStream to stream the response back to the client
    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();
            for await (const chunk of completions.stream) {
                const encodedChunk = encoder.encode(JSON.stringify(chunk));
                controller.enqueue(encodedChunk);
            }
            controller.close();
        }
    });

    return stream;
}