/**
 * Экспорт всех токенов дизайн-системы
 */

export { type BorderScale, Borders } from "./borders";
export { type ColorPalette, Colors } from "./colors";
export { type ShadowScale, Shadows } from "./shadows";
export { Spacing, type SpacingScale } from "./spacing";
export { type TransitionScale, Transitions } from "./transitions";
export { Typography, type TypographyScale } from "./typography";

import { Borders } from "./borders";
import { Colors } from "./colors";
import { Shadows } from "./shadows";
import { Spacing } from "./spacing";
import { Transitions } from "./transitions";
import { Typography } from "./typography";

/**
 * All design tokens in one object
 */
export const DesignTokens = {
	colors: Colors,
	spacing: Spacing,
	typography: Typography,
	shadows: Shadows,
	borders: Borders,
	transitions: Transitions,
} as const;
