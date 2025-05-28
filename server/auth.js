import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3001;


app.use(cors());
app.use(express.json());


const VALID_CREDENTIALS = [
  { username: 'admin', password: 'password123' },
  { username: 'user', password: 'user123' },
  { username: 'diego', password: 'diego2024' }
];


app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  
  if (!username || !password) {
    return res.status(400).json({
      success: false,
      message: 'Username and password are required'
    });
  }

  
  const user = VALID_CREDENTIALS.find(
    cred => cred.username === username && cred.password === password
  );

  if (user) {
    
    const token = `token_${username}_${Date.now()}`;
    
    res.json({
      success: true,
      message: 'Login successful',
      user: {
        username: user.username,
        loginTime: new Date().toISOString(),
        token: token
      }
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid username or password'
    });
  }
});


app.post('/api/validate-token', (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({
      success: false,
      message: 'Token is required'
    });
  }

  
  if (token.startsWith('token_')) {
    const username = token.split('_')[1];
    const user = VALID_CREDENTIALS.find(cred => cred.username === username);
    
    if (user) {
      res.json({
        success: true,
        user: {
          username: user.username,
          isAuthenticated: true
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid token format'
    });
  }
});


app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Auth server is running' });
});

app.listen(PORT, () => {
  console.log(`Auth server running on http://localhost:${PORT}`);
});
