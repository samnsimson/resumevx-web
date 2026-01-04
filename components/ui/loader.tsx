import { Spinner, SpinnerProps, Stack } from '@chakra-ui/react';

interface LoaderProps extends SpinnerProps {
	[x: string]: any;
}

export function Loader({ size = 'lg', ...props }: LoaderProps) {
	return (
		<Stack justify={'center'} align={'center'} boxSize={'full'}>
			<Spinner size={size} {...props} />
		</Stack>
	);
}
