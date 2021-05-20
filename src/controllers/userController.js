/**
 * db controller for User CRUD
 */

'use strict';

const db = require('../models');
const {
  COOKIE_OPTIONS,
  getRefreshToken,
  getToken,
} = require('../utils/auth.utils');

module.exports = {
  // CREATE
  create: async (req, res, next) => {
    //    try {
    //      const newUser = await db.User.create(req.body);
    //      res.json({ user: newUser });
    //    } catch (e) {
    //      next(e);
    //    }
    try {
      const user = new db.User(req.body);
      const token = getToken({ _id: user._id });
      const refreshToken = getRefreshToken({ _id: user._id });
      user.refreshToken.push({ token: refreshToken });
      await user.save();
      res.cookie('refreshToken', refreshToken, COOKIE_OPTIONS);
      res.json({ success: true, token });
    } catch (err) {
      res.statusCode = 500;
      next(err);
    }
  },
  // READ
  findById: async (req, res, next) => {
    try {
      const user = await db.User.findById(req.params.id);
      res.json({ user });
    } catch (e) {
      next(e);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const allUsers = await db.User.find({});
      res.json({ users: allUsers });
    } catch (e) {
      next(e);
    }
  },
  // UPDATE
  update: async (req, res, next) => {
    const id = req.params.id;
    const updateOptions = {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true,
    };
    const operation = { $set: req.body };
    try {
      const updated = await db.User.findByIdAndUpdate(
        id,
        operation,
        updateOptions
      );
      res.json({ user: updated });
    } catch (e) {
      next(e);
    }
  },
  // DELETE
  delete: async (req, res, next) => {
    const id = req.params.id;
    try {
      const deleted = await db.User.deleteOne({ _id: id });
      res.json({ user: deleted });
    } catch (e) {
      next(e);
    }
  },
};
