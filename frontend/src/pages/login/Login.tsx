import { useState } from "react";
import "./login.css";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checked, setChecked] = useState(false);
    const [errorMsg, setErrorMsg] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordIcon, setPasswordIcon] = useState(<FaLock />);

    const handleIconClick = () => {
        setShowPassword(!showPassword);
        setPasswordIcon(showPassword ? <FaLock /> : <FaLockOpen />);
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
        <div className="wrapper">
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
                        {passwordIcon}
                    </span>
                </div>
                <div className="remember-forgot">
                    <label>
                        <input
                            type="checkbox"
                            checked={checked}
                            onChange={(e) => setChecked(e.target.checked)}
                        />
                        Remember me
                    </label>
                    <a href="#" onClick={() => alert("Réinitialiser le mot de passe")}>Forgot password?</a>
                </div>
                {errorMsg && <div className="error">{errorMsg}</div>}
                <button type="submit">Login</button>
                <div className="register-link">
                    <p>Don't have an account? <a href="#">Register</a></p>
                </div>
            </form>
        </div>
    );
}

export default Login;
