'use client';
import { FileUpload, HStack, Text } from '@chakra-ui/react';
import { LuFile, LuX } from 'react-icons/lu';
import { usePdfStore } from '@/lib/store/pdf.store';
import { ProgressIndicator } from './progress-indicator';

export const UploadList = () => {
	const { pdf, isUploading, clearPdf } = usePdfStore((state) => state);

	if (isUploading) return <ProgressIndicator />;
	if (!pdf) return null;

	return (
		<FileUpload.ItemGroup>
			<FileUpload.Item
				w="full"
				boxSize={'full'}
				rounded={'lg'}
				file={pdf}
				key={pdf.name}
				border={'1px solid'}
				borderColor={'green.500'}
				backgroundColor={'green.subtle'}
			>
				<HStack width={'full'} justify={'space-between'} align={'center'}>
					<HStack align={'center'}>
						<LuFile color="green" />
						<Text color={'green.fg'} fontWeight={'semibold'}>
							{pdf.name}
						</Text>
					</HStack>
					<FileUpload.ItemDeleteTrigger boxSize="4" onClick={clearPdf}>
						<LuX color="green" />
					</FileUpload.ItemDeleteTrigger>
				</HStack>
			</FileUpload.Item>
		</FileUpload.ItemGroup>
	);
};
