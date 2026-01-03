import { Header } from '@/components/ui/header';
import { HStack, Spacer, Stack } from '@chakra-ui/react';
import { WorkSpaceSidebar } from '@/components/dashboard/sidebar';

export default async function DashboardLayout({ children }: LayoutProps<'/dashboard'>) {
	return (
		<Stack flex={1} height={'100vh'} gap={0} bg={'bg.panel'} divideY={'1px'} divideColor={'border'} overflow={'hidden'}>
			<Header bg={'bg.panel'} />
			<HStack width={'full'} height={'calc(100vh - 72px)'} gap={0} divideX={'1px'}>
				<Stack width={'2/12'} height={'full'}>
					<WorkSpaceSidebar />
				</Stack>
				<Spacer>{children}</Spacer>
			</HStack>
		</Stack>
	);
}
