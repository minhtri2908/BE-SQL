import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';
import jwt from 'jsonwebtoken';
// import { connect } from "../index.js";

export const register = async (req, res, next) => {
  try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
      ...req.body,
      password: hash,
    });

    await newUser.save();
    res.status(200).send('Tạo tài khoản thành công');
  } catch (err) {
    next(err);
  }
};
//login-user
export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return next(createError(404, 'Không tìm thấy người dùng'));

    const passwordIsCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsCorrect)
      return next(createError(400, 'Mật khẩu không chính xác'));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...details } = user.dataValues;
    res.cookie('access_token', token, { httpOnly: true }).status(200).json({
      details,
      isAdmin,
      token,
    });
  } catch (err) {
    next(err);
  }
};

export const login_admin = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { username: req.body.username } });
    if (!user) return next(createError(404, 'Không tìm thấy người dùng'));

    const passwordIsCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsCorrect)
      return next(createError(400, 'Mật khẩu không chính xác'));

    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET
    );

    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie('access_token', token, {
        httpOnly: true,
      })
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin });
  } catch (err) {
    next(err);
  }
};
