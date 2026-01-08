import { Spinner, Stack } from '@chakra-ui/react';

export default function loading() {
	return (
		<Stack boxSize={'full'} justify={'center'} align={'center'}>
			<Spinner size={'lg'} />
		</Stack>
	);
}
