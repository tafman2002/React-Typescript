import {useState} from "react";
import './Form.scss'
export const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [name, setName] = useState('');
    const [subscription, setSubscription] = useState('bronze');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch("http://localhost:4000/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
            username,
        }),
        });
        const data = await response.json();
        console.log(data);
    };


    return (
        <div className="container">
            <h1>Signup</h1>
            <form onSubmit={handleSubmit} className="signup-form">
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <br />
                <label>
                    Subscription:
                    <select value={subscription} onChange={(e) => setSubscription(e.target.value)}>
                        <option value="bronze">Bronze</option>
                        <option value="silver">Silver</option>
                        <option value="gold">Gold</option>
                    </select>
                </label>
                {subscription === 'bronze' ?
                    <p>
                        Access to basic features:<br />
                        - Feature 1<br />
                        - Feature 2<br />
                        - Feature 3
                    </p>
                    : subscription === 'silver' ?
                        <p>
                            Access to intermediate features:<br />
                            - Feature 1<br />
                            - Feature 2<br />
                            - Feature 3<br />
                            - Feature 4<br />
                            - Feature 5
                        </p>
                        :
                        <p>
                            Access to all features:<br />
                            - Feature 1<br />
                            - Feature 2<br />
                            - Feature 3<br />
                            - Feature 4<br />
                            - Feature 5<br />
                            - Feature 6<br />
                            - Feature 7
                        </p>
                }

                <button type="submit" className="signup-button">Signup</button>
            </form>
        </div>
    );
}