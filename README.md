# @icepeak/acc-shared-memory-reader

Assetto Corsa Competizione shared memory reader (IPC) for Node.js.

> ⚠️ This package can work only on Windows machines.
> **It is not compatible with other operating systems!**

## Requirements

Some of these deps (like `@fynnix/node-easy-ipc`) need to compile from C++ to Node.js external module using `node-gyp` (read more about [here](https://stackoverflow.com/questions/70315519/node-gyp-error-could-not-find-any-visual-studio-installation-to-use)).

* Node 22.18
* Node-gyp 11
* Python 3.13
* Windows 11
* Visual Studio 2022 (Windows SDK and latest build tools)

## Usage

```shell
npm i @icepeak/acc-shared-memory-reader
```

```ts
import { createSharedMemoryReader } from '@icepeak/acc-shared-memory-reader';

const reader = createSharedmemoryReader();

reader.start(250); // 250 - update interval in milliseconds

reader.on('physics', (data) => console.log(data));
reader.on('graphics', (data) => console.log(data)); 
reader.on('static', (data) => console.log(data));

reader.stop();
```
