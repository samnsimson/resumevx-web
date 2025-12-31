'use client';
import { Center, EmptyState, Spinner } from '@chakra-ui/react';

export const LoadingPlaceholder = () => {
	return (
		<Center height={'full'} width={'full'}>
			<EmptyState.Root>
				<EmptyState.Content>
					<EmptyState.Indicator>
						<Spinner size={'xl'} />
					</EmptyState.Indicator>
					<EmptyState.Description color={'GrayText'}>Loading</EmptyState.Description>
				</EmptyState.Content>
			</EmptyState.Root>
		</Center>
	);
};
