export const rules = [
  { from: 'params', key: 'id', type: 'string', required: true },
  { from: 'body', key: 'name', type: 'string', required: true },
  { from: 'body', key: 'address', type: 'object', required: true },
  { from: 'body', key: 'country', type: 'string', required: true },
  { from: 'body', key: 'region', type: 'string', required: false },
  { from: 'body', key: 'status', type: 'string', required: false },
  { from: 'body', key: 'lastUpdate', type: 'date', required: false },
  { from: 'body', key: 'updatedBy', type: 'string', required: false },
];
