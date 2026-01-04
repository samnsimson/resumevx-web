'use client';
import { Heading, Progress, Stack, Text } from '@chakra-ui/react';
import { useDocumentStore } from '@/lib/store/document.store';

export const ProgressIndicator = () => {
	const { loadingState } = useDocumentStore((state) => state);

	const loadingStatusText = {
		uploading: 'Uploading your file...',
		saving: 'Saving job description...',
		extracting: 'Extracting information...',
		parsing: 'Parsing your file...',
		none: 'Loading...',
	};

	return (
		<Progress.Root value={null} height={'100px'}>
			<Stack align={'center'} justify={'center'} height={'full'} gap={0}>
				<Heading size={'md'} fontWeight={'bold'}>
					{loadingStatusText[loadingState]}
				</Heading>
				<Text fontSize={'sm'} color={'gray.500'}>
					Please wait. This may take a few seconds...
				</Text>
				<Progress.Track width={'full'} height={'3px'} mt={6}>
					<Progress.Range bg={'green.500'} />
				</Progress.Track>
			</Stack>
		</Progress.Root>
	);
};
