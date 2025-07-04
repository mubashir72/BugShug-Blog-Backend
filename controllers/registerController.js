const User = require('../model/User');
const bcrypt = require('bcrypt');

const handleRegister = async (req, res) => {
  const { user, password } = req.body;
  if (!user || !password)
    return res.status(400).json({ message: 'Username and password required' });

  const duplicate = await User.findOne({ username: user }).exec();
  if (duplicate) {
    return res.status(409).json({ message: `User ${user} already exists` });
  }
  try {
    // encrypting msg

    const hashedpassword = await bcrypt.hash(password, 10);

    // store the new user

    const result = await User.create({
      username: user,
      password: hashedpassword,
    });
    console.log(result);
    res.status(201).json({ success: `New user ${user} created` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
module.exports = { handleRegister };
