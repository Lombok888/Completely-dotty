import {
  BounceAngle,
  CollisionBehaviour,
  Direction,
  MovementBehaviour,
} from "./enums";

export class Dot {
  xCoordinateOffset: number;
  yCoordinateOffset: number;
  topBounceAngle: number = 0;
  bottomBounceAngle: number = 0;
  leftBounceAngle: number = 0;
  rightBounceAngle: number = 0;
  zigzagIterator: any;
  pulseForwardIterator: number = 1;
  pulseBackIterator: number = 0;
  isFrozen: boolean;
  canMove: boolean = true;
  zigzagExtent = this.randomIntFromInterval(14,20)
  pulseForwardExtent = this.randomIntFromInterval(43,50)
  pulseBackExtent = this.randomIntFromInterval(-7,-10)

  constructor(
    public xCoordinate = 100,
    public yCoordinate = 100,
    public width = 2,
    public height = 2,
    public colour = "white",
    public direction,
    public collisionBehaviour: CollisionBehaviour,
    public movementBehaviour: MovementBehaviour,
    public bounceAngle: BounceAngle,
    public canvasWidth = 2,
    public canvasHeight = 2,
    public roundedCoordinateMap: Map<string, Dot>,
    public collisionDetected = false
  ) {}

  draw(canvasContext: CanvasRenderingContext2D) {
    canvasContext.beginPath();
    canvasContext.fillStyle = this.colour;
    canvasContext.fillRect(
      this.xCoordinate,
      this.yCoordinate,
      this.width,
      this.height
    );
  }

  move() {
    if (this.movementBehaviour == MovementBehaviour.Pulse) {
      this.pulseForwardIterator++;

      if (this.pulseForwardIterator == this.pulseForwardExtent) {
        if (this.direction == Direction.Left) {
          this.direction = Direction.Right;
        } else if (this.direction == Direction.Right) {
          this.direction = Direction.Left;
        } else if (this.direction == Direction.Up) {
          this.direction = Direction.Down;
        } else if (this.direction == Direction.Down) {
          this.direction = Direction.Up;
        }

        this.pulseForwardIterator = this.pulseBackExtent;
      } else if (this.pulseForwardIterator == 0) {
        if (this.direction == Direction.Left) {
          this.direction = Direction.Right;
        } else if (this.direction == Direction.Right) {
          this.direction = Direction.Left;
        } else if (this.direction == Direction.Up) {
          this.direction = Direction.Down;
        } else if (this.direction == Direction.Down) {
          this.direction = Direction.Up;
        }
      }
    }

    if (this.movementBehaviour == MovementBehaviour.Zigzag) {
      this.zigzagIterator++;

      if (this.zigzagIterator > this.zigzagExtent) {
        if (
          this.yCoordinate > 40 &&
          this.yCoordinate < this.canvasHeight - 40 &&
          this.xCoordinate < this.canvasWidth - 40 &&
          this.xCoordinate > 40
        ) {
          if (this.direction == Direction.Left) {
            this.direction = Direction.Right;
          } else if (this.direction == Direction.Right) {
            this.direction = Direction.Left;
          } else if (this.direction == Direction.Up) {
            this.direction = Direction.Down;
          } else if (this.direction == Direction.Down) {
            this.direction = Direction.Up;
          }
        }

        if (this.bounceAngle == BounceAngle.Acute) {
          this.bounceAngle = BounceAngle.Obtuse;
        } else if (this.bounceAngle == BounceAngle.Obtuse) {
          this.bounceAngle = BounceAngle.Acute;
        } else if (this.bounceAngle == BounceAngle.VeryAcute) {
          this.bounceAngle = BounceAngle.VeryObtuse;
        } else if (this.bounceAngle == BounceAngle.VeryObtuse) {
          this.bounceAngle = BounceAngle.VeryAcute;
        }

        this.zigzagIterator = 0;
      }
    } else {
      this.zigzagIterator = 0;
    }

    if (this.direction == Direction.Down) {
      this.yCoordinate += 2;
      if (this.bounceAngle == BounceAngle.Acute) {
        this.xCoordinate -= 2;
      } else if (this.bounceAngle == BounceAngle.VeryAcute) {
        this.xCoordinate -= 4;
      } else if (this.bounceAngle == BounceAngle.Obtuse) {
        this.xCoordinate += 2;
      } else if (this.bounceAngle == BounceAngle.VeryObtuse) {
        this.xCoordinate += 4;
      }
    } else if (this.direction == Direction.Up) {
      this.yCoordinate -= 2;
      if (this.bounceAngle == BounceAngle.Acute) {
        this.xCoordinate += 2;
      } else if (this.bounceAngle == BounceAngle.VeryAcute) {
        this.xCoordinate += 4;
      } else if (this.bounceAngle == BounceAngle.Obtuse) {
        this.xCoordinate -= 2;
      } else if (this.bounceAngle == BounceAngle.VeryObtuse) {
        this.xCoordinate -= 4;
      }
    } else if (this.direction == Direction.Left) {
      this.xCoordinate -= 2;
      if (this.bounceAngle == BounceAngle.Acute) {
        this.yCoordinate -= 2;
      } else if (this.bounceAngle == BounceAngle.VeryAcute) {
        this.yCoordinate -= 4;
      } else if (this.bounceAngle == BounceAngle.Obtuse) {
        this.yCoordinate += 2;
      } else if (this.bounceAngle == BounceAngle.VeryObtuse) {
        this.yCoordinate += 4;
      }
    } else if (this.direction == Direction.Right) {
      this.xCoordinate += 2;
      if (this.bounceAngle == BounceAngle.Acute) {
        this.yCoordinate += 2;
      } else if (this.bounceAngle == BounceAngle.VeryAcute) {
        this.yCoordinate += 4;
      } else if (this.bounceAngle == BounceAngle.Obtuse) {
        this.yCoordinate -= 2;
      } else if (this.bounceAngle == BounceAngle.VeryObtuse) {
        this.yCoordinate -= 4;
      }
    }
  }

