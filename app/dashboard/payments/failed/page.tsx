import { VStack } from '@chakra-ui/react';
import { Heading, Text, Progress } from '@chakra-ui/react';

export default function FailedPage({}: PageProps<'/dashboard/payments/failed'>) {
	return (
		<VStack boxSize={'full'} justify={'center'} align={'center'}>
			<Heading>Payment Failed</Heading>
			<Text>Your payment has failed</Text>
			<Progress.Root value={null} height={'100px'} maxW={'400px'}>
				<Progress.Track width={'full'} height={'3px'} mt={6}>
					<Progress.Range bg={'red.500'} />
				</Progress.Track>
			</Progress.Root>
		</VStack>
	);
}
