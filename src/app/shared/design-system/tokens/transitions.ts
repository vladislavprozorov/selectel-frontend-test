/**
 * Токены переходов для дизайн-системы
 */

export const Transitions = {
	duration: {
		fast: "150ms",
		base: "250ms",
		slow: "350ms",
		slower: "500ms",
	},
	timing: {
		linear: "linear",
		ease: "ease",
		easeIn: "ease-in",
		easeOut: "ease-out",
		easeInOut: "ease-in-out",
		spring: "cubic-bezier(0.4, 0, 0.2, 1)",
		bounce: "cubic-bezier(0.68, -0.55, 0.265, 1.55)",
	},
} as const;

export type TransitionScale = typeof Transitions;
