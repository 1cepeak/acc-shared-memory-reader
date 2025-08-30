import { EventEmitter } from 'node:events';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);

const NodeIPC = require('@fynnix/node-easy-ipc');

import * as binutils from 'binutils';

import type { Graphics, Physics, Static } from './types';

type Mapper = NodeIPC.FileMapping;

export class SharedMemoryReader extends EventEmitter {
  private _updateIntervalId: NodeJS.Timeout | undefined;

  private readonly _physicsLength: number = 712;
  private readonly _graphicsLength: number = 1580;
  private readonly _staticLength: number = 820;

  private readonly _physicsBuffer: Buffer = Buffer.alloc(this._physicsLength);
  private readonly _graphicsBuffer: Buffer = Buffer.alloc(this._graphicsLength);
  private readonly _staticBuffer: Buffer = Buffer.alloc(this._staticLength);

  private readonly _physicsMapper: Mapper = new NodeIPC.FileMapping();
  private readonly _graphicsMapper: Mapper = new NodeIPC.FileMapping();
  private readonly _staticMapper: Mapper = new NodeIPC.FileMapping();

  private readChar(reader: binutils.BinaryReader): string {
    return reader.ReadBytes(2).toString().split('\x00')[0];
  }

  private readString(reader: binutils.BinaryReader, length: number): string {
    return new Array<string>(length)
      .fill('')
      .map(() => this.readChar(reader))
      .join('');
  }

  private readPhysics(): Physics {
    this._physicsMapper.createMapping(null, 'Local\\acpmf_physics', this._physicsLength);
    this._physicsMapper.readInto(0, this._physicsLength, this._physicsBuffer);

    const reader = new binutils.BinaryReader(this._physicsBuffer, 'little');

    return {
      packetId: reader.ReadUInt32(),
      gas: reader.ReadFloat(),
      brake: reader.ReadFloat(),
      fuel: reader.ReadFloat(),
      gear: reader.ReadUInt32() - 1,
      rpms: reader.ReadUInt32(),
      steerAngle: reader.ReadFloat(),
      kmh: reader.ReadFloat(),
      velocity: new Array<number>(3).fill(0).map(() => reader.ReadFloat()),
      accG: new Array<number>(3).fill(0).map(() => reader.ReadFloat()),
      wheelSlip: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      wheelLoad: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      wheelPressure: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      wheelAngularSpeed: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      tyreWear: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      tyreDirtyLevel: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      tyreCoreTemp: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      camberRAD: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      suspensionTravel: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      drs: reader.ReadFloat(),
      tc: reader.ReadFloat(),
      heading: reader.ReadFloat(),
      pitch: reader.ReadFloat(),
      roll: reader.ReadFloat(),
      cgHeight: reader.ReadFloat(),
      carDamage: new Array<number>(5).fill(0).map(() => reader.ReadFloat()),
      numberOfTyresOut: reader.ReadUInt32(),
      isPitLimiterOn: reader.ReadUInt32() > 0,
      abs: reader.ReadFloat(),
      kersChange: reader.ReadFloat(),
      kersInput: reader.ReadFloat(),
      isAutoShifterOn: reader.ReadUInt32() > 0,
      rideHeight: new Array<number>(2).fill(0).map(() => reader.ReadFloat()),
      turboBoost: reader.ReadFloat(),
      ballast: reader.ReadFloat(),
      airDensity: reader.ReadFloat(),
      airTemp: reader.ReadFloat(),
      roadTemp: reader.ReadFloat(),
      localAngularVel: new Array<number>(3).fill(0).map(() => reader.ReadFloat()),
      finalFF: reader.ReadFloat(),
      performanceMeter: reader.ReadFloat(),
      engineBrake: reader.ReadUInt32(),
      ersRecoveryLevel: reader.ReadUInt32(),
      ersPowerLevel: reader.ReadUInt32(),
      ersHeatCharging: reader.ReadUInt32(),
      isERSCharging: reader.ReadUInt32() > 0,
      kersCurrentKJ: reader.ReadFloat(),
      isDRSAvailable: reader.ReadUInt32() > 0,
      isDRSEnabled: reader.ReadUInt32() > 0,
      brakeTemp: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      clutch: reader.ReadFloat(),
      tyreTempI: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      tyreTempM: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      tyreTempO: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      isAIControlled: reader.ReadUInt32() > 0,
      tyreContactPoint: new Array<number[]>(4)
        .fill([])
        .map(() => new Array<number>(3).fill(0).map(() => reader.ReadFloat())),
      tyreContactNormal: new Array<number[]>(4)
        .fill([])
        .map(() => new Array<number>(3).fill(0).map(() => reader.ReadFloat())),
      tyreContactHeading: new Array<number[]>(4)
        .fill([])
        .map(() => new Array<number>(3).fill(0).map(() => reader.ReadFloat())),
      brakeBias: reader.ReadFloat(),
      localVelocity: new Array<number>(3).fill(0).map(() => reader.ReadFloat()),
      p2pActivation: reader.ReadUInt32(),
      p2pStatus: reader.ReadUInt32(),
      currentMaxRpm: reader.ReadFloat(),
      mz: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      fx: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      fy: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      slipRatio: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      slipAngle: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      tcinAction: reader.ReadUInt32(),
      absInAction: reader.ReadUInt32(),
      suspensionDamage: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      tyreTemp: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      waterTemp: reader.ReadFloat(),
      brakePressure: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      frontBrakeCompound: reader.ReadUInt32(),
      rearBrakeCompound: reader.ReadUInt32(),
      padLife: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      discLife: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      isIgnitionOn: reader.ReadUInt32() > 0,
      isEngineStarterOn: reader.ReadUInt32() > 0,
      isEngineRunning: reader.ReadUInt32() > 0,
      kerbVibration: reader.ReadFloat(),
      slipVibrations: reader.ReadFloat(),
      gVibrations: reader.ReadFloat(),
      absVibrations: reader.ReadFloat(),
    };
  }

