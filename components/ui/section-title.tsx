'use client';
import { Heading, HStack, Show, StackProps, Text, Icon, HeadingProps, TextProps, Stack } from '@chakra-ui/react';
import { FC, ReactNode } from 'react';
import { IconType } from 'react-icons';

export interface SectionTitleProps extends StackProps {
	title: string;
	description?: string;
	icon?: IconType | ReactNode;
	headingStyle?: HeadingProps;
	descriptionStyle?: TextProps;
}

export const RenderIcon = ({ icon }: { icon?: IconType | ReactNode }) => {
	if (!icon) return null;
	if (typeof icon === 'function') return <Icon as={icon} size={'lg'} color={'accent'} />;
	return icon as ReactNode;
};

export const SectionTitle: FC<SectionTitleProps> = ({ title, description, icon, headingStyle, descriptionStyle, ...props }) => {
	return (
		<HStack paddingY={3} gap={6} bgColor={'transparent'} {...props}>
			<RenderIcon icon={icon} />
			<Stack gap={1}>
				<Heading size={'md'} {...headingStyle}>
					{title}
				</Heading>
				<Show when={!!description}>
					<Text fontSize={'sm'} {...descriptionStyle}>
						{description}
					</Text>
				</Show>
			</Stack>
		</HStack>
	);
};
