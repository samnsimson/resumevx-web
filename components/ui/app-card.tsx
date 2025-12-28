'use client';
import { FC } from 'react';
import { Card, CardBodyProps, CardRootProps } from '@chakra-ui/react';
import { SectionTitle } from './section-title';
import { IconType } from 'react-icons';

interface AppCardProps extends CardRootProps {
	title: string;
	description: string;
	icon?: IconType;
}

interface AppCardHeadlessProps extends CardBodyProps {
	[x: string]: unknown;
}

export const AppCard: FC<AppCardProps> = ({ title, description, icon, children, ...props }) => {
	return (
		<Card.Root width={'full'} rounded={'xl'} {...props}>
			<Card.Header padding={0}>
				<SectionTitle title={title} description={description} icon={icon} />
			</Card.Header>
			<Card.Body padding={4} overflow={'auto'}>
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
