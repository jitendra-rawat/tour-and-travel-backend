import express from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import User from '../models/user.js';

const router = express.Router();


//signup

router.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).send({ message: 'User registered successfully' });

  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).send({ message: 'Error signing up' });
  }
});

//get all regsitered user
router.get('/users', async (req, res) => {
  try {
 
    const users = await User.find({}, { email: 1 });

    
    if (!users || users.length === 0) {
      return res.status(404).send({ message: 'No users found' });
    }

    
    res.status(200).send(users.map(user => user.email));

  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).send({ message: 'Error getting users' });
  }
});



//login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

   
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send({ message: 'User not found,Please Signup First' });
    }

   
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).send({ message: 'Invalid credentials' });
    }

    
    const access_token = jwt.sign({ userId: user._id }, '123');


    res.status(200).json({  message: 'Logged in successfully',access_token });

  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).send({ message: 'Error logging in' });
  }
});

export default router;
