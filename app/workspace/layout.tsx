import { FC } from 'react';
import { Header } from '@/components/ui/header';
import { GridItem, HStack, SimpleGrid, Stack } from '@chakra-ui/react';
import { WorkspaceFormProvider } from '@/lib/hooks/useWorkspaceForm';
import { WorkSpaceSidebar } from '@/components/workspace-sidebar';

const WorkspaceLayout: FC<LayoutProps<'/workspace'>> = async ({ children }) => {
	return (
		<Stack height={'100vh'} width={'full'} gap={0} bg={'bg.panel'} divideY={'1px'} divideColor={'border'}>
			<Header bg={'bg.panel'} />
			<HStack flex={1} width={'full'} overflow={'hidden'}>
				<SimpleGrid columns={12} gap={0} height={'full'} width={'full'}>
					<GridItem colSpan={2} height={'full'} overflow={'hidden'} bg={'bg.panel'}>
						<WorkSpaceSidebar />
					</GridItem>
					<GridItem colSpan={10} paddingX={6} paddingY={4} height={'full'} overflow={'scroll'} bgColor={'bg.muted'}>
						<WorkspaceFormProvider>{children}</WorkspaceFormProvider>
					</GridItem>
				</SimpleGrid>
			</HStack>
		</Stack>
	);
};
export default WorkspaceLayout;
