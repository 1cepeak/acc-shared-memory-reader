/// <reference types="vite/client" />

declare namespace NodeIPC {
  export class FileMapping {
    createMapping(file: string | null, name: string, size: number): void;
    openMapping(name: string, size: number): void;
    closeMapping(): void;
    writeBuffer(buffer: Buffer, destOffset: number, srcOffset: number, length: number): void;
    readInto(offset: number, length: number, buffer: Buffer): void;
  }
}

declare module 'binutils' {
  export class BinaryReader {
    constructor(buffer: Buffer, endian: 'little'): void;
    ReadInt8(): number;
    ReadInt32(): number;
    ReadUInt32(): number;
    ReadFloat(): number;
    ReadBytes(bytes: number): Buffer;
  }
}
