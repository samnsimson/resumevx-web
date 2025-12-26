'use client';
import { Box, Heading, HStack, Show, StackProps, Text, Icon } from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';

interface SectionTitleProps extends StackProps {
	title: string;
	description?: string;
	icon?: IconType;
}

export const SectionTitle: FC<SectionTitleProps> = ({ title, description, icon, ...props }) => {
	return (
		<HStack padding={3} gap={6} flexShrink={0} bgColor={'transparent'} width={'full'} {...props}>
			{icon ? <Icon as={icon} size={'lg'} color={'LinkText'} /> : null}
			<Box width={'full'}>
				<Heading size={'sm'} color={'LinkText'}>
					{title}
				</Heading>
				<Show when={!!description}>
					<Text fontSize={'sm'} color={'GrayText'}>
						Provide the job description in the input box below
					</Text>
				</Show>
			</Box>
		</HStack>
	);
};
