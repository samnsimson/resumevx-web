'use client';
import { Center, EmptyState, List, VStack } from '@chakra-ui/react';
import { HiDocument } from 'react-icons/hi2';

export const NoDataPlaceholder = () => {
	return (
		<Center height={'full'} width={'full'}>
			<EmptyState.Root>
				<EmptyState.Content>
					<EmptyState.Indicator>
						<HiDocument />
					</EmptyState.Indicator>
					<VStack textAlign="center" gap={0}>
						<EmptyState.Title color={'GrayText'}>Chat now</EmptyState.Title>
						<EmptyState.Description color={'GrayText'}>Try adjusting your search</EmptyState.Description>
					</VStack>
					<List.Root variant="marker">
						<List.Item color={'GrayText'}>Try removing filters</List.Item>
						<List.Item color={'GrayText'}>Try different keywords</List.Item>
					</List.Root>
				</EmptyState.Content>
			</EmptyState.Root>
		</Center>
	);
};
