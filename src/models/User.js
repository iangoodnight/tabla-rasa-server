/**
 * User model
 */

'use strict';

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const bcrypt = require('bcrypt');

const saltRounds = 10;

const schemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const userSchema = new Schema(
  {
    user: {
      type: String,
      required: true,
      unique: true,
      maxLength: 32,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
  },
  schemaOptions
);

userSchema.pre('save', async function save(next) {
  const user = this;
  // only hash if modified
  if (!user.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const User = model('User', userSchema);

module.exports = User;
