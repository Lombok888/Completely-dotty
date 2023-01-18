import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { FlexLayoutModule } from "@angular/flex-layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule } from "./material-module";
import { MainPaneComponent } from "./main-pane/main-pane.component";
import { DataService } from "src/classes/data.service";

@NgModule({
  declarations: [AppComponent, MainPaneComponent],
  imports: [
    BrowserModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
})
/**
 *
 *  This is the AppModule */
export class AppModule {}
