import { VStack } from '@chakra-ui/react';
import { Heading, Text, Progress } from '@chakra-ui/react';

export default function SuccessPage({}: PageProps<'/dashboard/payments/success'>) {
	return (
		<VStack boxSize={'full'} justify={'center'} align={'center'}>
			<Heading>Payment Successful</Heading>
			<Text>Your payment has been successful</Text>
			<Progress.Root value={null} height={'100px'} maxW={'400px'}>
				<Progress.Track width={'full'} height={'3px'} mt={6}>
					<Progress.Range bg={'green.500'} />
				</Progress.Track>
			</Progress.Root>
		</VStack>
	);
}
