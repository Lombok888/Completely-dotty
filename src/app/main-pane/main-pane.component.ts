import {
  BounceAngle,
  CollisionBehaviour,
  MovementBehaviour,
} from "./../../classes/enums";
import {
  Component,
  Input,
  ViewChild,
  ElementRef,
  AfterViewInit,
  EventEmitter,
  Output,
} from "@angular/core";
import { MovingDots } from "./../../classes/movingdots";
import { Dot } from "./../../classes/dot";
import { DataService } from "./../../classes/data.service";

@Component({
  selector: "app-main-pane",
  templateUrl: "./main-pane.component.html",
  styleUrls: ["./main-pane.component.css"],
})
export class MainPaneComponent implements AfterViewInit {
  constructor(private data: DataService) {}

  @Input()
  set releaseDotsClicked(value: boolean) {
    this.releaseDots();
  }

  @Output()
  fireDots = new EventEmitter();

  @ViewChild("myCanvas", { static: false }) canvas: ElementRef;

  public isMenuOpen: boolean = false;
  public onSidenavClick(): void {
    this.isMenuOpen = false;
  }

  private myCanvas: HTMLCanvasElement;

  public Dots: MovingDots;
  public message: string;
  public map = new Map<string, Dot>();
  public selectedDirection: string;
  public selectedCollision: string;
  public selectedMovement: string;

  public directions = [
    "Random",
    "Right",
    "Acute",
    "Obtuse",
    "VeryAcute",
    "VeryObtuse",
  ];

  public collisions = [
    "Pass through",
    "Random new",
    "Reverse direction",
    "One direction",
    "Clump",
    "Stick",
  ];

  public movements = ["Straight", "Zig zag", "Pulse"];

  set newMessage(newMessage: string) {
    if (newMessage == "default message") {
      return;
    }
    if (this.Dots == null) {
      return;
    }

    this.message = newMessage;

    var messageInt: number = parseInt(this.message);

    var nan = isNaN(messageInt);

    if (nan) {
      if (this.directions.map((x) => x).includes(this.message)) {
        var random: number;
        var directionName = this.message;

        var selectedBounceAngle = BounceAngle[directionName];

        this.Dots.dotList.forEach((dot) => {
          if (selectedBounceAngle == BounceAngle.Random) {
            var bounceAngleEnumLength = Object.keys(BounceAngle).length / 2 - 1;

            random = Math.floor(Math.random() * bounceAngleEnumLength);
            var randBounceAngle = BounceAngle[BounceAngle[random]];

            dot.bounceAngle = randBounceAngle;
          } else {
            dot.bounceAngle = selectedBounceAngle;
          }
        });
      }

      if (this.collisions.map((x) => x).includes(this.message)) {
        var nowhitespaceCollisionBehaviour = newMessage.replace(/\s/g, "");

        this.Dots.dotList.forEach((dot) => {
          dot.collisionBehaviour =
            CollisionBehaviour[nowhitespaceCollisionBehaviour];
        });
      }

      if (this.movements.map((x) => x).includes(this.message)) {
        var nowhitespaceMovementBehaviour = newMessage.replace(/\s/g, "");

        this.Dots.dotList.forEach((dot) => {
          dot.movementBehaviour =
            MovementBehaviour[nowhitespaceMovementBehaviour];
        });
      }

      return;
    }
  }

  ngOnInit() {
    this.selectedDirection = "Random"
    this.selectedCollision = "Random new"
    this.selectedMovement = "Straight"

    this.data.currentMessage.subscribe(
      (message) => (this.newMessage = message)
    );
  }

  ngAfterViewInit() {
    this.myCanvas = this.canvas.nativeElement as HTMLCanvasElement;
    this.fitToContainer(this.myCanvas);
  }

  fitToContainer(canvas) {
    canvas.style.width = "97%";
    canvas.style.height = "90%";
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  releaseTheDots() {
    this.releaseDots();
  }

  changeDirection(value) {
    this.data.changeMessage(value);
  }

  changeCollision(value) {
    this.data.changeMessage(value);
  }

  changeMovement(value) {
    this.data.changeMessage(value);
  }

  freezeDots() {
    if (this.Dots == null) {
      return;
    }

    this.Dots.dotList.forEach((dot) => {
      if (dot.isFrozen) {
        dot.isFrozen = false;
        dot.canMove = true;
      } else {
        dot.isFrozen = true;
      }
    });
  }

  releaseDots() {
    this.fitToContainer(this.myCanvas);

    this.Dots = new MovingDots(this.myCanvas);
  }
}
