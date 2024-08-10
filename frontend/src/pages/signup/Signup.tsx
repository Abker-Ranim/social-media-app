import { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { FaUser } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleIconClick = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            firstName,
            lastName,
            email,
            password,
        
        };
        console.log(user);
        
        setErrorMsg("Invalid Email or Password"); 
    }

    return (
       <div className="container">
         <div className="login">
            <form onSubmit={handleLogin}>
                <h1>Signup</h1>
                <div className="input-box">
                    <input
                        type="firstName"
                        placeholder="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="lastName"
                        placeholder="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                    <FaUser className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <MdEmail className="icon" />
                </div>
                <div className="input-box">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <span onClick={handleIconClick} className="icon">
                        {showPassword ? <FaLockOpen />: <FaLock />}
                    </span>
                </div>
                {errorMsg && <p className="error">{errorMsg}</p>}
                <button type="submit">Singup</button>
                <div className="register-link">
                    <p>Already have an account ? <Link to="/" >Login</Link></p>
                </div>
            </form>
        </div>
       </div>
    );
}
export default Signup;