  changeDirectionOffWall(canvasWidth: number, canvasHeight: number) {
    var directionStr = Direction[this.direction].toString();

    if (this.yCoordinate < 3) {
      if (directionStr != "Down") {
        this.direction = Direction["Down"];
      }
    } else if (this.yCoordinate > canvasHeight - 3) {
      if (directionStr != "Up") {
        this.direction = Direction["Up"];
      }
    } else if (this.xCoordinate > canvasWidth - 3) {
      if (directionStr != "Left") {
        this.direction = Direction["Left"];
      }
    } else if (this.xCoordinate < 3) {
      if (directionStr != "Right") {
        this.direction = Direction["Right"];
      }
    }
  }

  detectCollision(canvasWidth: number, canvasHeight: number) {
    var roundedXcoords: string = this.xCoordinate.toString();
    var roundedYcoords: string = this.yCoordinate.toString();

    var comboCoords = roundedXcoords + "_" + roundedYcoords;

    var collidedDot;

    if (!this.roundedCoordinateMap.has(comboCoords)) {
      this.roundedCoordinateMap.set(comboCoords, this);
      this.collisionDetected = false;
    } else {
      collidedDot = this.roundedCoordinateMap.get(comboCoords);
      this.roundedCoordinateMap.set(comboCoords, this);
      this.collisionDetected = true;

      if (this.isFrozen) {
        this.canMove = false;
      }
    }

    if (this.collisionDetected == true) {
      if (this.collisionBehaviour != CollisionBehaviour.Clump) {
        this.width = 1;
        this.height = 1;
      }

      if (this.collisionBehaviour == CollisionBehaviour.Passthrough) {
      } else if (
        this.collisionBehaviour == CollisionBehaviour.Reversedirection &&
        this.xCoordinate > 100 &&
        this.yCoordinate > 100 &&
        this.yCoordinate < canvasHeight - 100 &&
        this.xCoordinate < canvasWidth - 100
      ) {
        if (collidedDot != null) {
          this.bounceAngle = collidedDot.bounceAngle;
        }
        if (this.direction == Direction.Left) {
          this.direction = Direction.Right;
        } else if (this.direction == Direction.Right) {
          this.direction = Direction.Left;
        } else if (this.direction == Direction.Down) {
          this.direction = Direction.Up;
        } else if (this.direction == Direction.Up) {
          this.direction = Direction.Down;
        }
      } else if (this.collisionBehaviour == CollisionBehaviour.Randomnew) {
        var bounceAngleEnumLength = Object.keys(BounceAngle).length / 2 - 1;

        var random = Math.floor(Math.random() * bounceAngleEnumLength);

        this.bounceAngle = BounceAngle[BounceAngle[random]];
      } else if (this.collisionBehaviour == CollisionBehaviour.Onedirection) {
        this.direction = Direction["Left"];
      } else if (this.collisionBehaviour == CollisionBehaviour.Clump) {
        if (collidedDot != null) {
          this.direction = collidedDot.direction;

          if (this.width < 5) {
            this.width += 0.01;
            this.height += 0.01;
          }
        }
      } else if (this.collisionBehaviour == CollisionBehaviour.Stick) {
        if (collidedDot != null) {
          this.direction = collidedDot.direction;
          this.yCoordinate = this.yCoordinate - 1;
        }
      }
    }
  }

  randomIntFromInterval(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
