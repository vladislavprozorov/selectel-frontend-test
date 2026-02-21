import { resolve } from "node:path";
import angular from "@analogjs/vite-plugin-angular";
import { defineConfig } from "vitest/config";

export default defineConfig({
	plugins: [angular()],
	test: {
		globals: true,
		environment: "jsdom",
		include: ["**/*.spec.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: ["node_modules/", "**/*.spec.ts", "**/*.config.ts"],
		},
	},
	resolve: {
		alias: {
			"@features": resolve(__dirname, "./src/app/features"),
			"@core": resolve(__dirname, "./src/app/core"),
			"@shared": resolve(__dirname, "./src/app/shared"),
		},
	},
});
