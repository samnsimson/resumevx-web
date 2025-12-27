import { FC, HTMLAttributes } from 'react';
import { Button, Card, Heading, HStack, Text, VStack } from '@chakra-ui/react';
import { LuTrash } from 'react-icons/lu';

interface DangerZoneProps extends HTMLAttributes<HTMLDivElement> {
	[x: string]: any;
}

export const DangerZone: FC<DangerZoneProps> = ({ ...props }) => {
	return (
		<Card.Root bg={'bg.muted'} width={'full'} {...props}>
			<Card.Header>
				<Heading color={'red.500'}>Danger Zone</Heading>
				<Text color={'GrayText'}>Irreversible actions that affect your account</Text>
			</Card.Header>
			<Card.Body>
				<HStack bg={'bg.panel'} rounded={'lg'} padding={4} gap={4} border={'1px solid'} borderColor={'border'} width={'full'}>
					<VStack align={'start'} gap={0} flex={1}>
						<Heading size={'md'}>Delete Account</Heading>
						<Text color={'GrayText'}>Permanently delete your account and all associated data</Text>
					</VStack>
					<Button variant={'surface'} colorPalette={'red'} size={'sm'}>
						<LuTrash />
						Delete Account
					</Button>
				</HStack>
			</Card.Body>
		</Card.Root>
	);
};
