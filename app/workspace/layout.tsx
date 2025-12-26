import { FC } from 'react';
import { Header } from '@/components/ui/header';
import { GridItem, HStack, SimpleGrid, Stack } from '@chakra-ui/react';
import { WorkspaceFormProvider } from '@/lib/hooks/useWorkspaceForm';

const WorkspaceLayout: FC<LayoutProps<'/workspace'>> = async ({ children }) => {
	return (
		<Stack height={'100vh'} width={'full'} divideY={'1px'} divideColor={'divider'} gap={0} bg={'bg.panel'}>
			<Header />
			<HStack flex={1} width={'full'} overflow={'hidden'}>
				<SimpleGrid columns={24} gap={0} divideX={'1px'} divideColor={'divider'} height={'full'} width={'full'}>
					<GridItem colSpan={1} height={'full'} overflow={'hidden'}></GridItem>
					<GridItem colSpan={23} paddingX={4} height={'full'} overflow={'hidden'}>
						<WorkspaceFormProvider>{children}</WorkspaceFormProvider>
					</GridItem>
				</SimpleGrid>
			</HStack>
		</Stack>
	);
};
export default WorkspaceLayout;
