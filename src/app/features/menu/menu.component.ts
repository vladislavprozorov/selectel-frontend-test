import {
	ChangeDetectionStrategy,
	Component,
	computed,
	signal,
} from "@angular/core";
import { fadeIn, scaleIn, slideInLeft } from "@shared/animations/animations";
import { MENU_ITEMS } from "./data/menu.data";
import type { MenuItem } from "./model/menu-item.model";

@Component({
	standalone: true,
	selector: "app-menu",
	templateUrl: "./menu.html",
	styleUrl: "./menu.css",
	changeDetection: ChangeDetectionStrategy.OnPush,
	animations: [fadeIn, slideInLeft, scaleIn],
})
export class Menu {
	readonly items = signal<MenuItem[]>(MENU_ITEMS);

	readonly selectedItems = computed(() =>
		this.items().filter((item) => item.selected),
	);

	readonly selectedCount = computed(() => this.selectedItems().length);

	readonly totalPrice = computed(() =>
		this.selectedItems().reduce((sum, item) => sum + item.price, 0),
	);

	readonly selectedTitles = computed(() =>
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
