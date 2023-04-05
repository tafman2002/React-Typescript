import {ChangeEvent, FormEvent, useState} from "react";
import './Chat.scss';
import User  from '../assets/user.svg';
import  Send from '../assets/send.svg';
import Bot from '../assets/bot.svg';


export const ChatGPTApp = () => {
    const [input, setInput] = useState<string>('');
    const [messages, setMessages] = useState<String[]>([]);
    const [onChat, setOnChat] = useState<boolean>(false);
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput(event.target.value);
    };

    const handleClick = (event: any) => {
        // clipboard.writeText(event.target.value);
        console.log(event.target.value)
    }

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log("clicked")
        if (!input.trim()) return;
        setOnChat(true)
        fetch('http://localhost:5000/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({message: input})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setMessages((prevMessages) => [...prevMessages, data.message]);
                setOnChat(false)
            })
        .catch((error) => {
            console.error('Error:', error);
            setOnChat(false);
        });
        setInput('');
    };

    return (
        <div className="Chat-App">
            <h1>Chatbot</h1>
            <div className="chat-container">
                {messages.length !== 0 && messages.map((msg, index) => (
                    <div key={index} className="message">
                        <img src={User} alt="User" className="user-avatar" />
                        <p className="message-text">{msg}</p>
                    </div>
                ))}
            </div>
            <div className="input-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={input}
                        onChange={handleInputChange}
                        placeholder="Type your message..."
                    />
                    <button disabled={onChat} type="submit">
                        <img src={Send} className="send-icon" alt="Send" />
                    </button>
                </form>
                {onChat && (
                    <div className="loader">
                        <img src={Bot} alt={"Bot"} /> <p>Loading...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatGPTApp;