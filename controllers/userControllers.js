import User from "../models/User.js";

export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // cek apakah user sudah ada atau belum
    let user = await User.findOne({ email });

    if (user) {
      // return res.status(400).json({ message: "User have already registered" });
      throw new Error("User have already registered");
    }

    // bikin user baru
    user = await User.create({
      name,
      email,
      password,
    });

    return res.status(201).json({
      _id: user._id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      verified: user.verified,
      admin: user.admin,
      token: await user.generateJWT(),
    });
  } catch (error) {
    // console.error(error);hhh
    next(error);
  }
};

export default registerUser;
