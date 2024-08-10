import { useState } from "react";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [checked, setChecked] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleIconClick = () => {
        setShowPassword(!showPassword);
    }

    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const user = {
            email,
            password,
            remember: checked,
        };
        console.log(user);
        
        setErrorMsg("Invalid Email or Password"); 
    }

    return (
       <div className="container">
         <div className="login">
            <form onSubmit={handleLogin}>
                <h1>Login</h1>
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
                <div className="remember-forgot">
                    <div className="remember">
                        <input
                            type="checkbox"
                            id="remeber"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                        <label htmlFor="remeber">
                            Remember me
                        </label>
                    </div>
                    <a href="#" onClick={() => alert("Réinitialiser le mot de passe")}>Forgot password ?</a>
                </div>
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account ? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
       </div>
    );
}

export default Login;
