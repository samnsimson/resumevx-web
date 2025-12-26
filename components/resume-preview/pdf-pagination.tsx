'use client';
import { FC } from 'react';
import { ButtonGroup, IconButton, Pagination, PaginationRootProps } from '@chakra-ui/react';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';

interface PdfPaginationProps extends PaginationRootProps {
	count: number;
	pageSize: number;
	defaultPage: number;
	changepage: (page: number) => void;
	goToPage: (page: number) => void;
}

export const PdfPagination: FC<PdfPaginationProps> = ({ count, pageSize, defaultPage, changepage, goToPage, ...props }) => {
	return (
		<Pagination.Root count={count} pageSize={pageSize} defaultPage={defaultPage} {...props}>
			<ButtonGroup variant="ghost" size="sm">
				<Pagination.PrevTrigger asChild>
					<IconButton
						colorPalette={'blue'}
						variant={{ base: 'subtle', _selected: 'solid' }}
						disabled={defaultPage === 1}
						onClick={() => changepage(-1)}
					>
						<LuChevronLeft />
					</IconButton>
				</Pagination.PrevTrigger>

				<Pagination.Items
					render={(page) => (
						<IconButton colorPalette={'blue'} variant={{ base: 'surface', _selected: 'solid' }} onClick={() => goToPage(page.value)}>
							{page.value}
						</IconButton>
					)}
				/>

				<Pagination.NextTrigger asChild>
					<IconButton
						colorPalette={'blue'}
						variant={{ base: 'subtle', _selected: 'solid' }}
						disabled={defaultPage === count}
						onClick={() => changepage(1)}
					>
						<LuChevronRight />
					</IconButton>
				</Pagination.NextTrigger>
			</ButtonGroup>
		</Pagination.Root>
	);
};
