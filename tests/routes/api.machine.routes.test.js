/**
 * Mocks and test for api routes
 */

'use strict';

const request = require('supertest');
const app = require('../../src/app');
const { dbConnect, dbDisconnect } = require('../test-utils/dbHandler.utils');

describe('API routes (machine)', () => {
  beforeAll(async () => dbConnect());

  afterAll(async () => dbDisconnect());

  const testMachine = {
    name: 'terminator',
  };
  let testId;

  it('should post new machines', async () => {
    const res = await request(app).post('/api/machine').send(testMachine);

    expect(res.statusCode).toEqual(200);
    expect(res.body.machine._id).toBeDefined();
    testId = res.body.machine._id;
    expect(res.body.machine.name).toBe(testMachine.name);
  });

  it('should get machine by id', async () => {
    const res = await request(app).get(`/api/machine/${testId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.machine._id).toBeDefined();
    expect(res.body.machine._id).toBe(testId);
    expect(res.body.machine.name).toBe(testMachine.name);
  });

  it('should fetch all without id', async () => {
    const secondMachine = {
      name: 't2',
    };
    const newMachine = await request(app)
      .post('/api/machine')
      .send(secondMachine);
    const res = await request(app).get('/api/machine');
    expect(newMachine.statusCode).toEqual(200);
    expect(res.statusCode).toEqual(200);
    expect(res.body.machines).toBeDefined();
    expect(res.body.machines.length).toEqual(2);
  });

  it('should update machine by id', async () => {
    const update = { name: 'arnold' };
    const res = await request(app).put(`/api/machine/${testId}`).send(update);
    expect(res.statusCode).toEqual(200);
    expect(res.body.machine).toBeDefined();
    expect(res.body.machine.name).toBe(update.name);
    expect(res.body.machine._id).toBe(testId);
  });

  it('should delete machine by id', async () => {
    const res = await request(app).delete(`/api/machine/${testId}`);
    const machinesLeft = await request(app).get('/api/machine');
    expect(res.statusCode).toEqual(200);
    expect(machinesLeft.body.machines.length).toEqual(1);
  });
});
