const connectDB = require('../config/db');

const allowedRoles = ['designer', 'manager', 'sponsor', 'developer', 'client'];

const saveUser = async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const user = req.body;

    if (!user?.email) {
      return res.status(400).send({ error: 'Email is required' });
    }

    const safeRole = allowedRoles.includes(user.role) ? user.role : 'client';

    const filter = { email: user.email };

    const updateDoc = {
      $set: {
        firebaseUid: user.firebaseUid || '',
        email: user.email,
        fullName: user.fullName || '',
        avatarUrl: user.avatarUrl || '',
        role: safeRole,
        authProvider: user.authProvider || 'password',
        status: user.status || 'offline',
        lastSeen: user.lastSeen || new Date(),
        isActive: true,
        updatedAt: new Date(),
      },
      $setOnInsert: {
        createdAt: new Date(),
      },
    };

    const options = { upsert: true };

    const result = await usersCollection.updateOne(filter, updateDoc, options);

    res.send({
      message: 'User saved successfully',
      result,
    });
  } catch (error) {
    console.error('POST /users error:', error);
    res.status(500).send({ error: 'Failed to save user' });
  }
};

const getUserByEmail = async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const email = req.params.email;

    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(404).send({ error: 'User not found' });
    }

    res.send(user);
  } catch (error) {
    console.error('GET /users/:email error:', error);
    res.status(500).send({ error: 'Failed to fetch user' });
  }
};

const updateUser = async (req, res) => {
  try {
    const db = await connectDB();
    const usersCollection = db.collection('users');

    const email = req.params.email;
    const { fullName, avatarUrl } = req.body;

    const result = await usersCollection.updateOne(
      { email },
      {
        $set: {
          fullName: fullName || '',
          avatarUrl: avatarUrl || '',
          updatedAt: new Date(),
        },
      }
    );

    res.send({
      message: 'User updated successfully',
      result,
    });
  } catch (error) {
    console.error('PUT /users/:email error:', error);
    res.status(500).send({ error: 'Failed to update user' });
  }
};

module.exports = {
  saveUser,
  getUserByEmail,
  updateUser,
};