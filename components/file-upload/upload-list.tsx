'use client';
import { Box, HStack, IconButton, Text, Icon } from '@chakra-ui/react';
import { LuFile, LuX } from 'react-icons/lu';
import { useDocumentStore } from '@/lib/store/document.store';
import { ProgressIndicator } from './progress-indicator';

export const UploadList = () => {
	const { fileData, isLoading, clearFileData } = useDocumentStore((state) => state);

	if (isLoading) return <ProgressIndicator />;
	if (!fileData) return null;

	return (
		<Box
			w="full"
			boxSize={'full'}
			rounded={'lg'}
			key={fileData.file?.name}
			border={'1px solid'}
			borderColor={'green.500'}
			backgroundColor={'green.subtle'}
			padding={2}
		>
			<HStack width={'full'} justify={'space-between'} align={'center'}>
				<HStack align={'center'}>
					<LuFile color="green" />
					<Text color={'green.fg'} fontWeight={'semibold'}>
						{fileData.file?.name}
					</Text>
				</HStack>
				<IconButton size="sm" colorPalette="green" variant="ghost" rounded="full" onClick={clearFileData}>
					<Icon as={LuX} />
				</IconButton>
			</HStack>
		</Box>
	);
};
