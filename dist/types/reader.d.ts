import { EventEmitter } from 'node:events';
export declare class SharedMemoryReader extends EventEmitter {
    private _updateIntervalId;
    private readonly _physicsLength;
    private readonly _graphicsLength;
    private readonly _staticLength;
    private readonly _physicsBuffer;
    private readonly _graphicsBuffer;
    private readonly _staticBuffer;
    private readonly _physicsMapper;
    private readonly _graphicsMapper;
    private readonly _staticMapper;
    private readChar;
    private readString;
    private readPhysics;
    private getACCStatus;
    private getSessionType;
    private getPenaltyType;
    private getFlag;
    private getPenaltyReason;
    private getPenaltyInfo;
    private getTrackGripStatus;
    private getRainIntensity;
    private readGraphics;
    private readStatic;
    start(updateInterval: number): void;
    stop(): void;
}
