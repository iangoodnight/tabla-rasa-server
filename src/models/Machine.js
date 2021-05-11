/*
 * Machine model
 * Details about the individual lines
 */

'use strict';

const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const schemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
};

const machineSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
      maxLength: 32,
    },
    staffing: {
      type: Number,
      min: 1,
      max: 10,
    },
    capacity: [
      {
        size: {
          type: String,
          lowercase: true,
          trim: true,
          maxLength: 16,
        },
        ratePerMinute: {
          type: Number,
          min: 1,
          max: 1_000,
        },
        type: {
          type: String,
          maxLength: 16,
        },
      },
    ],
    active: {
      type: Boolean,
      default: true,
    },
    notes: {
      type: String,
    },
  },
  schemaOptions
);

const Machine = model('Machine', machineSchema);

module.exports = Machine;
