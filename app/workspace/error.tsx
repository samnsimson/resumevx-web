'use client';
import { useEffect } from 'react';
import { Button, Heading, VStack, Stack, Text, Icon } from '@chakra-ui/react';
import { LuRefreshCcw, LuTriangleAlert } from 'react-icons/lu';

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
	useEffect(() => {
		console.error(error);
	}, [error]);

	return (
		<Stack height={'full'} width={'full'} justify={'center'} align={'center'} gap={6}>
			<VStack gap={0}>
				<Icon as={LuTriangleAlert} boxSize={'48px'} color={'red.600'} marginBottom={6} />
				<Heading>Something went wrong!</Heading>
				<Text>Please try again later</Text>
			</VStack>
			<Button variant={'solid'} colorPalette={'blue'} size={'lg'} onClick={() => reset()}>
				<LuRefreshCcw />
				Try again
			</Button>
		</Stack>
	);
}
