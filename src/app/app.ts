import { Component, signal } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HeaderComponent } from "./layout/header/header.component";

@Component({
	selector: "app-root",
	imports: [RouterOutlet, HeaderComponent],
	standalone: true,
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App {
	protected readonly title = signal("selectel-test");
}
