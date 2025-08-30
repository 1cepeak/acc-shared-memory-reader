import { EventEmitter as l } from "node:events";
import { createRequire as d } from "node:module";
import * as t from "binutils";
const s = d(import.meta.url), i = s("@fynnix/node-easy-ipc");
class o extends l {
  _updateIntervalId;
  _physicsLength = 712;
  _graphicsLength = 1580;
  _staticLength = 820;
  _physicsBuffer = Buffer.alloc(this._physicsLength);
  _graphicsBuffer = Buffer.alloc(this._graphicsLength);
  _staticBuffer = Buffer.alloc(this._staticLength);
  _physicsMapper = new i.FileMapping();
  _graphicsMapper = new i.FileMapping();
  _staticMapper = new i.FileMapping();
  readChar(e) {
    return e.ReadBytes(2).toString().split("\0")[0];
  }
  readString(e, a) {
    return new Array(a).fill("").map(() => this.readChar(e)).join("");
  }
  readPhysics() {
    this._physicsMapper.createMapping(null, "Local\\acpmf_physics", this._physicsLength), this._physicsMapper.readInto(0, this._physicsLength, this._physicsBuffer);
    const e = new t.BinaryReader(this._physicsBuffer, "little");
    return {
      packetId: e.ReadUInt32(),
      gas: e.ReadFloat(),
      brake: e.ReadFloat(),
      fuel: e.ReadFloat(),
      gear: e.ReadUInt32() - 1,
      rpms: e.ReadUInt32(),
      steerAngle: e.ReadFloat(),
      kmh: e.ReadFloat(),
      velocity: new Array(3).fill(0).map(() => e.ReadFloat()),
      accG: new Array(3).fill(0).map(() => e.ReadFloat()),
      wheelSlip: new Array(4).fill(0).map(() => e.ReadFloat()),
      wheelLoad: new Array(4).fill(0).map(() => e.ReadFloat()),
      wheelPressure: new Array(4).fill(0).map(() => e.ReadFloat()),
      wheelAngularSpeed: new Array(4).fill(0).map(() => e.ReadFloat()),
      tyreWear: new Array(4).fill(0).map(() => e.ReadFloat()),
      tyreDirtyLevel: new Array(4).fill(0).map(() => e.ReadFloat()),
      tyreCoreTemp: new Array(4).fill(0).map(() => e.ReadFloat()),
      camberRAD: new Array(4).fill(0).map(() => e.ReadFloat()),
      suspensionTravel: new Array(4).fill(0).map(() => e.ReadFloat()),
      drs: e.ReadFloat(),
      tc: e.ReadFloat(),
      heading: e.ReadFloat(),
      pitch: e.ReadFloat(),
      roll: e.ReadFloat(),
      cgHeight: e.ReadFloat(),
      carDamage: new Array(5).fill(0).map(() => e.ReadFloat()),
      numberOfTyresOut: e.ReadUInt32(),
      isPitLimiterOn: e.ReadUInt32() > 0,
      abs: e.ReadFloat(),
      kersChange: e.ReadFloat(),
      kersInput: e.ReadFloat(),
      isAutoShifterOn: e.ReadUInt32() > 0,
      rideHeight: new Array(2).fill(0).map(() => e.ReadFloat()),
      turboBoost: e.ReadFloat(),
      ballast: e.ReadFloat(),
      airDensity: e.ReadFloat(),
      airTemp: e.ReadFloat(),
      roadTemp: e.ReadFloat(),
      localAngularVel: new Array(3).fill(0).map(() => e.ReadFloat()),
      finalFF: e.ReadFloat(),
      performanceMeter: e.ReadFloat(),
      engineBrake: e.ReadUInt32(),
      ersRecoveryLevel: e.ReadUInt32(),
      ersPowerLevel: e.ReadUInt32(),
      ersHeatCharging: e.ReadUInt32(),
      isERSCharging: e.ReadUInt32() > 0,
      kersCurrentKJ: e.ReadFloat(),
      isDRSAvailable: e.ReadUInt32() > 0,
      isDRSEnabled: e.ReadUInt32() > 0,
      brakeTemp: new Array(4).fill(0).map(() => e.ReadFloat()),
      clutch: e.ReadFloat(),
      tyreTempI: new Array(4).fill(0).map(() => e.ReadFloat()),
      tyreTempM: new Array(4).fill(0).map(() => e.ReadFloat()),
      tyreTempO: new Array(4).fill(0).map(() => e.ReadFloat()),
      isAIControlled: e.ReadUInt32() > 0,
      tyreContactPoint: new Array(4).fill([]).map(() => new Array(3).fill(0).map(() => e.ReadFloat())),
      tyreContactNormal: new Array(4).fill([]).map(() => new Array(3).fill(0).map(() => e.ReadFloat())),
      tyreContactHeading: new Array(4).fill([]).map(() => new Array(3).fill(0).map(() => e.ReadFloat())),
      brakeBias: e.ReadFloat(),
      localVelocity: new Array(3).fill(0).map(() => e.ReadFloat()),
      p2pActivation: e.ReadUInt32(),
      p2pStatus: e.ReadUInt32(),
      currentMaxRpm: e.ReadFloat(),
      mz: new Array(4).fill(0).map(() => e.ReadFloat()),
      fx: new Array(4).fill(0).map(() => e.ReadFloat()),
      fy: new Array(4).fill(0).map(() => e.ReadFloat()),
      slipRatio: new Array(4).fill(0).map(() => e.ReadFloat()),
      slipAngle: new Array(4).fill(0).map(() => e.ReadFloat()),
      tcinAction: e.ReadUInt32(),
      absInAction: e.ReadUInt32(),
      suspensionDamage: new Array(4).fill(0).map(() => e.ReadFloat()),
      tyreTemp: new Array(4).fill(0).map(() => e.ReadFloat()),
      waterTemp: e.ReadFloat(),
      brakePressure: new Array(4).fill(0).map(() => e.ReadFloat()),
      frontBrakeCompound: e.ReadUInt32(),
      rearBrakeCompound: e.ReadUInt32(),
      padLife: new Array(4).fill(0).map(() => e.ReadFloat()),
      discLife: new Array(4).fill(0).map(() => e.ReadFloat()),
      isIgnitionOn: e.ReadUInt32() > 0,
      isEngineStarterOn: e.ReadUInt32() > 0,
      isEngineRunning: e.ReadUInt32() > 0,
      kerbVibration: e.ReadFloat(),
      slipVibrations: e.ReadFloat(),
      gVibrations: e.ReadFloat(),
      absVibrations: e.ReadFloat()
    };
  }
  getACCStatus(e) {
    return {
      0: "off",
      1: "replay",
      2: "live",
      3: "pause"
    }[e];
  }
  getSessionType(e) {
    return {
      "-1": "unknown",
      0: "practice",
      1: "qualifying",
      2: "race",
      3: "hot-lap",
      4: "time-attack",
      5: "drift",
      6: "drag",
      7: "hot-stint",
      8: "hot-lap-super-pole"
    }[e];
  }
  getPenaltyType(e) {
    return [1, 7, 19].includes(e) ? "dt" : [2, 8].includes(e) ? "sg-10" : [3, 9].includes(e) ? "sg-20" : [4, 10].includes(e) ? "sg-30" : [5, 11, 13, 15, 16, 17, 18, 20, 21].includes(e) ? "dsq" : [6, 12].includes(e) ? "rbl" : "none";
  }
  getFlag(e) {
    return {
      0: "none",
      1: "blue",
      2: "yellow",
      3: "black",
      4: "white",
      5: "checkered",
      6: "penalty",
      7: "green",
      8: "orange"
    }[e];
  }
  getPenaltyReason(e) {
    return e >= 1 && e <= 6 ? "cut" : e >= 7 && e <= 12 ? "pit-speed-limit" : {
      0: "none",
      13: "ignored-mandatory-pit",
      14: "post-race-time",
      15: "trolling",
      16: "pit-entry",
      17: "pit-exit",
      18: "wrong-way",
      19: "ignored-driver-stint",
      20: "ignored-driver-stint",
      21: "exceeded-driver-stint-limit"
    }[e];
  }
  getPenaltyInfo(e) {
    return {
      penaltyType: this.getPenaltyType(e),
      penaltyReason: this.getPenaltyReason(e)
    };
  }
  getTrackGripStatus(e) {
    return {
      0: "green",
      1: "fast",
      2: "optimum",
      3: "greasy",
      4: "damp",
      5: "wet",
      6: "flooded"
    }[e];
  }
  getRainIntensity(e) {
    return {
      0: "no-rain",
      1: "drizzle",
      2: "light-rain",
      3: "medium-rain",
      4: "heavy-rain",
      5: "thunderstorm"
    }[e];
  }
  readGraphics() {
    this._graphicsMapper.createMapping(null, "Local\\acpmf_graphics", this._graphicsLength), this._graphicsMapper.readInto(0, this._graphicsLength, this._graphicsBuffer);
    const e = new t.BinaryReader(this._graphicsBuffer, "little");
    return {
      packetId: e.ReadUInt32(),
      status: this.getACCStatus(e.ReadUInt32()),
      session: this.getSessionType(e.ReadInt32()),
      currentTime: this.readString(e, 15),
      lastTime: this.readString(e, 15),
      bestTime: this.readString(e, 15),
      split: this.readString(e, 15),
      completedLaps: e.ReadUInt32(),
      position: e.ReadUInt32(),
      iCurrentTime: e.ReadUInt32(),
      iLastTime: e.ReadUInt32(),
      iBestTime: e.ReadUInt32(),
      sessionTimeLeft: e.ReadFloat(),
      distanceTraveled: e.ReadFloat(),
      isInPit: e.ReadUInt32() > 0,
      currentSectorIndex: e.ReadUInt32(),
      lastSectorTime: e.ReadUInt32(),
      numberOfLaps: e.ReadUInt32(),
      tyreCompound: this.readString(e, 34),
      replayTimeMultiplier: e.ReadFloat(),
      normalizedCarPosition: e.ReadFloat(),
      activeCars: e.ReadUInt32(),
      carCoordinates: new Array(60).fill([]).map(() => new Array(3).fill(0).map(() => e.ReadFloat())).filter(([a, r, n]) => a && r && n),
      carID: new Array(60).fill(0).map(() => e.ReadUInt32()).filter(Boolean),
      playerCarID: e.ReadUInt32(),
      penaltyTime: e.ReadFloat(),
      flag: this.getFlag(e.ReadUInt32()),
      ...this.getPenaltyInfo(e.ReadUInt32()),
      isIdealLineOn: e.ReadUInt32() > 0,
      isInPitLane: e.ReadUInt32() > 0,
      surfaceGrip: e.ReadFloat(),
      isMandatoryPitDone: e.ReadUInt32() > 0,
      windSpeed: e.ReadFloat(),
      windDirection: e.ReadFloat(),
      isSetupMenuVisible: e.ReadUInt32() > 0,
      mainDisplayIndex: e.ReadUInt32(),
      secondaryDisplayIndex: e.ReadUInt32(),
      tc: e.ReadUInt32(),
      tcCut: e.ReadUInt32(),
      engineMap: e.ReadUInt32(),
      abs: e.ReadUInt32(),
      fuelXLap: e.ReadFloat(),
      rainLights: e.ReadUInt32() > 0,
      flashingLights: e.ReadUInt32() > 0,
      lightsStage: e.ReadUInt32(),
      exhaustTemperature: e.ReadFloat(),
      wiperLV: e.ReadUInt32(),
      driverStintTotalTimeLeft: e.ReadInt32(),
      driverStintTimeLeft: e.ReadInt32(),
      rainTyres: e.ReadUInt32() > 0,
      sessionIndex: e.ReadUInt32(),
      usedFuel: e.ReadFloat(),
      deltaLapTime: this.readString(e, 16),
      iDeltaLapTime: e.ReadUInt32(),
      estimatedLapTime: this.readString(e, 16),
      iEstimatedLapTime: e.ReadUInt32(),
      isDeltaPositive: e.ReadUInt32() > 0,
      iSplit: e.ReadUInt32(),
      isValidLap: e.ReadUInt32() > 0,
      fuelEstimatedLaps: e.ReadFloat(),
      trackStatus: this.readString(e, 34),
      missingMandatoryPits: e.ReadUInt32(),
      clock: e.ReadFloat(),
      directionLightsLeft: e.ReadUInt32() > 0,
      directionLightsRight: e.ReadUInt32() > 0,
      isGlobalYellow: e.ReadUInt32() > 0,
      isGlobalYellow1: e.ReadUInt32() > 0,
      isGlobalYellow2: e.ReadUInt32() > 0,
      isGlobalYellow3: e.ReadUInt32() > 0,
      isGlobalWhite: e.ReadUInt32() > 0,
      isGlobalGreen: e.ReadUInt32() > 0,
      isGlobalChequered: e.ReadUInt32() > 0,
      isGlobalRed: e.ReadUInt32() > 0,
      mfdTyreSet: e.ReadUInt32(),
      mfdFuelToAdd: e.ReadFloat(),
      mfdTyrePressureLF: e.ReadFloat(),
      mfdTyrePressureRF: e.ReadFloat(),
      mfdTyrePressureLR: e.ReadFloat(),
      mfdTyrePressureRR: e.ReadFloat(),
      trackGripStatus: this.getTrackGripStatus(e.ReadUInt32()),
      rainIntensity: this.getRainIntensity(e.ReadUInt32()),
      rainIntensityIn10min: this.getRainIntensity(e.ReadUInt32()),
      rainIntensityIn30min: this.getRainIntensity(e.ReadUInt32()),
      currentTyreSet: e.ReadUInt32(),
      strategyTyreSet: e.ReadUInt32()
    };
  }
  readStatic() {
    this._staticMapper.createMapping(null, "Local\\acpmf_static", this._staticLength), this._staticMapper.readInto(0, this._staticLength, this._staticBuffer);
    const e = new t.BinaryReader(this._staticBuffer, "little");
    return {
      smVersion: this.readString(e, 15),
      acVersion: this.readString(e, 15),
      numberOfSessions: e.ReadUInt32(),
      numCars: e.ReadUInt32(),
      carModel: this.readString(e, 33),
      track: this.readString(e, 33),
      playerFirstName: this.readString(e, 33),
      playerLastName: this.readString(e, 33),
      playerShortName: this.readString(e, 34),
      sectorCount: e.ReadUInt32(),
      maxTorque: e.ReadFloat(),
      maxPower: e.ReadFloat(),
      maxRPM: e.ReadUInt32(),
      maxFuel: e.ReadUInt32(),
      suspensionMaxTravel: new Array(4).fill(0).map(() => e.ReadFloat()),
      tyreRadius: new Array(4).fill(0).map(() => e.ReadFloat()),
      maxTurboBoost: e.ReadFloat(),
      deprecated_1: e.ReadFloat(),
      deprecated_2: e.ReadFloat(),
      isPenaltiesEnabled: e.ReadUInt32() > 0,
      aidFuelRate: e.ReadFloat(),
      aidTireRate: e.ReadFloat(),
      aidMechanicalDamage: e.ReadFloat(),
      isAllowedTyreBlankets: e.ReadFloat() > 0,
      isAidStabilityEnabled: e.ReadFloat() > 0,
      isAidAutoClutchEnabled: e.ReadUInt32() > 0,
      isAidAutoBlipEnabled: e.ReadUInt32() > 0,
      hasDRS: e.ReadUInt32() > 0,
      hasERS: e.ReadUInt32() > 0,
      hasKERS: e.ReadUInt32() > 0,
      kersMaxJ: e.ReadFloat(),
      engineBrakeSettingsCount: e.ReadUInt32(),
      ersPowerControllerCount: e.ReadUInt32(),
      trackSplineLength: e.ReadFloat(),
      trackConfiguration: this.readString(e, 34),
      ersMaxJ: e.ReadFloat(),
      isTimedRace: e.ReadUInt32() > 0,
      hasExtraLap: e.ReadUInt32() > 0,
      carSkin: this.readString(e, 34),
      reversedGridPositions: e.ReadUInt32(),
      pitWindowStart: e.ReadUInt32(),
      pitWindowEnd: e.ReadUInt32(),
      isOnline: e.ReadUInt32() > 0,
      dryTyresName: this.readString(e, 33),
      wetTyresName: this.readString(e, 33)
    };
  }
  start(e) {
    this._updateIntervalId = setInterval(() => {
      this.emit("physics", this.readPhysics()), this.emit("graphics", this.readGraphics()), this.emit("static", this.readStatic());
    }, e);
  }
  stop() {
    clearInterval(this._updateIntervalId), this._physicsMapper.closeMapping(), this._graphicsMapper.closeMapping(), this._staticMapper.closeMapping();
  }
}
function m() {
  return new o();
}
export {
  m as createSharedMemoryReader
};
