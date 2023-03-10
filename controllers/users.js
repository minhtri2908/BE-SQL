import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import { createError } from '../utils/error.js';

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.body.userId });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (err) {
    next(err);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const updatedUser = await User.findOne({ where: { id: req.params.id } });
    updatedUser.fullname = req.body.fullname;
    updatedUser.phone = req.body.phone;
    await updatedUser.save();
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await User.destroy({ where: { id: req.params.id } });
    res.status(200).json('User has been deleted.');
  } catch (err) {
    next(err);
  }
};

//reset password
export const updatePassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ _id: req.body.userId });
    if (!user) return next(createError(404, 'Không tìm thấy người dùng'));
    console.log(user);

    const passwordIsCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!passwordIsCorrect) {
      return next(createError(400, 'Mật khẩu không chính xác'));
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.newPassword, salt);
      user.password = hash.toString();
      await user.save();
      res.status(200).json({
        status: 'Reset password successfully',
      });
    }
  } catch (err) {
    next(err);
  }
};
