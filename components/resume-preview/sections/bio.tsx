import { RewriteDocumentResponse } from '@/lib/api';
import { Heading, HStack, StackProps, Text, VStack } from '@chakra-ui/react';
import Link from 'next/link';
import { FC } from 'react';

interface BioProps extends StackProps {
	resume: Omit<RewriteDocumentResponse, 'summary'>;
}

export const Bio: FC<BioProps> = ({ resume, ...props }) => {
	return (
		<VStack align={'center'} gap={0} {...props}>
			<Heading size={'xl'}>{resume.basics.name}</Heading>
			<HStack>
				<Text color={'LinkText'} asChild>
					<Link href={`mailto:${resume.basics.email}`}>{resume.basics.email}</Link>
				</Text>
				<Text color={'LinkText'} asChild>
					<Link href={`tel:${resume.basics.phone}`}>{resume.basics.phone}</Link>
				</Text>
			</HStack>
			<Text color={'GrayText'}>{resume.basics.location}</Text>
		</VStack>
	);
};
