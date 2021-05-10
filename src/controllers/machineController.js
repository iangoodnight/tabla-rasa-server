/**
 * db controller calls for Machine CRUD
 */

'use strict';

const db = require('../models');

module.exports = {
  // CREATE
  create: async (req, res, next) => {
    const newMachine = await db.Machine.create(req.body);
    res.json({ machine: newMachine });
  },
  // READ
  findById: async (req, res, next) => {
    const machine = await db.Machine.findById(req.params.id);
    res.json({ machine });
  },
  findAll: async (req, res, next) => {
    const allMachines = await db.Machine.find({});
    res.json({ machines: allMachines });
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
    const updated = await db.Machine.findByIdAndUpdate(
      id,
      operation,
      updateOptions
    );
    res.json({ machine: updated });
  },
};
