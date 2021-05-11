/**
 * db controller calls for Machine CRUD
 */

'use strict';

const db = require('../models');

module.exports = {
  // CREATE
  create: async (req, res, next) => {
    try {
      const newMachine = await db.Machine.create(req.body);
      res.json({ machine: newMachine });
    } catch (e) {
      next(e);
    }
  },
  // READ
  findById: async (req, res, next) => {
    try {
      const machine = await db.Machine.findById(req.params.id);
      res.json({ machine });
    } catch (e) {
      next(e);
    }
  },
  findAll: async (req, res, next) => {
    try {
      const allMachines = await db.Machine.find({});
      res.json({ machines: allMachines });
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
      const updated = await db.Machine.findByIdAndUpdate(
        id,
        operation,
        updateOptions
      );
      res.json({ machine: updated });
    } catch (e) {
      next(e);
    }
  },
  // DELETE
  delete: async (req, res, next) => {
    const id = req.params.id;
    try {
      const deleted = await db.Machine.deleteOne({ _id: id });
      res.json({ machine: deleted });
    } catch (e) {
      next(e);
    }
  },
};
