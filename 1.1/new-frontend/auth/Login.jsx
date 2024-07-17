// src/components/Login.js
import { login } from './authService'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(username, password);
      navigate('/protected');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className='page-login'>
      <h2 className='h2-login'>Login</h2>
      <form className='form-login' onSubmit={handleSubmit}>
        <div>
          <label className='label-login'>Username:</label>
          <input className='input-login' type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div>
          <label className='label-login'>Password:</label>
          <input className='input-login' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default Login;