/**
 * Анимации для Angular компонентов

 */

import {
	type AnimationTriggerMetadata,
	animate,
	query,
	stagger,
	style,
	transition,
	trigger,
} from "@angular/animations";

/**
 * Анимация появления (Fade In)
 * Использование: [@fadeIn]
 */
export const fadeIn: AnimationTriggerMetadata = trigger("fadeIn", [
	transition(":enter", [
		style({ opacity: 0, transform: "translateY(10px)" }),
		animate(
			"300ms ease-out",
			style({ opacity: 1, transform: "translateY(0)" }),
		),
	]),
]);

/**
 * Анимация появления слева (Slide In from Left)
 * Использование: [@slideInLeft]
 */
export const slideInLeft: AnimationTriggerMetadata = trigger("slideInLeft", [
	transition(":enter", [
		style({ opacity: 0, transform: "translateX(-20px)" }),
		animate(
			"400ms cubic-bezier(0.4, 0, 0.2, 1)",
			style({ opacity: 1, transform: "translateX(0)" }),
		),
	]),
]);

/**
 * Анимация появления справа (Slide In from Right)
 * Использование: [@slideInRight]
 */
export const slideInRight: AnimationTriggerMetadata = trigger("slideInRight", [
	transition(":enter", [
		style({ opacity: 0, transform: "translateX(20px)" }),
		animate(
			"400ms cubic-bezier(0.4, 0, 0.2, 1)",
			style({ opacity: 1, transform: "translateX(0)" }),
		),
	]),
]);

/**
 * Анимация увеличения (Scale In)
 * Использование: [@scaleIn]
 */
export const scaleIn: AnimationTriggerMetadata = trigger("scaleIn", [
	transition(":enter", [
		style({ opacity: 0, transform: "scale(0.95)" }),
		animate("200ms ease-out", style({ opacity: 1, transform: "scale(1)" })),
	]),
]);

/**
 * Анимация последовательного появления элементов списка (Stagger)
 * Использование: [@staggerList]
 */
export const staggerList: AnimationTriggerMetadata = trigger("staggerList", [
	transition("* => *", [
		query(
			":enter",
			[
				style({ opacity: 0, transform: "translateY(10px)" }),
				stagger("100ms", [
					animate(
						"300ms ease-out",
						style({ opacity: 1, transform: "translateY(0)" }),
					),
				]),
			],
			{ optional: true },
		),
	]),
]);

/**
 * Анимация появления с увеличением (Fade + Scale)
 * Использование: [@fadeScale]
 */
export const fadeScale: AnimationTriggerMetadata = trigger("fadeScale", [
	transition(":enter", [
		style({ opacity: 0, transform: "scale(0.9)" }),
		animate(
			"250ms cubic-bezier(0.4, 0, 0.2, 1)",
			style({ opacity: 1, transform: "scale(1)" }),
		),
	]),
	transition(":leave", [
		animate("200ms ease-in", style({ opacity: 0, transform: "scale(0.95)" })),
	]),
]);

/**
 * Анимация появления с эффектом подпрыгивания (Bounce In)
 * Использование: [@bounceIn]
 */
export const bounceIn: AnimationTriggerMetadata = trigger("bounceIn", [
	transition(":enter", [
		style({ opacity: 0, transform: "scale(0.3)" }),
		animate(
			"500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)",
			style({ opacity: 1, transform: "scale(1)" }),
		),
	]),
]);
