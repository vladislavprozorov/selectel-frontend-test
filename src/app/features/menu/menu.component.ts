import { Component, computed, signal } from "@angular/core";
import { MENU_ITEMS } from "./data/menu.data";
import type { MenuItem } from "./model/menu-item.model";

@Component({
	standalone: true,
	selector: "app-menu",
	templateUrl: "./menu.html",
	styleUrl: "./menu.css",
})
export class Menu {
	items = signal<MenuItem[]>(MENU_ITEMS);

	selectedItems = computed(() => this.items().filter((item) => item.selected));

	selectedCount = computed(() => this.selectedItems().length);

	totalPrice = computed(() =>
		this.selectedItems().reduce((sum, item) => sum + item.price, 0),
	);

	selectedTitles = computed(() =>
		this.selectedItems()
			.map((item) => item.title)
			.join(", "),
	);

	toggleItem(id: number): void {
		this.items.update((items) =>
			items.map((item) =>
				item.id === id ? { ...item, selected: !item.selected } : item,
			),
		);
	}
}
