import { RewriteDocumentResponse } from '@/lib/api';
import { StackProps, Text, VStack } from '@chakra-ui/react';
import { FC } from 'react';
import { ResumeSectionHeading } from './component/heading';

interface SummaryProps extends StackProps {
	resume: Omit<RewriteDocumentResponse, 'summary'>;
}

export const Summary: FC<SummaryProps> = ({ resume, ...props }) => {
	return (
		<VStack align={'start'} width={'full'} {...props}>
			<ResumeSectionHeading>Professional Summary</ResumeSectionHeading>
			<Text textAlign={'justify'} fontSize={'xs'}>
				{resume.basics.summary}
			</Text>
		</VStack>
	);
};
