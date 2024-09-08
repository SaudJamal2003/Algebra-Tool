import React, { useState } from 'react';
import ParticlesComponent from './particles';
import { useNavigate } from 'react-router-dom';
import algebraCss from '../Css/algebraCss.module.css';

function AlgebraSolvePage() {

      const[input, setInput] = useState('');

       //  for all messages in the chat
       const [messages, setMessages] = useState([
        {
          role: "assistant",
          content: ""
        }
      ])
      // for current message
      const [message, setMessage] = useState("")
    
      const sendMessage = async (e) => {
        e.preventDefault();
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

   const [navOpen, setNavOpen] = useState(false)

    function show() {
      if (!navOpen){
        setNavOpen(true);
      }
      else{
        setNavOpen(false);
      }
    }

    const[query, setQuery] = useState([{
      message:'',
      reply: ''
    }]);

    const handleMessage = () =>{
      setQuery([...query, { message: input, reply:''}]);
    }

    const BotResponse = async () => {
      console.log("BotResponse")
      console.log(input)
      fetch('http://localhost:3002/simplifiedAns', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({input}),
      })
      .then((response)=>response.json())
      .then((data => {
        console.log(data)
        console.log(data.messageResponse)
        setQuery([...query, { message: input, reply: data.messageResponse}]);
        setInput("")
      }))
      .catch((error)=>{
        console.log("Error", error)
      }) 
    }

     const handleSend = () => {
      handleMessage();
      BotResponse();
    }

    const navigate = useNavigate()

    const handleLogout = async () => {
      await fetch('http://localhost:3002/logout',{
        credentials: 'include'
      })
      navigate(0)
    };


  return (
    <>
      <ParticlesComponent id={algebraCss.particles}/>

      <nav>
        <svg xmlns="http://www.w3.org/2000/svg" data-name="Layer 1" viewBox="0 0 24 24" id="sigma"><path fill="#FFFFFF" d="M16,16H10.41l3.3-3.29a1,1,0,0,0,0-1.42L10.41,8H16a1,1,0,0,0,0-2H8a1,1,0,0,0-.92.62,1,1,0,0,0,.21,1.09L11.59,12l-4.3,4.29a1,1,0,0,0-.21,1.09A1,1,0,0,0,8,18h8a1,1,0,0,0,0-2Z"></path></svg>

        <ul>
            <li>Home</li>
            <li onClick={handleLogout}>Logout</li>
        </ul>
      </nav>

      <div className={algebraCss.main}>
        <form onSubmit={sendMessage} className={algebraCss.questionForm}>
          <h1>Enter your linear algebraic equation here</h1>
          <div className={algebraCss.inputDiv}>
            <input type='text' placeholder='2x - 10 = 0' className={algebraCss.inputEq}
            name='equation'value={message} onChange={(e)=>{setMessage(e.target.value);setInput(e.target.value); setQuery([{reply:" "}])}}required/>
            <button type='submit' className={algebraCss.solveButton} onClick={handleSend}>Solve</button>
            </div>
        </form>

        <div className={algebraCss.ansExp}>
          <div className={algebraCss.answerDiv}>
            Answer: {query.map((item, index) => (
                <p className={algebraCss.eqAns}>
                  {item.reply}
                </p>
              ))}
            </div>
            <button onClick={show} className={algebraCss.expbtn}>View Explanation</button>
          </div>
        

        <div id={algebraCss.explanation} style={{display: navOpen ? 'block': 'none'}}>
              {messages.map((message, index) => {
                return (
                  <div key={index} className={algebraCss.contentDiv}>
                      <div className={algebraCss.messageDiv}>
                        {message.content ? message.content : 'Explanation of the Equation !' } 
                      </div>
                    </div>
              )})}
            </div>  
      </div>
    </>
  )
}

export default AlgebraSolvePage