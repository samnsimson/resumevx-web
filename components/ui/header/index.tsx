'use client';
import { FC } from 'react';
import { Box, Heading, HStack, IconButton, Spacer, StackProps } from '@chakra-ui/react';
import { LogoutButton } from '../logout-button';
import { ColorModeButton } from '../color-mode-button';
import { LuUser } from 'react-icons/lu';
import Link from 'next/link';

interface HeaderProps extends StackProps {
	[x: string]: unknown;
}

export const Header: FC<HeaderProps> = ({ ...props }) => {
	return (
		<HStack minH={'72px'} justify={'space-between'} {...props}>
			<Box paddingX={4}>
				<Heading fontWeight={'bold'}>Frezume</Heading>
			</Box>
			<Spacer />
			<HStack gap={4} paddingX={4}>
				<ColorModeButton rounded={'full'} colorPalette={'blue'} variant={'ghost'} size={'lg'} />
				<IconButton rounded={'full'} colorPalette={'blue'} variant={'ghost'} size={'lg'} asChild>
					<Link href={'/dashboard/profile'}>
						<LuUser />
					</Link>
				</IconButton>
				<LogoutButton rounded={'full'} colorPalette={'blue'} variant={'ghost'} size={'lg'} iconOnly />
			</HStack>
		</HStack>
	);
};
