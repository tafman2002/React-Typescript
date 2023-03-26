import {ChangeEvent, FormEvent, useState} from "react";
import './Chat.scss';

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
            setOnChat(false)
        });
        setInput('');
    };

    return (
        <div className="App">
            <h1>Chatbot</h1>
            <div className="chat-container">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <p>{msg}</p>
                        {/*<button onClick={handleClick}>Copy</button>*/}
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit} className="input-container">
                <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Type your message..."
                />
                <button disabled={onChat} type="submit">Send</button>
            </form>
            {onChat && <div className="loader"><p>Loading...</p></div>}
        </div>
    );
};

export default ChatGPTApp;