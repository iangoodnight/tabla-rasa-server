/**
 * Mocks and tests for Job model
 */

'use strict';

const { dbConnect, dbDisconnect } = require('../test-utils/dbHandler.utils');
const { Machine, Job } = require('../../src/models');

describe('Job model test', () => {
  beforeAll(async () => dbConnect());

  afterAll(async () => dbDisconnect());

  it('should create and save jobs successfully', async () => {
    const testMachine = {
      name: 'test-machine',
    };
    const savedMachine = await Machine.create(testMachine);
    const machineId = savedMachine._id;
    const scheduleDate = new Date();
    scheduleDate.setMilliseconds(0);
    scheduleDate.setSeconds(0);
    const testJob = {
      count: 9_000,
      lot: '12345678',
      machine: machineId,
      po: 'PO123456789',
      priority: 1,
      scheduled: scheduleDate,
    };
    const savedJob = await Job.create(testJob);

    expect(savedJob._id).toBeDefined();
    expect(savedJob.lot).toBe(testJob.lot);
    expect(savedJob.machine).toBe(machineId);
    expect(savedJob.po).toBe(testJob.po);
    expect(savedJob.priority).toBe(testJob.priority);
    expect(savedJob.scheduled).toBe(scheduleDate);
  });
});
