'use client';
import { Button, Heading, Stack, Text } from '@chakra-ui/react';
import { LuRefreshCcw } from 'react-icons/lu';
import { useRouter } from 'next/navigation';

export default function ErrorPage() {
	const router = useRouter();
	return (
		<Stack height={'100vh'} width={'full'} justify={'center'} align={'center'}>
			<Heading size={'2xl'}>Something went wrong!</Heading>
			<Text color={'GrayText'}>Please try again later</Text>
			<Button variant={'solid'} colorPalette={'blue'} size={'lg'} onClick={() => router.refresh()}>
				<LuRefreshCcw />
				Try again
			</Button>
		</Stack>
	);
}
