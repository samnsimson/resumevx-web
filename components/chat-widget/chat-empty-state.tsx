import { EmptyState, List, VStack } from '@chakra-ui/react';
import { HiChatBubbleOvalLeft } from 'react-icons/hi2';

export const ChatEmptyState = () => {
	return (
		<EmptyState.Root>
			<EmptyState.Content>
				<EmptyState.Indicator>
					<HiChatBubbleOvalLeft />
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
	);
};
