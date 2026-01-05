'use client';
import { FC } from 'react';
import { Icon, IconButton, Menu, MenuRootProps, Portal } from '@chakra-ui/react';
import { HiTrash } from 'react-icons/hi2';
import { LuSettings } from 'react-icons/lu';
import { useChatStore } from '@/lib/store/chat.store';

interface ChatSettingsMenuProps extends Omit<MenuRootProps, 'children'> {
	[x: string]: any;
}

export const ChatSettingsMenu: FC<ChatSettingsMenuProps> = ({ ...props }) => {
	const { clearMessages } = useChatStore((state) => state);
	return (
		<Menu.Root {...props}>
			<Menu.Trigger asChild>
				<IconButton rounded={'full'} variant={'ghost'}>
					<LuSettings size={24} />
				</IconButton>
			</Menu.Trigger>
			<Portal>
				<Menu.Positioner>
					<Menu.Content>
						<Menu.Item value="clear-chats" onClick={() => clearMessages()}>
							<Icon as={HiTrash} color={'GrayText'} />
							Clear Chats
						</Menu.Item>
					</Menu.Content>
				</Menu.Positioner>
			</Portal>
		</Menu.Root>
	);
};
