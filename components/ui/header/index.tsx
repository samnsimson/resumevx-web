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
		<HStack minH={'72px'} justify={'space-between'} divideX={'1px'} {...props}>
			<Box paddingX={4}>
				<Heading fontWeight={'bold'}>Resume vX</Heading>
			</Box>
			<Spacer />
			<HStack height={'full'} divideX={'1px'} gap={0}>
				<Box height={'full'}>
					<ColorModeButton height={'full'} rounded={'none'} variant={'ghost'} size={'md'} boxSize={'72px'} />
				</Box>
				<Box height={'full'}>
					<IconButton height={'full'} rounded={'none'} variant={'ghost'} size={'md'} boxSize={'72px'} asChild>
						<Link href={'/workspace/profile'}>
							<LuUser />
						</Link>
					</IconButton>
				</Box>
				<Box height={'full'}>
					<LogoutButton height={'full'} rounded={'none'} variant={'ghost'} size={'md'} boxSize={'72px'} iconOnly />
				</Box>
			</HStack>
		</HStack>
	);
};
