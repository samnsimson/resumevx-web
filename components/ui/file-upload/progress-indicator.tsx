import { Progress } from '@chakra-ui/react';

export const ProgressIndicator = () => {
	return (
		<Progress.Root width={'full'} value={null}>
			<Progress.Label mb="2">Uploading...</Progress.Label>
			<Progress.Track>
				<Progress.Range />
			</Progress.Track>
		</Progress.Root>
	);
};
