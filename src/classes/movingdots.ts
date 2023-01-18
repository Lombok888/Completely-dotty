import { Dot } from "./dot";
import { BounceAngle, CollisionBehaviour, MovementBehaviour, Direction } from "./enums";

export class MovingDots {
  private readonly canvasContext;
  private readonly canvasWidth: number;
  private readonly canvasHeight: number;
  public dotList: Dot[] = [];

  public roundedCoordinateMap = new Map<string, Dot>();

  constructor(canvas: HTMLCanvasElement) {
    var random: number;
    var randomBounce: number;

    var bounceAngleEnumLength = Object.keys(BounceAngle).length / 2 - 1;

    for (let i = 0; i < 10000; i++) {
      random = Math.floor(Math.random() * 500) + 20;
      randomBounce = Math.floor(Math.random() * bounceAngleEnumLength);
      var randBounceAngle = BounceAngle[BounceAngle[randomBounce]];

      this.dotList.push(
        new Dot(
          random,
          random,
          1,
          1,
          "white",
          Direction.Up,
          CollisionBehaviour.Randomnew,
          MovementBehaviour.Straight,
          randBounceAngle,
          canvas.width,
          canvas.height,
          this.roundedCoordinateMap,
        )
      );
    }

    this.canvasContext = canvas.getContext("2d");
    this.canvasWidth = canvas.width;
    this.canvasHeight = canvas.height;
    window.requestAnimationFrame(() => this.draw());
  }

  draw() {
    this.canvasContext.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

    for (let i = 0; i < 10000; i++) {
      this.dotList[i].detectCollision(this.canvasWidth, this.canvasHeight);
      this.dotList[i].changeDirectionOffWall(
        this.canvasWidth,
        this.canvasHeight
      );

      if (this.dotList[i].canMove) {
        this.dotList[i].move();
      }

      this.dotList[i].draw(this.canvasContext);
    }

    this.roundedCoordinateMap.clear();

    window.requestAnimationFrame(() => this.draw());
  }
}
