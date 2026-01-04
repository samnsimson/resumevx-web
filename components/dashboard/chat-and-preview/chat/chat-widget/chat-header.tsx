'use client';
import { FC, HTMLAttributes } from 'react';
import { SectionTitle } from '../../../../ui/section-title';
import { LuSparkles } from 'react-icons/lu';
import { HStack } from '@chakra-ui/react';
import { ChatSettingsMenu } from './chat-settings-menu';

interface ChatHeaderProps extends HTMLAttributes<HTMLDivElement> {
	[x: string]: any;
}

export const ChatHeader: FC<ChatHeaderProps> = () => {
	return (
		<HStack justify={'space-between'}>
			<SectionTitle title="AI Assistant" description="Ask AI to tune your resume" paddingX={4} icon={LuSparkles} />
			<HStack paddingX={4}>
				<ChatSettingsMenu />
			</HStack>
		</HStack>
	);
};
