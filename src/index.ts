import { SharedMemoryReader } from './reader';

export function createSharedMemoryReader(): SharedMemoryReader {
  return new SharedMemoryReader();
}

export type * from './types';
