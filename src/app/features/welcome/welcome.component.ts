import { Component, inject } from "@angular/core";
import { Title } from "@angular/platform-browser";
import { RouterLink } from "@angular/router";

@Component({
	selector: "app-welcome",
	standalone: true,
	imports: [RouterLink],
	templateUrl: "./welcome.html",
	styleUrl: "./welcome.css",
})
export class Welcome {
	private readonly title = inject(Title);

	constructor() {
		this.title.setTitle("Добро пожаловать | Selectel Frontend Test");
	}
}
