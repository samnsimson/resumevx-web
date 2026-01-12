import { Heading, HeadingProps, List, ListItemProps, ListRootProps, Text, TextProps } from '@chakra-ui/react';
import { FC } from 'react';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface RenderMarkdownProps {
	content: string;
}

const MarkdownHeading: FC<HeadingProps> = ({ children, ...props }) => {
	return (
		<Heading my={2} as="h1" size="sm" {...props}>
			{children}
		</Heading>
	);
};

const MarkdownText: FC<TextProps> = ({ children, ...props }) => {
	return (
		<Text fontSize={'sm'} whiteSpace={'pre-wrap'} {...props}>
			{children}
		</Text>
	);
};

const MarkdownList: FC<ListRootProps> = ({ children, ...props }) => {
	return (
		<List.Root ps={4} spaceY={2} mb={2} {...props}>
			{children}
		</List.Root>
	);
};

const MarkdownListItem: FC<ListItemProps> = ({ children, ...props }) => {
	return (
		<List.Item fontSize={'sm'} {...props}>
			{children}
		</List.Item>
	);
};

export const RenderMarkdown: FC<RenderMarkdownProps> = ({ content }) => {
	return (
		<Markdown
			remarkPlugins={[remarkGfm]}
			components={{
				h1: ({ children }) => <MarkdownHeading>{children}</MarkdownHeading>,
				h2: ({ children }) => <MarkdownHeading>{children}</MarkdownHeading>,
				h3: ({ children }) => <MarkdownHeading>{children}</MarkdownHeading>,
				h4: ({ children }) => <MarkdownHeading>{children}</MarkdownHeading>,
				h5: ({ children }) => <MarkdownHeading>{children}</MarkdownHeading>,
				h6: ({ children }) => <MarkdownHeading>{children}</MarkdownHeading>,
				p: ({ children }) => <MarkdownText>{children}</MarkdownText>,
				ul: ({ children }) => <MarkdownList as={'ul'}>{children}</MarkdownList>,
				li: ({ children }) => <MarkdownListItem>{children}</MarkdownListItem>,
				ol: ({ children }) => <MarkdownList as={'ol'}>{children}</MarkdownList>,
			}}
		>
			{content}
		</Markdown>
	);
};
