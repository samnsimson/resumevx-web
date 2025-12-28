'use client';
import { Button, ButtonProps, HoverCard, HoverCardRootProps, Icon, IconButton, Portal, Stack, Text } from '@chakra-ui/react';
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
	const ButtonComponent = label ? Button : IconButton;
	return (
		<Stack width={'full'} alignItems={'center'} justifyContent={'center'}>
			<HoverCard.Root size={'sm'} positioning={position} openDelay={0} closeDelay={0}>
				<HoverCard.Trigger asChild>
					<ButtonComponent variant={'ghost'} size={'lg'} colorPalette={'blue'} rounded={'full'} _hover={{ color: 'blue.600' }} asChild {...props}>
						<Link href={href}>
							<Icon as={icon} boxSize={'24px'} />
							{label ?? null}
						</Link>
					</ButtonComponent>
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
		</Stack>
	);
};
