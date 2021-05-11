/**
 * Mocks and tests for Machine model
 */

'use strict';

const { dbConnect, dbDisconnect } = require('../test-utils/dbHandler.utils');
const { Machine } = require('../../src/models');

const testMachine = {
  name: 'bowflex-pro6',
  staffing: 1,
  capacity: [
    {
      size: 'huge',
      ratePerMinute: 100,
      type: 'rep',
    },
  ],
  active: false,
  notes: 'Get swoll!',
};

describe('Machine model test', () => {
  beforeAll(async () => dbConnect());

  afterAll(async () => dbDisconnect());

  it('should create and save machine successfully', async () => {
    const validMachine = new Machine(testMachine);
    const savedMachine = await validMachine.save();

    expect(savedMachine._id).toBeDefined();
    expect(savedMachine.name).toBe(testMachine.name);
    expect(savedMachine.status).toBe(testMachine.status);
    expect(savedMachine.notes).toBe(testMachine.notes);
  });
});
