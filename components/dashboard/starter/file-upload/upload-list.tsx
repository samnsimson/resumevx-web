'use client';
import { FC } from 'react';
import { LuFile, LuX } from 'react-icons/lu';
import { useFileUploadContext, FileUpload, For, FileUploadItemProps, Text, HStack, Icon, IconButton } from '@chakra-ui/react';
import { useDocumentStore } from '@/lib/store/document.store';

interface UploadListProps extends Omit<FileUploadItemProps, 'file'> {
	isLoading?: boolean;
}

export const UploadList: FC<UploadListProps> = ({ ...props }) => {
	const fileUpload = useFileUploadContext();
	const { clearFormData } = useDocumentStore((state) => state);
	const files = fileUpload.acceptedFiles;
	if (files.length === 0) return null;

	const removeFile = (file: File) => {
		fileUpload.deleteFile(file);
		clearFormData();
	};

	return (
		<FileUpload.ItemGroup>
			<For each={files}>
				{(file) => (
					<FileUpload.Item
						width="full"
						p="2"
						file={file}
						key={file.name}
						rounded={'lg'}
						layerStyle="fill.surface"
						colorPalette={'primary'}
						border={'none'}
						asChild
						{...props}
					>
						<HStack width={'full'} align={'center'} justify={'space-between'} gap={3}>
							<HStack width={'full'} align={'center'} gap={3}>
								<Icon as={LuFile} />
								<Text fontSize={'sm'} fontWeight={'semibold'}>
									{file.name}
								</Text>
							</HStack>
							<IconButton size={'xs'} variant={'ghost'} colorPalette={'primary'} rounded={'full'} onClick={() => removeFile(file)}>
								<Icon as={LuX} />
							</IconButton>
						</HStack>
					</FileUpload.Item>
				)}
			</For>
		</FileUpload.ItemGroup>
	);
};
