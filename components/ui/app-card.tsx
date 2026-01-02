'use client';
import { FC, ReactNode } from 'react';
import { Card, CardBodyProps, CardHeaderProps, CardRootProps, HStack, Show } from '@chakra-ui/react';
import { SectionTitle, SectionTitleProps } from './section-title';
import { IconType } from 'react-icons';

interface AppCardProps extends CardRootProps {
	title: string;
	description: string;
	icon?: IconType;
	bodyStyle?: CardBodyProps;
	headerStyle?: CardHeaderProps;
	titleStyle?: SectionTitleProps['headingStyle'];
	descriptionStyle?: SectionTitleProps['descriptionStyle'];
	actions?: ReactNode;
}

interface AppCardHeadlessProps extends CardBodyProps {
	[x: string]: unknown;
}

export const AppCard: FC<AppCardProps> = ({ title, description, icon, children, bodyStyle, headerStyle, titleStyle, descriptionStyle, actions, ...props }) => {
	return (
		<Card.Root flexDirection={'column'} width={'full'} rounded={'xl'} divideY={'1px'} divideColor={'border'} overflow={'hidden'} {...props}>
			<Card.Header paddingY={0} paddingX={4} {...headerStyle}>
				<HStack justify={'space-between'}>
					<SectionTitle title={title} description={description} icon={icon} headingStyle={titleStyle} descriptionStyle={descriptionStyle} />
					<Show when={actions}>{(actions) => actions}</Show>
				</HStack>
			</Card.Header>
			<Card.Body minHeight={0} padding={4} {...bodyStyle}>
				{children}
			</Card.Body>
		</Card.Root>
	);
};

export const AppCardHeadless: FC<AppCardHeadlessProps> = ({ children, ...props }) => {
	return (
		<Card.Root width={'full'} rounded={'xl'}>
			<Card.Body padding={4} {...props}>
				{children}
			</Card.Body>
		</Card.Root>
	);
};
