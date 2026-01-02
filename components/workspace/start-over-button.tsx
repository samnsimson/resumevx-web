'use client';
import { FC } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { LuRefreshCcw } from 'react-icons/lu';
import { useMutation } from '@tanstack/react-query';
import { clearSessionStateMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface StartOverButtonProps extends ButtonProps {
	[x: string]: any;
}

export const StartOverButton: FC<StartOverButtonProps> = ({ ...props }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { mutateAsync: clearSessionState } = useMutation({ ...clearSessionStateMutation() });

	const handleStartOver = async () => {
		try {
			setIsLoading(true);
			const result = await clearSessionState({});
			if (result) router.refresh();
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<Button
			variant={'surface'}
			colorPalette={'blue'}
			size={'xl'}
			rounded={'full'}
			loading={isLoading}
			disabled={isLoading}
			onClick={handleStartOver}
			{...props}
		>
			<LuRefreshCcw />
			Start Over
		</Button>
	);
};
