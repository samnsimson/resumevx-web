'use client';
import { FC } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { HiArrowRight } from 'react-icons/hi2';
import { useWorkspaceForm } from '@/lib/hooks/useWorkspaceForm';
import { useDocumentStore } from '@/lib/store/document.store';
import { useRouter } from 'next/navigation';

interface ContinueButtonProps extends ButtonProps {
	[x: string]: any;
}

export const ContinueButton: FC<ContinueButtonProps> = ({ ...props }) => {
	const router = useRouter();
	const { form } = useWorkspaceForm();
	const { fileData } = useDocumentStore((state) => state);
	if (!form || !fileData) return null;

	const handleContinue = () => {
		if (!form.getValues('jobDescription') || !fileData.file) return;
		router.push('/workspace/assistant');
	};

	return (
		<Button
			variant={'solid'}
			colorPalette={'blue'}
			size={'xl'}
			rounded={'full'}
			disabled={!form.getValues('jobDescription') || !fileData.file}
			onClick={handleContinue}
			{...props}
		>
			Save and Continue
			<HiArrowRight />
		</Button>
	);
};
