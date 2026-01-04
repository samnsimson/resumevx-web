import { FC } from 'react';
import { ButtonProps, IconButton } from '@chakra-ui/react';
import Link from 'next/link';
import { LuDownload } from 'react-icons/lu';

interface DownloadPdfButtonProps extends ButtonProps {
	downloadUrl: string;
}

export const DownloadPdfButton: FC<DownloadPdfButtonProps> = ({ downloadUrl, ...props }) => {
	return (
		<IconButton variant={'surface'} colorPalette={'blue'} rounded={'full'} size={'lg'} {...props} asChild>
			<Link href={downloadUrl} download="resume.pdf">
				<LuDownload />
			</Link>
		</IconButton>
	);
};
