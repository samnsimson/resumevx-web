'use client';
import { FC } from 'react';
import { LuFile, LuX } from 'react-icons/lu';
import { useFileUploadContext, FileUpload, For, FileUploadItemProps, Text, HStack, Icon, IconButton } from '@chakra-ui/react';
import { ProgressIndicator } from '@/components/file-upload/progress-indicator';
import { useDocumentStore } from '@/lib/store/document.store';

interface UploadListProps extends Omit<FileUploadItemProps, 'file'> {
	isLoading?: boolean;
}

export const UploadList: FC<UploadListProps> = ({ isLoading, ...props }) => {
	const fileUpload = useFileUploadContext();
	const { clearFileData } = useDocumentStore((state) => state);
	const files = fileUpload.acceptedFiles;
	if (files.length === 0) return null;
	if (isLoading) return <ProgressIndicator />;

	const removeFile = (file: File) => {
		fileUpload.deleteFile(file);
		clearFileData();
	};

	return (
		<FileUpload.ItemGroup>
			<For each={files}>
				{(file) => (
					<FileUpload.Item width="full" p="4" file={file} key={file.name} layerStyle="fill.surface" colorPalette={'green'} asChild {...props}>
						<HStack width={'full'} align={'center'} justify={'space-between'} gap={3}>
							<HStack width={'full'} align={'center'} gap={3}>
								<Icon as={LuFile} />
								<Text fontSize={'sm'} fontWeight={'bold'}>
									{file.name}
								</Text>
							</HStack>
							<IconButton size={'xs'} variant={'ghost'} colorPalette={'green'} rounded={'full'} onClick={() => removeFile(file)}>
								<Icon as={LuX} />
							</IconButton>
						</HStack>
					</FileUpload.Item>
				)}
			</For>
		</FileUpload.ItemGroup>
	);
};
