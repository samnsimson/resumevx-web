import { FC } from 'react';
import { Header } from '@/components/ui/header';
import { GridItem, SimpleGrid, Stack } from '@chakra-ui/react';
import { WorkspaceFormProvider } from '@/lib/hooks/useWorkspaceForm';
import { WorkSpaceSidebar } from '@/components/workspace-sidebar';

const WorkspaceLayout: FC<LayoutProps<'/workspace'>> = async ({ children }) => {
	return (
		<Stack height={'100vh'} gap={0} bg={'bg.panel'} divideY={'1px'} divideColor={'border'} overflow={'hidden'}>
			<Header bg={'bg.panel'} />
			<SimpleGrid columns={12} gap={0} flex={1} minHeight={0} divideX={'1px'} divideColor={'border'}>
				<GridItem colSpan={2} flex={1} minHeight={0} bg={'bg.panel'}>
					<WorkSpaceSidebar />
				</GridItem>
				<GridItem colSpan={10} flex={1} minHeight={0} bgColor={'bg.muted'}>
					<WorkspaceFormProvider>{children}</WorkspaceFormProvider>
				</GridItem>
			</SimpleGrid>
		</Stack>
	);
};
export default WorkspaceLayout;
