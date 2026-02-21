/**
 * Токены цвета для дизайн-системы
 */

export const Colors = {
	primary: {
		50: "#f0f4ff",
		100: "#e0e9ff",
		200: "#c7d2fe",
		300: "#a5b4fc",
		400: "#818cf8",
		500: "#667eea",
		600: "#5568d3",
		700: "#4453bc",
		800: "#3730a3",
		900: "#312e81",
	},
	secondary: {
		50: "#faf5ff",
		100: "#f3e8ff",
		200: "#e9d5ff",
		300: "#d8b4fe",
		400: "#c084fc",
		500: "#764ba2",
		600: "#9333ea",
		700: "#7e22ce",
		800: "#6b21a8",
		900: "#581c87",
	},
	neutral: {
		50: "#f9fafb",
		100: "#f3f4f6",
		200: "#e5e7eb",
		300: "#d1d5db",
		400: "#9ca3af",
		500: "#6b7280",
		600: "#4b5563",
		700: "#374151",
		800: "#1f2937",
		900: "#111827",
	},
	success: {
		50: "#ecfdf5",
		500: "#10b981",
		700: "#047857",
	},
	warning: {
		50: "#fffbeb",
		500: "#f59e0b",
		700: "#b45309",
	},
	error: {
		50: "#fef2f2",
		500: "#ef4444",
		700: "#b91c1c",
	},
	background: {
		light: "#ffffff",
		dark: "#f9fafb",
		darker: "#f3f4f6",
	},
} as const;

export type ColorPalette = typeof Colors;
