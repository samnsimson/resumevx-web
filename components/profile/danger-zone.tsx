'use client';
import { FC } from 'react';
import { Button, CardRootProps, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LuTrash } from 'react-icons/lu';
import { AppCard } from '../ui/app-card';

interface DangerZoneProps extends CardRootProps {
	[x: string]: any;
}

export const DangerZone: FC<DangerZoneProps> = ({ ...props }) => {
	return (
		<AppCard title="Danger Zone" description="Irreversible actions that affect your account" {...props}>
			<HStack bg={'bg.muted'} rounded={'lg'} padding={4} gap={4} border={'1px solid'} borderColor={'border'} width={'full'}>
				<VStack align={'start'} gap={0} flex={1}>
					<Heading size={'md'}>Delete Account</Heading>
					<Text color={'GrayText'}>Permanently delete your account and all associated data</Text>
				</VStack>
				<Button variant={'solid'} colorPalette={'red'} size={'sm'}>
					<LuTrash />
					Delete Account
				</Button>
			</HStack>
		</AppCard>
	);
};
