import { defineRecipe } from '@chakra-ui/react';

export const buttonRecipe = defineRecipe({
	base: {
		rounded: 'lg',
		fontWeight: 'semibold',
		colorPalette: 'primary',
	},
});

export const inputRecipe = defineRecipe({
	base: {
		rounded: 'lg',
		fontWeight: 'normal',
	},
});
