/**
 * Convenience Seeder for machine collections
 */

'use strict';

module.exports = [
  {
    name: '5-gallon pail-filler',
    staffing: 2,
    capacity: [
      {
        size: '5 gallon',
        type: 'pail',
        ratePerMinute: 2,
      },
    ],
    notes:
      'The same staff member placing the pail on the filler will also label ' +
      'the pail. The second staff member will place the pail on the pallet. ' +
      'A member of the warehouse staff, or manager will remove the pallet ' +
      'and place it in the shipping area.',
  },
  {
    name: 'lip balm line',
    staffing: 6,
    capacity: [
      {
        size: 'lip balm',
        type: 'tube',
        ratePerMinute: 65,
      },
    ],
    notes:
      'If we run a private label job for a customer, and do not need to ' +
      'place in bags of 50, only 5 staff members are required.',
  },
  {
    name: 'can line filler',
    staffing: 5,
    capacity: [
      {
        type: 'can',
        ratePerMinute: 40,
      },
    ],
    notes:
      'We will decrease the number of staff members needed once the ' +
      'automatic capper is in place.  At that point, the number of staff ' +
      'required will be 3.',
  },
  {
    name: 'terco 12',
    staffing: 5,
    capacity: [
      {
        type: 'bottle',
        ratePerMinute: 50,
      },
    ],
    notes:
      'Currently we are awaiting a new fill head for this machine.  We are ' +
      'probably 5 weeks away from completion.',
  },
  {
    name: 'tube 4',
    staffing: 9,
    capacity: [
      {
        type: 'tube',
        ratePerMinute: 100,
      },
    ],
  },
  {
    name: 'tube 5',
    staffing: 3,
    capacity: [
      {
        type: 'tube',
        ratePerMinute: 30,
      },
    ],
  },
  {
    name: 'terco 2',
    capacity: [
      {
        size: '8 oz',
        type: 'bottle',
        ratePerMinute: 25,
      },
      {
        size: '16 oz',
        type: 'bottle',
        ratePerMinute: 15,
      },
    ],
  },
  {
    name: '4-head',
    staffing: 4,
    capacity: [
      {
        size: '16 oz',
        type: 'bottle',
        ratePerMinute: 60,
      },
      {
        size: '64 oz',
        type: 'bottle',
        ratePerMinute: 36,
      },
      {
        size: '1 gallon',
        type: 'jug',
        ratePerMinute: 20,
      },
    ],
    notes:
      '4-head will run multiple sizes of bottles at a very high rate of ' +
      'speed.  Depending on the size of bottles being run, staff required ' +
      'would be 3 - 5.  1 oz - 16 oz bottles run at 36 - 60 bottles per minute',
  },
  {
    name: 'elmar',
    staffing: 4,
    capacity: [
      {
        size: '1 gallon',
        type: 'jug',
        ratePerMinute: 15,
      },
    ],
  },
  {
    name: 'accutek',
    capacity: [
      {
        size: '4 oz',
        type: 'bottle',
        ratePerMinute: 15,
      },
      {
        size: '2 oz',
        type: 'bottle',
        ratePerMinute: 25,
      },
      {
        size: '1 oz',
        type: 'bottle',
        ratePerMinute: 30,
      },
    ],
  },
  {
    name: 'big mono',
    notes:
      'Big mono filler is designed for large 16 oz bottle runs and has been ' +
      'dormant for some time.  We will be reviewing its usefulness in the ' +
      'near future.',
    active: false,
  },
];
