'use client';
import { FC, Fragment, useState } from 'react';
import { Button, ButtonProps, Dialog, Field, Heading, IconButton, Input, VStack } from '@chakra-ui/react';
import { LuDownload } from 'react-icons/lu';
import { Utils } from '@/lib/utils/client.utils';

interface DownloadPdfButtonProps extends ButtonProps {
	downloadUrl: string;
}

export const DownloadPdfButton: FC<DownloadPdfButtonProps> = ({ downloadUrl, ...props }) => {
	const [openDialog, setOpenDialog] = useState(false);
	const [documentName, setdocumentName] = useState(`my-resume-${Utils.dateId()}`);

	const handleDownload = () => {
		const link = document.createElement('a');
		link.href = downloadUrl;
		link.download = `${documentName}.pdf`;
		link.click();
		setOpenDialog(false);
	};

	return (
		<Fragment>
			<IconButton variant={'surface'} colorPalette={'blue'} rounded={'full'} size={'lg'} {...props} onClick={() => setOpenDialog(true)}>
				<LuDownload />
			</IconButton>
			<Dialog.Root open={openDialog} onOpenChange={(state) => setOpenDialog(state.open)} placement={'center'} size={'xs'}>
				<Dialog.Backdrop />
				<Dialog.Positioner>
					<Dialog.Content>
						<Dialog.CloseTrigger />
						<Dialog.Body padding={'6'}>
							<VStack gap={'6'} asChild>
								<form onSubmit={handleDownload}>
									<Heading size={'xl'}>Download your resume</Heading>
									<Field.Root>
										<Field.Label color={'GrayText'}>Enter the name for the resume</Field.Label>
										<Input
											variant={'subtle'}
											size={'xl'}
											type="text"
											value={documentName}
											onChange={(e) => setdocumentName(e.target.value)}
										/>
									</Field.Root>
									<Button variant={'solid'} colorPalette={'blue'} size={'xl'} rounded={'full'} type="submit" disabled={!documentName}>
										<LuDownload />
										Download
									</Button>
								</form>
							</VStack>
						</Dialog.Body>
					</Dialog.Content>
				</Dialog.Positioner>
			</Dialog.Root>
		</Fragment>
	);
};
