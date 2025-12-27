'use client';
import { Progress } from '@chakra-ui/react';
import { useDocumentStore } from '@/lib/store/document.store';

export const ProgressIndicator = () => {
	const { loadingState } = useDocumentStore((state) => state);

	const loadingStatusText = {
		uploading: 'Uploading your file...',
		extracting: 'Extracting information...',
		parsing: 'Parsing your file...',
		none: 'Loading...',
	};

	return (
		<Progress.Root width={'full'} value={null}>
			<Progress.Label mb="2">{loadingStatusText[loadingState]}</Progress.Label>
			<Progress.Track>
				<Progress.Range />
			</Progress.Track>
		</Progress.Root>
	);
};
