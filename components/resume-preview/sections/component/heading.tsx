import { Heading, HeadingProps } from '@chakra-ui/react';
import { FC } from 'react';

interface ResumeSectionHeadingProps extends HeadingProps {
	[x: string]: any;
}

export const ResumeSectionHeading: FC<ResumeSectionHeadingProps> = ({ children, ...props }) => {
	return (
		<Heading
			color={'GrayText'}
			size={'sm'}
			fontWeight={'bold'}
			textTransform={'uppercase'}
			borderTop={'1px solid'}
			borderBottom={'1px solid'}
			borderColor={'border.emphasized'}
			width={'full'}
			{...props}
		>
			{children}
		</Heading>
	);
};
