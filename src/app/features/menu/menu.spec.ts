import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { MENU_ITEMS } from "./data";
import { MenuComponent } from "./menu.component";

describe("MenuComponent", () => {
	let component: MenuComponent;
	let fixture: ComponentFixture<MenuComponent>;
	let localStorageMock: { [key: string]: string };

	beforeEach(async () => {
		// Mock localStorage
		localStorageMock = {};

		const localStorageStub = {
			getItem: (key: string): string | null => localStorageMock[key] || null,
			setItem: (key: string, value: string): void => {
				localStorageMock[key] = value;
			},
			removeItem: (key: string): void => {
				delete localStorageMock[key];
			},
			clear: (): void => {
				localStorageMock = {};
			},
		};

		Object.defineProperty(window, "localStorage", {
			value: localStorageStub,
			writable: true,
		});

		await TestBed.configureTestingModule({
			imports: [MenuComponent],
		}).compileComponents();

		fixture = TestBed.createComponent(MenuComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	afterEach(() => {
		localStorageMock = {};
	});

	describe("Component Initialization", () => {
		it("should create", () => {
			expect(component).toBeTruthy();
		});

		it("should load initial menu items", () => {
			expect(component.items().length).toBe(MENU_ITEMS.length);
		});

		it("should initialize with no selected items", () => {
			expect(component.selectedCount()).toBe(0);
		});

		it("should initialize with zero total price", () => {
			expect(component.totalPrice()).toBe(0);
		});
	});

	describe("Item Selection", () => {
		it("should toggle item selection", () => {
			const itemId = 1;
			component.toggleItem(itemId);

			const item = component.items().find((i) => i.id === itemId);
			expect(item?.selected).toBe(true);
		});

		it("should unselect item when toggled twice", () => {
			const itemId = 1;
			component.toggleItem(itemId);
			component.toggleItem(itemId);

			const item = component.items().find((i) => i.id === itemId);
			expect(item?.selected).toBe(false);
		});

		it("should update selected count when item is selected", () => {
			component.toggleItem(1);
			component.toggleItem(2);

			expect(component.selectedCount()).toBe(2);
		});

		it("should calculate correct total price for selected items", () => {
			component.toggleItem(1); // VPS Small: 350
			component.toggleItem(4); // Object Storage: 200

			expect(component.totalPrice()).toBe(550);
		});

		it("should format total price correctly", () => {
			component.toggleItem(1); // 350

			const formatted = component.formattedTotalPrice();
			expect(formatted).toContain("350");
			expect(formatted).toContain("₽");
		});

		it("should join selected titles correctly", () => {
			component.toggleItem(1); // VPS Small
			component.toggleItem(2); // VPS Medium

			const titles = component.selectedTitles();
			expect(titles).toContain("VPS Small");
			expect(titles).toContain("VPS Medium");
		});
	});

	describe("Clear Selection", () => {
		it("should clear all selected items", () => {
			component.toggleItem(1);
			component.toggleItem(2);
			component.toggleItem(3);

			component.clearSelection();

			expect(component.selectedCount()).toBe(0);
			expect(component.totalPrice()).toBe(0);
		});

		it("should not affect items when nothing is selected", () => {
			const initialCount = component.items().length;
			component.clearSelection();

			expect(component.items().length).toBe(initialCount);
			expect(component.selectedCount()).toBe(0);
		});
	});

	describe("Keyboard Shortcuts", () => {
		it("should clear selection on ESC key", () => {
			component.toggleItem(1);
			component.toggleItem(2);

			component.onEscapePress();

			expect(component.selectedCount()).toBe(0);
		});
	});

	describe("LocalStorage Persistence", () => {
		it("should save selected items to localStorage", () => {
			component.toggleItem(1);
			component.toggleItem(3);

			// Дождаться выполнения effect()
			TestBed.flushEffects();

			const saved = localStorage.getItem("menu-selected-items");
			expect(saved).toBeTruthy();

			if (saved) {
				const savedIds = JSON.parse(saved);
				expect(savedIds).toContain(1);
				expect(savedIds).toContain(3);
			}
		});

		it("should load selected items from localStorage on init", () => {
			// Сохраняем выбранные элементы
			localStorage.setItem("menu-selected-items", JSON.stringify([2, 4]));

			// Создаём новый экземпляр компонента
			const newFixture = TestBed.createComponent(MenuComponent);
			const newComponent = newFixture.componentInstance;
			newFixture.detectChanges();

			expect(newComponent.selectedCount()).toBe(2);
			const selectedIds = newComponent
				.items()
				.filter((item) => item.selected)
				.map((item) => item.id);
			expect(selectedIds).toContain(2);
			expect(selectedIds).toContain(4);
		});

		it("should handle corrupted localStorage data gracefully", () => {
			localStorage.setItem("menu-selected-items", "invalid json");

			const newFixture = TestBed.createComponent(MenuComponent);
			const newComponent = newFixture.componentInstance;
			newFixture.detectChanges();

			expect(newComponent.selectedCount()).toBe(0);
		});

		it("should clear localStorage when all items are deselected", () => {
			component.toggleItem(1);
			component.clearSelection();

			const saved = localStorage.getItem("menu-selected-items");
			if (saved) {
				const savedIds = JSON.parse(saved);
				expect(savedIds).toEqual([]);
			}
		});
	});

	describe("Currency Formatting", () => {
		it("should format price using formatPrice method", () => {
			const formatted = component.formatPrice(1500);

			expect(formatted).toContain("1");
			expect(formatted).toContain("500");
			expect(formatted).toContain("₽");
		});

		it("should format zero price", () => {
			const formatted = component.formatPrice(0);

			expect(formatted).toContain("0");
			expect(formatted).toContain("₽");
		});
	});

	describe("Edge Cases", () => {
		it("should handle selecting all items", () => {
			MENU_ITEMS.forEach((item) => {
				component.toggleItem(item.id);
			});

			expect(component.selectedCount()).toBe(MENU_ITEMS.length);

			const expectedTotal = MENU_ITEMS.reduce(
				(sum, item) => sum + item.price,
				0,
			);
			expect(component.totalPrice()).toBe(expectedTotal);
		});

		it("should handle toggle non-existent item gracefully", () => {
			const initialCount = component.selectedCount();
			component.toggleItem(999); // Non-existent ID

			expect(component.selectedCount()).toBe(initialCount);
		});

		it("should maintain immutability when toggling items", () => {
			const firstItems = component.items();
			component.toggleItem(1);
			const secondItems = component.items();

			expect(firstItems).not.toBe(secondItems);
		});
	});
});
