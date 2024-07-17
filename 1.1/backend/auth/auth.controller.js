import jwt from 'jsonwebtoken';
import users from '../auth/user.model.js';

export const login = (req, res) => {
  const { username, password } = req.body;

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    const accessToken = jwt.sign({ username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({
      accessToken
    });
  } else {
    res.send('Username oder Passwort ist falsch');
  }
};