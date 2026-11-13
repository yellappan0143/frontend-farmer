
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import '../style/Auth.css';
import Loader from '../common/Loader';

function Register() {

  const [form, setForm] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'FARMER',
  });


  const [message, setMessage] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const navigate = useNavigate();



  const handleChange = (event) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
      error: '',
    }));
  };



  
const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage('');

    setForm((prev) => ({
        ...prev,
        fullNameTouched: true,
        mobileNumberTouched: true,
        emailTouched: true,
        passwordTouched: true,
        confirmPasswordTouched: true,
    }));

    // Basic validation
    if (!basicValidation()) {
        setShowLoader(false);
        return;
    }

    setShowLoader(true);

    try {
        const response = await fetch(
            'http://localhost:8080/api/auth/register',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullName: form.fullName,
                    mobileNumber: form.mobileNumber,
                    email: form.email,
                    password: form.password,
                    confirmPassword: form.confirmPassword,
                    role: form.role,
                }),
            }
        );

        const result = await response.text();

        if (!response.ok) {
            throw new Error(result || 'Registration failed.');
        }

        setMessage('Registration successful! You can now login.');

        setForm({
            fullName: '',
            mobileNumber: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 'FARMER',
        });

        navigate('/login');

    } catch (error) {
        setMessage(error.message || 'Unable to connect to the server.');
    } finally {
        setShowLoader(false);
    }
};


let basicValidation = () => {
  return form.fullName.trim() !== '' && form.mobileNumber.trim() !== '' && form.email.trim() !== '' && form.password && form.confirmPassword && form.password === form.confirmPassword;
}



  let handleEvent = (field) => setForm(prev => ({ ...prev, [`${field}Touched`]: true }));




  return (
    <main className="auth-page">
      <section className="auth-card register-card">
        <Link to="/" className="auth-brand">
          🌱 FarmRide
        </Link>

        <h1>Create your account</h1>
        <p className="auth-description">
          Join FarmRide to book or provide agricultural equipment.
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="fullName">First Name<span style={{ color: 'red', fontSize: '15px' }}> * </span></label>
          <input
            id="fullName"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            placeholder="Enter your first name"
            autoComplete="name"
            required
            onBlur={(e) => handleEvent(e.target.name)}
          />
          {form.fullName === '' && form.fullNameTouched && (
            <div className="error-message">
              First Name is required.
            </div>
          )}





          <label htmlFor="mobileNumber">Mobile number<span style={{ color: 'red', fontSize: '15px' }}> * </span></label>
          <input
            id="mobileNumber"
            name="mobileNumber"
            type="tel"
            value={form.mobileNumber}
            onChange={handleChange}
            placeholder="Enter mobile number"
            autoComplete="tel"
            maxLength={10}
            onBlur={(e) => handleEvent(e.target.name)}
          />

          {form.mobileNumber === '' && form.mobileNumberTouched && (
            <div className="error-message">
              Mobile number is required.
            </div>
          )}


          <label htmlFor="email">E-mail<span style={{ color: 'red', fontSize: '15px' }}> * </span></label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Enter email address"
            autoComplete="email"
            onBlur={(e) => handleEvent(e.target.name)}
          />

          {form.email === '' && form.emailTouched && (
            <div className="error-message">
              Email address is required.
            </div>
          )}

          <label htmlFor="register-password">Password<span style={{ color: 'red', fontSize: '15px' }}> * </span></label>
          <input
            id="register-password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Create a password (minimum 8 characters)"
            autoComplete="new-password"
            minLength={8}
            required
            onBlur={(e) => handleEvent(e.target.name)}
          />
          {form.password === '' && form.passwordTouched && (
            <div className="error-message">
              Password is required.
            </div>
          )}

          <label htmlFor="confirm-password">Confirm Password<span style={{ color: 'red', fontSize: '15px' }}> * </span></label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            autoComplete="new-password"
            minLength={8}
            required
            onBlur={(e) => handleEvent(e.target.name)}
          />

          {form.confirmPassword === '' && form.confirmPasswordTouched && (
            <div className="error-message">
              Confirm password is required.
            </div>
          )}


          {form.password !== form.confirmPassword &&
            form.confirmPassword && (
              <div className="error-message">
                Make sure your passwords match.
              </div>
            )}

          {message && <p className="error-message">{message}</p>}

          <button
            className="auth-button"
            type="submit"
            disabled={!basicValidation()}

          >

            {showLoader ? 'Creating...' : 'Create Account'}

          </button>
        </form>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </section>
      
      {showLoader && (
        <div className="loader-overlay">
          <Loader message={`Creating your ${form.role} account...`} />
        </div>
      )}
    </main>
  );
}

export default Register;
