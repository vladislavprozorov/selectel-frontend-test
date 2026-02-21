import { type ComponentFixture, TestBed } from "@angular/core/testing";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./header.component";

describe("HeaderComponent", () => {
	let component: HeaderComponent;
	let fixture: ComponentFixture<HeaderComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HeaderComponent, RouterModule.forRoot([])],
		}).compileComponents();

		fixture = TestBed.createComponent(HeaderComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});

	it("should render header element", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		expect(compiled.querySelector("header")).toBeTruthy();
	});

	it("should have navigation with links", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const nav = compiled.querySelector("nav");
		const links = compiled.querySelectorAll("a[routerLink]");

		expect(nav).toBeTruthy();
		expect(links.length).toBeGreaterThan(0);
	});

	it("should have link to home page", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const homeLink = compiled.querySelector('a[routerLink="/welcome"]');

		expect(homeLink).toBeTruthy();
	});

	it("should have link to menu page", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const menuLink = compiled.querySelector('a[routerLink="/menu"]');

		expect(menuLink).toBeTruthy();
	});

	it("should apply routerLinkActive directive", () => {
		const compiled = fixture.nativeElement as HTMLElement;
		const linksWithActive = compiled.querySelectorAll("[routerLinkActive]");

		expect(linksWithActive.length).toBeGreaterThan(0);
	});
});
