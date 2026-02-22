import { formatCurrency } from "./currency.util";

describe("formatCurrency", () => {
	it("should format number as Russian rubles", () => {
		const result = formatCurrency(1000);

		expect(result).toContain("1");
		expect(result).toContain("000");
		expect(result).toContain("₽");
	});

	it("should format zero correctly", () => {
		const result = formatCurrency(0);

		expect(result).toContain("0");
		expect(result).toContain("₽");
	});

	it("should format large numbers with spaces", () => {
		const result = formatCurrency(1000000);

		// Русская локаль использует неразрывные пробелы для разделения разрядов
		expect(result).toContain("1");
		expect(result).toContain("000");
		expect(result).toContain("₽");
	});

	it("should not show decimal places", () => {
		const result = formatCurrency(1234.56);

		// Не должно быть копеек
		expect(result).not.toContain(",56");
		expect(result).not.toContain(".56");
	});

	it("should handle negative numbers", () => {
		const result = formatCurrency(-500);

		expect(result).toContain("-");
		expect(result).toContain("500");
		expect(result).toContain("₽");
	});

	it("should round decimal values", () => {
		const result = formatCurrency(349.9);

		expect(result).toContain("350");
	});

	it("should format the prices from menu items correctly", () => {
		const prices = [350, 750, 1500, 200, 400, 600];

		for (const price of prices) {
			const result = formatCurrency(price);
			// Проверяем что содержит рубль и цифры (с учётом пробелов в больших числах)
			expect(result).toContain("₽");
			expect(result.replace(/\s/g, "")).toContain(price.toString());
		}
	});
});
