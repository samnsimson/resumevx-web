'use client';
import { FC } from 'react';
import { Card, CardRootProps, Heading, Icon, Text, VStack, HStack, Button, Show, List } from '@chakra-ui/react';
import { LuCrown } from 'react-icons/lu';
import { SubscriptionResponse } from '@/lib/api';

interface SubscriptionCardProps extends CardRootProps {
	subscriptionInfo?: SubscriptionResponse | null;
}

export const SubscriptionCard: FC<SubscriptionCardProps> = ({ subscriptionInfo, ...props }) => {
	return (
		<Card.Root width={'full'} bg={'bg.muted'} {...props}>
			<Card.Header>
				<Heading size={'lg'}>Subscription</Heading>
				<Text color={'GrayText'}>Manage your subscription and billing information</Text>
			</Card.Header>
			<Card.Body gap={4}>
				<Show when={subscriptionInfo}>
					{(subscription) => (
						<HStack bg={'bg.panel'} rounded={'lg'} padding={4} gap={6} border={'1px solid'} borderColor={'border'}>
							<Icon as={LuCrown} size={'2xl'} color={'yellow.500'} />
							<VStack align={'start'} flex={1} gap={0}>
								<Text fontWeight={'bold'} textTransform={'capitalize'}>
									{subscription.plan}
								</Text>
								<Text color={'GrayText'}>{subscription.status}</Text>
							</VStack>
							<Button variant={'solid'} colorPalette={'blue'} size={'sm'}>
								<LuCrown />
								Upgrade Subscription
							</Button>
						</HStack>
					)}
				</Show>
				<Card.Root>
					<Card.Header>
						<Heading>Pro Plan Benefits</Heading>
					</Card.Header>
					<Card.Body>
						<List.Root as={'ul'} paddingLeft={4} gap={4}>
							<List.Item>Unlimited resumes per month</List.Item>
							<List.Item>Advanced AI optimization</List.Item>
							<List.Item>Priority support</List.Item>
							<List.Item>Early access to new features</List.Item>
						</List.Root>
					</Card.Body>
				</Card.Root>
			</Card.Body>
		</Card.Root>
	);
};
