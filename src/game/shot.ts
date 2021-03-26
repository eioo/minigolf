import Point from './point';

export class Shot {
  loopStuckCounter: number
  downhillStuckCounter: [number, number];
  notAffectedLocation: [Point, number];
  magnetStuckCounter:  [number, number];
  spinningStuck: [number, number];
  onHole:  [boolean, number];
  onLiquidOrSwamp:  [boolean, number];
  onLiquid: boolean;
  onMagnet: boolean;
  onDownhill: boolean;
  shouldSpin: boolean;
  var24: number;
  bounciness: number;
  somethingSpeedThing2: number;

  constructor(maxPlayers: number) {
    this.loopStuckCounter = 0;
    this.downhillStuckCounter = [0, maxPlayers],
    this.notAffectedLocation = [new Point(0, 0), maxPlayers],
    this.magnetStuckCounter = [0, maxPlayers],
    this.spinningStuck = [0, maxPlayers],
    this.onHole = [false, maxPlayers],
    this.onLiquidOrSwamp = [false, maxPlayers],
    this.onLiquid = false;
    this.onMagnet = false;
    this.onDownhill = false;
    this.shouldSpin = false;
    this.var24 = -1,
    this.bounciness = 1.0,
    this.somethingSpeedThing2 = 1.0,
  }
}