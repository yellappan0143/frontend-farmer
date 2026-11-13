
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import '../style/Auth.css';
import '../style/Loader.css';


function Login() {
    const navigate = useNavigate();
    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showLoader, setShowLoader] = useState(false);

    
const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    if (!identifier.trim() || !password) {
        setError('Please enter your email/mobile number and password.');
        return;
    }

    setShowLoader(true);

    try {
        const response = await fetch('http://localhost:8080/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, password }),
        });

        const result = await response.text();

        if (!response.ok) {
            throw new Error(result || 'Login failed.');
        }

        localStorage.setItem('farmrideToken', result.trim());

        window.dispatchEvent(new Event('auth-changed'));

        navigate('/');

    } catch (error) {
        setError(error.message || 'Unable to connect to the server.');
    } finally {
        setShowLoader(false);
    }
};


    return (
        <>
        <main className="auth-page">
            <section className="auth-card">
                <Link to="/" className="auth-brand">
                    🌱 FarmRide
                </Link>

                <p className="auth-tagline">
                    Smart equipment booking for modern farming
                </p>

                <h1>Welcome back!</h1>
                <p className="auth-description"> Log in to manage your FarmRide account.</p>

                <form onSubmit={handleSubmit}>
                    <label htmlFor="identifier">Email or mobile number</label>
                    <input
                        id="identifier"
                        type="text"
                        autoComplete="username"
                        placeholder="Enter email or mobile number"
                        value={identifier}
                        onChange={(event) => setIdentifier(event.target.value)}
                        required
                    />

                    <label htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                        required
                    />

                    {error && <p className="auth-message">{error}</p>}

                    <button className="auth-button" type="submit">
                        Login
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account? <Link to="/register">Register</Link>
                </p>

                <Link to="/" className="auth-home-link"> Back to Home </Link>
            </section>
        </main>
        
        {showLoader && (
            <div className="loader-overlay">
                <div className="loader"></div>
            </div>
        )}
        </>
    );
}

export default Login;
