'use client';
import { EmptyState, Spinner, Stack } from '@chakra-ui/react';

export const LoadingPlaceholder = () => {
	return (
		<Stack boxSize={'full'} justify={'center'} align={'center'}>
			<EmptyState.Root>
				<EmptyState.Content>
					<EmptyState.Indicator>
						<Spinner size={'xl'} />
					</EmptyState.Indicator>
					<EmptyState.Description color={'GrayText'}>Loading</EmptyState.Description>
				</EmptyState.Content>
			</EmptyState.Root>
		</Stack>
	);
};