  private getACCStatus(rawValue: number): Graphics['status'] {
    const map: Record<number, Graphics['status']> = {
      0: 'off',
      1: 'replay',
      2: 'live',
      3: 'pause',
    };

    return map[rawValue];
  }

  private getSessionType(rawValue: number): Graphics['session'] {
    const map: Record<number, Graphics['session']> = {
      '-1': 'unknown',
      0: 'practice',
      1: 'qualifying',
      2: 'race',
      3: 'hot-lap',
      4: 'time-attack',
      5: 'drift',
      6: 'drag',
      7: 'hot-stint',
      8: 'hot-lap-super-pole',
    };

    return map[rawValue];
  }

  private getPenaltyType(rawValue: number): Graphics['penaltyType'] {
    if ([1, 7, 19].includes(rawValue)) {
      return 'dt';
    }

    if ([2, 8].includes(rawValue)) {
      return 'sg-10';
    }

    if ([3, 9].includes(rawValue)) {
      return 'sg-20';
    }

    if ([4, 10].includes(rawValue)) {
      return 'sg-30';
    }

    if ([5, 11, 13, 15, 16, 17, 18, 20, 21].includes(rawValue)) {
      return 'dsq';
    }

    if ([6, 12].includes(rawValue)) {
      return 'rbl';
    }

    return 'none';
  }

  private getFlag(rawValue: number): Graphics['flag'] {
    const map: Record<number, Graphics['flag']> = {
      0: 'none',
      1: 'blue',
      2: 'yellow',
      3: 'black',
      4: 'white',
      5: 'checkered',
      6: 'penalty',
      7: 'green',
      8: 'orange',
    };

    return map[rawValue];
  }

  private getPenaltyReason(rawValue: number): Graphics['penaltyReason'] {
    if (rawValue >= 1 && rawValue <= 6) {
      return 'cut';
    }

    if (rawValue >= 7 && rawValue <= 12) {
      return 'pit-speed-limit';
    }

    const map: Record<number, Exclude<Graphics['penaltyReason'], 'cut' | 'pit-speed-limit'>> = {
      0: 'none',
      13: 'ignored-mandatory-pit',
      14: 'post-race-time',
      15: 'trolling',
      16: 'pit-entry',
      17: 'pit-exit',
      18: 'wrong-way',
      19: 'ignored-driver-stint',
      20: 'ignored-driver-stint',
      21: 'exceeded-driver-stint-limit',
    };

    return map[rawValue];
  }

  private getPenaltyInfo(value: number): Pick<Graphics, 'penaltyType' | 'penaltyReason'> {
    return {
      penaltyType: this.getPenaltyType(value),
      penaltyReason: this.getPenaltyReason(value),
    };
  }

  private getTrackGripStatus(rawValue: number): Graphics['trackGripStatus'] {
    const map: Record<number, Graphics['trackGripStatus']> = {
      0: 'green',
      1: 'fast',
      2: 'optimum',
      3: 'greasy',
      4: 'damp',
      5: 'wet',
      6: 'flooded',
    };

    return map[rawValue];
  }

