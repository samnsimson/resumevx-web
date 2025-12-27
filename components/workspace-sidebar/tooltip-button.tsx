'use client';
import { Box, Button, ButtonProps, HoverCard, HoverCardRootProps, Icon, Portal, Text } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';
import { IconType } from 'react-icons';

interface ToolTipButtonProps extends Omit<ButtonProps, 'position'> {
	icon: IconType;
	href: string;
	label?: string;
	description?: string;
	position?: HoverCardRootProps['positioning'];
}

export const ToolTipButton: FC<ToolTipButtonProps> = ({ icon, href, label, description, position, ...props }) => {
	return (
		<Box>
			<HoverCard.Root size={'sm'} positioning={position} openDelay={0} closeDelay={0}>
				<HoverCard.Trigger asChild>
					<Button
						variant={'ghost'}
						color={'blue.600'}
						border={0}
						size={'lg'}
						boxSize={'78px'}
						rounded={'none'}
						asChild
						_hover={{ colorPalette: 'blue' }}
						{...props}
					>
						<Link href={href}>
							<Icon as={icon} boxSize={'24px'} />
							{label ?? null}
						</Link>
					</Button>
				</HoverCard.Trigger>
				<Portal>
					<HoverCard.Positioner>
						<HoverCard.Content maxWidth="240px" backgroundColor={'blue.500'}>
							<HoverCard.Arrow>
								<HoverCard.ArrowTip background={'blue.500'} />
							</HoverCard.Arrow>
							<Text color={'white'} fontWeight={'semibold'}>
								{description}
							</Text>
						</HoverCard.Content>
					</HoverCard.Positioner>
				</Portal>
			</HoverCard.Root>
		</Box>
	);
};
