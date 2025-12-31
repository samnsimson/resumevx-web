'use client';
import { FC } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { LuRefreshCcw } from 'react-icons/lu';

interface StartOverButtonProps extends ButtonProps {
	[x: string]: any;
}

export const StartOverButton: FC<StartOverButtonProps> = ({ ...props }) => {
	return (
		<Button variant={'solid'} colorPalette={'blue'} size={'xl'} rounded={'full'} {...props}>
			<LuRefreshCcw />
			Start Over
		</Button>
	);
};