  private getRainIntensity(rawValue: number): Graphics['rainIntensity'] {
    const map: Record<number, Graphics['rainIntensity']> = {
      0: 'no-rain',
      1: 'drizzle',
      2: 'light-rain',
      3: 'medium-rain',
      4: 'heavy-rain',
      5: 'thunderstorm',
    };

    return map[rawValue];
  }

  private readGraphics(): Graphics {
    this._graphicsMapper.createMapping(null, 'Local\\acpmf_graphics', this._graphicsLength);
    this._graphicsMapper.readInto(0, this._graphicsLength, this._graphicsBuffer);

    const reader = new binutils.BinaryReader(this._graphicsBuffer, 'little');

    return {
      packetId: reader.ReadUInt32(),
      status: this.getACCStatus(reader.ReadUInt32()),
      session: this.getSessionType(reader.ReadInt32()),
      currentTime: this.readString(reader, 15),
      lastTime: this.readString(reader, 15),
      bestTime: this.readString(reader, 15),
      split: this.readString(reader, 15),
      completedLaps: reader.ReadUInt32(),
      position: reader.ReadUInt32(),
      iCurrentTime: reader.ReadUInt32(),
      iLastTime: reader.ReadUInt32(),
      iBestTime: reader.ReadUInt32(),
      sessionTimeLeft: reader.ReadFloat(),
      distanceTraveled: reader.ReadFloat(),
      isInPit: reader.ReadUInt32() > 0,
      currentSectorIndex: reader.ReadUInt32(),
      lastSectorTime: reader.ReadUInt32(),
      numberOfLaps: reader.ReadUInt32(),
      tyreCompound: this.readString(reader, 34),
      replayTimeMultiplier: reader.ReadFloat(),
      normalizedCarPosition: reader.ReadFloat(),
      activeCars: reader.ReadUInt32(),
      carCoordinates: new Array<number[]>(60)
        .fill([])
        .map(() => new Array<number>(3).fill(0).map(() => reader.ReadFloat()))
        .filter(([x, y, z]) => x && y && z),
      carID: new Array<number>(60)
        .fill(0)
        .map(() => reader.ReadUInt32())
        .filter(Boolean),
      playerCarID: reader.ReadUInt32(),
      penaltyTime: reader.ReadFloat(),
      flag: this.getFlag(reader.ReadUInt32()),
      ...this.getPenaltyInfo(reader.ReadUInt32()),
      isIdealLineOn: reader.ReadUInt32() > 0,
      isInPitLane: reader.ReadUInt32() > 0,
      surfaceGrip: reader.ReadFloat(),
      isMandatoryPitDone: reader.ReadUInt32() > 0,
      windSpeed: reader.ReadFloat(),
      windDirection: reader.ReadFloat(),
      isSetupMenuVisible: reader.ReadUInt32() > 0,
      mainDisplayIndex: reader.ReadUInt32(),
      secondaryDisplayIndex: reader.ReadUInt32(),
      tc: reader.ReadUInt32(),
      tcCut: reader.ReadUInt32(),
      engineMap: reader.ReadUInt32(),
      abs: reader.ReadUInt32(),
      fuelXLap: reader.ReadFloat(),
      rainLights: reader.ReadUInt32() > 0,
      flashingLights: reader.ReadUInt32() > 0,
      lightsStage: reader.ReadUInt32(),
      exhaustTemperature: reader.ReadFloat(),
      wiperLV: reader.ReadUInt32(),
      driverStintTotalTimeLeft: reader.ReadInt32(),
      driverStintTimeLeft: reader.ReadInt32(),
      rainTyres: reader.ReadUInt32() > 0,
      sessionIndex: reader.ReadUInt32(),
      usedFuel: reader.ReadFloat(),
      deltaLapTime: this.readString(reader, 16),
      iDeltaLapTime: reader.ReadUInt32(),
      estimatedLapTime: this.readString(reader, 16),
      iEstimatedLapTime: reader.ReadUInt32(),
      isDeltaPositive: reader.ReadUInt32() > 0,
      iSplit: reader.ReadUInt32(),
      isValidLap: reader.ReadUInt32() > 0,
      fuelEstimatedLaps: reader.ReadFloat(),
      trackStatus: this.readString(reader, 34),
      missingMandatoryPits: reader.ReadUInt32(),
      clock: reader.ReadFloat(),
      directionLightsLeft: reader.ReadUInt32() > 0,
      directionLightsRight: reader.ReadUInt32() > 0,
      isGlobalYellow: reader.ReadUInt32() > 0,
      isGlobalYellow1: reader.ReadUInt32() > 0,
      isGlobalYellow2: reader.ReadUInt32() > 0,
      isGlobalYellow3: reader.ReadUInt32() > 0,
      isGlobalWhite: reader.ReadUInt32() > 0,
      isGlobalGreen: reader.ReadUInt32() > 0,
      isGlobalChequered: reader.ReadUInt32() > 0,
      isGlobalRed: reader.ReadUInt32() > 0,
      mfdTyreSet: reader.ReadUInt32(),
      mfdFuelToAdd: reader.ReadFloat(),
      mfdTyrePressureLF: reader.ReadFloat(),
      mfdTyrePressureRF: reader.ReadFloat(),
      mfdTyrePressureLR: reader.ReadFloat(),
      mfdTyrePressureRR: reader.ReadFloat(),
      trackGripStatus: this.getTrackGripStatus(reader.ReadUInt32()),
      rainIntensity: this.getRainIntensity(reader.ReadUInt32()),
      rainIntensityIn10min: this.getRainIntensity(reader.ReadUInt32()),
      rainIntensityIn30min: this.getRainIntensity(reader.ReadUInt32()),
      currentTyreSet: reader.ReadUInt32(),
      strategyTyreSet: reader.ReadUInt32(),
    };
  }

