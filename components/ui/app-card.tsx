'use client';
import { FC, ReactNode } from 'react';
import { Card, CardBodyProps, CardRootProps, HStack, Show } from '@chakra-ui/react';
import { SectionTitle } from './section-title';
import { IconType } from 'react-icons';

interface AppCardProps extends CardRootProps {
	title: string;
	description: string;
	icon?: IconType;
	body?: CardBodyProps;
	actions?: ReactNode;
}

interface AppCardHeadlessProps extends CardBodyProps {
	[x: string]: unknown;
}

export const AppCard: FC<AppCardProps> = ({ title, description, icon, children, body, actions, ...props }) => {
	return (
		<Card.Root width={'full'} rounded={'xl'} divideY={'1px'} divideColor={'border'} {...props}>
			<Card.Header paddingY={0} paddingX={4}>
				<HStack justify={'space-between'}>
					<SectionTitle title={title} description={description} icon={icon} />
					<Show when={actions}>{(actions) => actions}</Show>
				</HStack>
			</Card.Header>
			<Card.Body padding={4} overflow={'auto'} {...body}>
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
