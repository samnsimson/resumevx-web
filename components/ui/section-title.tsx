'use client';
import { Box, Heading, HStack, Show, StackProps, Text, Icon, HeadingProps, TextProps } from '@chakra-ui/react';
import { FC } from 'react';
import { IconType } from 'react-icons';

interface SectionTitleProps extends StackProps {
	title: string;
	description?: string;
	icon?: IconType;
	headingStyle?: HeadingProps;
	descriptionStyle?: TextProps;
}

export const SectionTitle: FC<SectionTitleProps> = ({ title, description, icon, headingStyle, descriptionStyle, ...props }) => {
	return (
		<HStack paddingY={3} gap={6} flexShrink={0} bgColor={'transparent'} {...props}>
			{icon ? <Icon as={icon} size={'lg'} color={'LinkText'} /> : null}
			<Box width={'full'}>
				<Heading size={'sm'} color={'LinkText'} {...headingStyle}>
					{title}
				</Heading>
				<Show when={!!description}>
					<Text fontSize={'sm'} color={'GrayText'} {...descriptionStyle}>
						Provide the job description in the input box below
					</Text>
				</Show>
			</Box>
		</HStack>
	);
};
