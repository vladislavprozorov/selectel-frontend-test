import type { Routes } from "@angular/router";

export const routes: Routes = [
	{
		path: "",
		pathMatch: "full",
		redirectTo: "welcome",
	},
	{
		path: "welcome",
		loadComponent: () =>
			import("@features/welcome/welcome.component").then(
				({ Welcome }) => Welcome,
			),
	},
	{
		path: "menu",
		loadComponent: () =>
			import("@features/menu/menu.component").then(({ Menu }) => Menu),
	},
];
