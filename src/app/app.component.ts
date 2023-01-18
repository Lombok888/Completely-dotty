import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Completely Dotty";

  dotsFired: boolean;
  bounceDirection: string;

  fireDotsFired() {
    this.dotsFired = true;
  }
}
