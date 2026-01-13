'use client';
import { FC, useState } from 'react';
import { CardRootProps, Heading, Icon, Text, VStack, HStack, Button, Show, List, Stack } from '@chakra-ui/react';
import { LuCrown, LuRocket } from 'react-icons/lu';
import { SubscriptionsApi } from '@/lib/api';
import { AppCard, AppCardHeadless } from '../ui/app-card';
import { useMutation } from '@tanstack/react-query';
import { createCheckoutSessionMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useRouter } from 'next/navigation';
import { toaster } from '../ui/toaster';
import { useAccessControl } from '../providers/access-control.provider';

interface SubscriptionCardProps extends CardRootProps {
	[key: string]: any;
}

export const SubscriptionCard: FC<SubscriptionCardProps> = ({ ...props }) => {
	const router = useRouter();
	const { isFreePlan, subscription } = useAccessControl();
	const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false);
	const { mutateAsync: createCheckoutSession } = useMutation({ ...createCheckoutSessionMutation() });

	async function upgradeSubscription() {
		try {
			setIsCreatingCheckoutSession(true);
			const priceId = 'price_1SVjD4RxuN7gvrMkdnA8CQCR';
			const successUrl = `${window.location.origin}/dashboard/payments/success`;
			const cancelUrl = `${window.location.origin}/dashboard/payments/failed`;
			const session = await createCheckoutSession({ body: { priceId, successUrl, cancelUrl } });
			router.push(session.url);
		} catch (error: any) {
			toaster.error({ title: 'Failed to upgrade subscription', description: error.message ?? 'Failed to upgrade subscription', closable: true });
		} finally {
			setIsCreatingCheckoutSession(false);
		}
	}

	const manageSubscription = async () => {
		try {
			setIsCreatingCheckoutSession(true);
			const returnUrl = `${window.location.origin}/dashboard/profile`;
			const { data } = await SubscriptionsApi.createPortalSession({ body: { returnUrl } });
			if (!data) throw new Error('Failed to create portal session');
			router.push(data.url);
		} catch (error: any) {
			toaster.error({ title: 'Failed to manage subscription', description: error.message ?? 'Failed to manage subscription', closable: true });
		} finally {
			setIsCreatingCheckoutSession(false);
		}
	};

	return (
		<AppCard title="Subscription" description="Manage your subscription and billing information" {...props}>
			<Stack gap={4}>
				<Show when={subscription}>
					{(subscription) => {
						return (
							<HStack bg={'bg.muted'} rounded={'lg'} padding={4} gap={6} border={'1px solid'} borderColor={'border'}>
								<Icon as={LuCrown} size={'2xl'} color={'yellow.500'} />
								<VStack align={'start'} flex={1} gap={0}>
									<Text fontWeight={'bold'} textTransform={'capitalize'}>
										{subscription.plan}
									</Text>
									<Text color={'GrayText'}>{subscription.status}</Text>
								</VStack>
								<Button
									size={'sm'}
									variant={'solid'}
									colorPalette={'primary'}
									loading={isCreatingCheckoutSession}
									disabled={isCreatingCheckoutSession}
									onClick={isFreePlan ? upgradeSubscription : manageSubscription}
								>
									{isFreePlan ? <LuRocket /> : <LuCrown />}
									{isFreePlan ? 'Upgrade Subscription' : 'Manage Subscription'}
								</Button>
							</HStack>
						);
					}}
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
