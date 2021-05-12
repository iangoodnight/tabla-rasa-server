/**
 * db controller for Job CRUD
 */

'use strict';

const db = require('../models');

module.exports = {
  // CREATE
  create: async (req, res, next) => {
    try {
      const newJob = await db.Job.create(req.body);
      res.json({ job: newJob });
    } catch (e) {
      next(e);
    }
  },
  // READ
  findById: async (req, res, next) => {
    try {
      const job = await db.Job.findById(req.params.id);
      res.json({ job });
    } catch (e) {
      next(e);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const allJobs = await db.Job.find({});
      res.json({ jobs: allJobs });
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
      const updated = await db.Job.findByIdAndUpdate(
        id,
        operation,
        updateOptions
      );
      res.json({ job: updated });
    } catch (e) {
      next(e);
    }
  },
  // DELETE
  delete: async (req, res, next) => {
    const id = req.params.id;
    try {
      const deleted = await db.Job.deleteOne({ _id: id });
      res.json({ job: deleted });
    } catch (e) {
      next(e);
    }
  },
};
