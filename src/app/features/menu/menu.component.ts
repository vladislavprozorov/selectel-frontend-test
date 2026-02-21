import {
	ChangeDetectionStrategy,
	Component,
	computed,
	effect,
	HostListener,
	signal,
} from "@angular/core";
import { formatCurrency } from "@shared/utils";
import { MENU_ITEMS } from "./data";
import type { MenuItem } from "./models";

const STORAGE_KEY = "menu-selected-items";

@Component({
	selector: "app-menu",
	standalone: true,
	templateUrl: "./menu.component.html",
	styleUrl: "./menu.component.scss",
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent {
	readonly items = signal<MenuItem[]>(this.loadFromStorage());

	readonly selectedCount = computed(
		() => this.items().filter((item) => item.selected).length,
	);

	readonly totalPrice = computed(() =>
		this.items()
			.filter((item) => item.selected)
			.reduce((sum, item) => sum + item.price, 0),
	);

	readonly formattedTotalPrice = computed(() =>
		formatCurrency(this.totalPrice()),
	);

	readonly selectedTitles = computed(() =>
		this.items()
			.filter((item) => item.selected)
			.map((item) => item.title)
			.join(", "),
	);

	constructor() {
		// Автосохранение в localStorage при изменении элементов
		effect(() => {
			const items = this.items();
			this.saveToStorage(items);
		});
	}

	toggleItem(id: number): void {
		this.items.update((items) =>
			items.map((item) =>
				item.id === id ? { ...item, selected: !item.selected } : item,
			),
		);
	}

	clearSelection(): void {
		this.items.update((items) =>
			items.map((item) => ({ ...item, selected: false })),
		);
	}

	formatPrice(price: number): string {
		return formatCurrency(price);
	}

	@HostListener("document:keydown.escape")
	onEscapePress(): void {
		if (this.selectedCount() > 0) {
			this.clearSelection();
		}
	}

	/**
	 * Загрузить элементы из localStorage
	 */
	private loadFromStorage(): MenuItem[] {
		try {
			const saved = localStorage.getItem(STORAGE_KEY);
			if (saved) {
				const savedIds = JSON.parse(saved) as number[];
				return MENU_ITEMS.map((item) => ({
					...item,
					selected: savedIds.includes(item.id),
				}));
			}
		} catch (error) {
			console.error("Failed to load from localStorage:", error);
		}
		return MENU_ITEMS;
	}

	/**
	 * сохранить выбранные ID элементов в localStorage
	 */
	private saveToStorage(items: MenuItem[]): void {
		try {
			const selectedIds = items
				.filter((item) => item.selected)
				.map((item) => item.id);
			localStorage.setItem(STORAGE_KEY, JSON.stringify(selectedIds));
		} catch (error) {
			console.error("Failed to save to localStorage:", error);
		}
	}
}