  private readStatic(): Static {
    this._staticMapper.createMapping(null, 'Local\\acpmf_static', this._staticLength);
    this._staticMapper.readInto(0, this._staticLength, this._staticBuffer);

    const reader = new binutils.BinaryReader(this._staticBuffer, 'little');

    return {
      smVersion: this.readString(reader, 15),
      acVersion: this.readString(reader, 15),
      numberOfSessions: reader.ReadUInt32(),
      numCars: reader.ReadUInt32(),
      carModel: this.readString(reader, 33),
      track: this.readString(reader, 33),
      playerFirstName: this.readString(reader, 33),
      playerLastName: this.readString(reader, 33),
      playerShortName: this.readString(reader, 34),
      sectorCount: reader.ReadUInt32(),
      maxTorque: reader.ReadFloat(),
      maxPower: reader.ReadFloat(),
      maxRPM: reader.ReadUInt32(),
      maxFuel: reader.ReadUInt32(),
      suspensionMaxTravel: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      tyreRadius: new Array<number>(4).fill(0).map(() => reader.ReadFloat()),
      maxTurboBoost: reader.ReadFloat(),
      deprecated_1: reader.ReadFloat(),
      deprecated_2: reader.ReadFloat(),
      isPenaltiesEnabled: reader.ReadUInt32() > 0,
      aidFuelRate: reader.ReadFloat(),
      aidTireRate: reader.ReadFloat(),
      aidMechanicalDamage: reader.ReadFloat(),
      isAllowedTyreBlankets: reader.ReadFloat() > 0,
      isAidStabilityEnabled: reader.ReadFloat() > 0,
      isAidAutoClutchEnabled: reader.ReadUInt32() > 0,
      isAidAutoBlipEnabled: reader.ReadUInt32() > 0,
      hasDRS: reader.ReadUInt32() > 0,
      hasERS: reader.ReadUInt32() > 0,
      hasKERS: reader.ReadUInt32() > 0,
      kersMaxJ: reader.ReadFloat(),
      engineBrakeSettingsCount: reader.ReadUInt32(),
      ersPowerControllerCount: reader.ReadUInt32(),
      trackSplineLength: reader.ReadFloat(),
      trackConfiguration: this.readString(reader, 34),
      ersMaxJ: reader.ReadFloat(),
      isTimedRace: reader.ReadUInt32() > 0,
      hasExtraLap: reader.ReadUInt32() > 0,
      carSkin: this.readString(reader, 34),
      reversedGridPositions: reader.ReadUInt32(),
      pitWindowStart: reader.ReadUInt32(),
      pitWindowEnd: reader.ReadUInt32(),
      isOnline: reader.ReadUInt32() > 0,
      dryTyresName: this.readString(reader, 33),
      wetTyresName: this.readString(reader, 33),
    };
  }

  public start(updateInterval: number): void {
    this._updateIntervalId = setInterval(() => {
      this.emit('physics', this.readPhysics());
      this.emit('graphics', this.readGraphics());
      this.emit('static', this.readStatic());
    }, updateInterval);
  }

  public stop(): void {
    clearInterval(this._updateIntervalId);

    this._physicsMapper.closeMapping();
    this._graphicsMapper.closeMapping();
    this._staticMapper.closeMapping();
  }
}
