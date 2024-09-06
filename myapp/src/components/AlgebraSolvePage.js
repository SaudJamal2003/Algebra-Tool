import React from 'react';
import { useState } from 'react';
import TypingIndicator from "./TypingIndicator.jsx"

function AlgebraSolvePage() {
     //  for all messages in the chat
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I am the Rate my Professor support assistant. How can I help you today?"
    }
  ])
  // for current message
  const [message, setMessage] = useState("")

  const sendMessage = async () => {
    setMessages((messages) => [
        ...messages,
        { role: "user", content: message },
        { role: "assistant", content: "" }
    ]);

    setMessage(""); // Clear the input field

    const response = await fetch("http://localhost:3002/solve", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify([...messages, { role: "user", content: message }])
    });

    if (!response.ok) {
        console.error("Error fetching response:", response);
        return;
    }

    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";  // Accumulate incomplete chunks

    const processChunk = async ({ done, value }) => {
        if (done) {
            console.log("Stream finished.");
            return;
        }

        const textChunk = decoder.decode(value, { stream: true });
        buffer += textChunk;  // Append the incoming chunk to the buffer

        // Split by newline to process complete JSON objects
        const parts = buffer.split("\n");

        for (let i = 0; i < parts.length - 1; i++) {
            const part = parts[i].trim();
            if (part) {
                try {
                    const jsonObject = JSON.parse(part);
                    const rawText = jsonObject.candidates[0]?.content?.parts?.[0]?.text || "";

                    // console.log("raw text: ", rawText)
                    const cleanedText = rawText.replace(/\*/g, '')
                    // console.log("cleaned text: ", cleanedText)

                    // Update the UI with the parsed text
                    setMessages((prevMessages) => {
                        const lastMessage = prevMessages[prevMessages.length - 1];
                        const otherMessages = prevMessages.slice(0, prevMessages.length - 1);
                        return [
                            ...otherMessages,
                            { ...lastMessage, content: lastMessage.content + cleanedText },
                        ];
                    });
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            }
        }

        // Keep the last incomplete part in the buffer
        buffer = parts[parts.length - 1];

        // Continue reading the next chunk
        reader.read().then(processChunk);
    };

    // Start reading the stream
    reader.read().then(processChunk);
};
  return (
    <main className="flex flex-col justify-center items-center">
      <h3 className="text-5xl font-bold text-center m-5">Algebra Question Solver - RAG App</h3>
      <div className="w-full flex flex-col justify-center items-center">
        <div className="flex flex-col w-[500px] h-[700px] border-2 border-black p-2 space-x-3">
          <div className="flex flex-col justify-between m-3 flex-grow overflow-auto max-h-full">
            <div>
              {messages.map((message, index) => {
                  return (
                    <div key={index} className={`flex ${message.role === "assistant" ? "justify-start" : "justify-end"}`}>
                      <div className={`${message.role === "assistant" ? "bg-red-400" : "bg-orange-300"} text-white rounded-md p-3 mb-2`}>
                        {message.content ? message.content : <TypingIndicator /> } 
                      </div>
                    </div>
              )})}
            </div>
            <div className="flex space-x-5">
              <input 
                type="text" 
                placeholder="Message" 
                className="w-full border-2 border-black rounded-md px-2" 
                value={message} 
                onChange={(e)=>{setMessage(e.target.value)}}
              />
              <button 
                className="bg-black text-white py-2 px-3 rounded-md"
                onClick={sendMessage}  
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AlgebraSolvePage