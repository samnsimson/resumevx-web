'use client';
import { FC } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { LuRefreshCcw } from 'react-icons/lu';
import { useMutation } from '@tanstack/react-query';
import { clearSessionStateMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDocumentStore } from '@/lib/store/document.store';
import { useChatStore } from '@/lib/store/chat.store';

interface StartOverButtonProps extends ButtonProps {
	[x: string]: any;
}

export const StartOverButton: FC<StartOverButtonProps> = ({ ...props }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { clearFormData, clearResumeData } = useDocumentStore((state) => state);
	const { clearMessages } = useChatStore((state) => state);
	const { mutate: clearSessionState } = useMutation({
		...clearSessionStateMutation(),
		onMutate: () => setIsLoading(true),
		onSuccess: () => clearData(() => router.refresh()),
		onSettled: () => setIsLoading(false),
	});

	function clearData(cb: () => void = () => null) {
		clearFormData();
		clearResumeData();
		clearMessages();
		if (cb) cb();
	}

	return (
		<Button
			variant={'surface'}
			colorPalette={'blue'}
			size={'xl'}
			rounded={'full'}
			loading={isLoading}
			disabled={isLoading}
			onClick={() => clearSessionState({})}
			{...props}
		>
			<LuRefreshCcw />
			Start Over
		</Button>
	);
};
