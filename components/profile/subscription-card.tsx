'use client';
import { FC } from 'react';
import { CardRootProps, Heading, Icon, Text, VStack, HStack, Button, Show, List, Stack } from '@chakra-ui/react';
import { LuCrown } from 'react-icons/lu';
import { Subscription } from '@/lib/api';
import { AppCard, AppCardHeadless } from '../ui/app-card';

interface SubscriptionCardProps extends CardRootProps {
	subscriptionInfo?: Subscription | null;
}

export const SubscriptionCard: FC<SubscriptionCardProps> = ({ subscriptionInfo, ...props }) => {
	return (
		<AppCard title="Subscription" description="Manage your subscription and billing information" {...props}>
			<Stack gap={4}>
				<Show when={subscriptionInfo}>
					{(subscription) => (
						<HStack bg={'bg.muted'} rounded={'lg'} padding={4} gap={6} border={'1px solid'} borderColor={'border'}>
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
				<AppCardHeadless bg={'bg.muted'} gap={4}>
					<Heading size={'sm'}>Pro Plan Benefits</Heading>
					<List.Root as={'ul'} paddingLeft={4} gap={2}>
						<List.Item fontSize={'sm'}>Unlimited resumes per month</List.Item>
						<List.Item fontSize={'sm'}>Advanced AI optimization</List.Item>
						<List.Item fontSize={'sm'}>Priority support</List.Item>
						<List.Item fontSize={'sm'}>Early access to new features</List.Item>
					</List.Root>
				</AppCardHeadless>
			</Stack>
		</AppCard>
	);
};
