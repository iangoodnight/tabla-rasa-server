/**
 * Job model
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

const jobSchema = new Schema(
  {
    count: {
      type: Number,
      max: 9_000_000,
    },
    lot: {
      type: String,
      maxLength: 32,
    },
    machine: {
      type: Schema.Types.ObjectId,
      ref: 'Machine',
    },
    po: {
      type: String,
      maxLength: 48,
    },
    priority: {
      type: Number,
      min: 0,
      max: 9,
    },
    scheduled: {
      type: Date,
    },
  },
  schemaOptions
);

const Job = model('Job', jobSchema);

module.exports = Job;
