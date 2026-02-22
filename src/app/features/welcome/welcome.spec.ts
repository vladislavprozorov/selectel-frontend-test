import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { Welcome } from "./welcome.component";

describe("Welcome", () => {
	let component: Welcome;
	let fixture: ComponentFixture<Welcome>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [Welcome, RouterModule.forRoot([])],
		}).compileComponents();

		fixture = TestBed.createComponent(Welcome);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should display welcome title", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const title = compiled.querySelector("#welcome-title");

		expect(title?.textContent).toContain("Добро пожаловать");
	});

	it("should display author information", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const description = compiled.querySelector(".welcome__description");

		expect(description?.textContent).toContain("Владислав Прозоров");
	});

	it("should have link to menu page", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const link = compiled.querySelector('a[routerLink="/menu"]');

		expect(link).toBeTruthy();
		expect(link?.textContent).toContain("Перейти к меню");
	});

	it("should display feature cards", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const featureCards = compiled.querySelectorAll(".feature-card");

		expect(featureCards.length).toBe(3);
	});

	it("should display Signals API feature", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const features = Array.from(
			compiled.querySelectorAll(".feature-card__title"),
		);

		const hasSignalsFeature = features.some((el) =>
			el.textContent?.includes("Signals API"),
		);
		expect(hasSignalsFeature).toBe(true);
	});

	it("should display Design System feature", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const features = Array.from(
			compiled.querySelectorAll(".feature-card__title"),
		);

		const hasDesignSystemFeature = features.some((el) =>
			el.textContent?.includes("Design System"),
		);
		expect(hasDesignSystemFeature).toBe(true);
	});

	it("should display Accessibility feature", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const features = Array.from(
			compiled.querySelectorAll(".feature-card__title"),
		);

		const hasAccessibilityFeature = features.some((el) =>
			el.textContent?.includes("Accessibility"),
		);
		expect(hasAccessibilityFeature).toBe(true);
	});

	it("should have proper ARIA attributes for accessibility", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const section = compiled.querySelector("section");
		const link = compiled.querySelector('a[routerLink="/menu"]');

		expect(section?.getAttribute("role")).toBe("main");
		expect(section?.getAttribute("aria-labelledby")).toBe("welcome-title");
		expect(link?.getAttribute("aria-label")).toBeTruthy();
	});
});
