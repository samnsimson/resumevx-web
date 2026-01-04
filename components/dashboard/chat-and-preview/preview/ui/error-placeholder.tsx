'use client';
import { Center, EmptyState, VStack } from '@chakra-ui/react';
import { LuTriangleAlert } from 'react-icons/lu';

export const ErrorPlaceholder = () => {
	return (
		<Center height={'full'} width={'full'}>
			<EmptyState.Root>
				<EmptyState.Content>
					<EmptyState.Indicator>
						<LuTriangleAlert />
					</EmptyState.Indicator>
					<VStack textAlign="center" gap={0}>
						<EmptyState.Title color={'GrayText'}>Error loading PDF</EmptyState.Title>
						<EmptyState.Description color={'GrayText'}>Please try again later</EmptyState.Description>
					</VStack>
				</EmptyState.Content>
			</EmptyState.Root>
		</Center>
	);
};
