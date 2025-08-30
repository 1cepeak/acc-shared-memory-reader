import pick from 'lodash/pick.js';

import { createSharedMemoryReader } from './dist/reader.js';

const reader = createSharedMemoryReader();

reader.start(250);

reader.on('physics', (data) => {
  const json = pick(data, ['gas', 'brake', 'gear', 'rpms', 'kmh', 'steerAngle']);

  console.clear();
  console.table(json);
});
