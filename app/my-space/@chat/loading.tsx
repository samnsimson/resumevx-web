import { Center, Spinner } from '@chakra-ui/react';

export default function loading() {
	return (
		<Center height={'full'} width={'full'}>
			<Spinner size={'lg'} />
		</Center>
	);
}
