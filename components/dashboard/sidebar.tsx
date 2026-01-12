'use client';
import Link from 'next/link';
import { Button, Icon, Stack } from '@chakra-ui/react';
import { FC, HTMLAttributes, useCallback, useMemo } from 'react';
import { HiOutlineCodeBracket, HiOutlineDocument, HiOutlineHome } from 'react-icons/hi2';
import { usePathname } from 'next/navigation';
import { IconType } from 'react-icons';

interface NavItem {
	href: string;
	label: string;
	icon: IconType;
}

const NAV_ITEMS: NavItem[] = [
	{ href: '/dashboard', label: 'Home', icon: HiOutlineHome },
	{ href: '/dashboard/templates', label: 'Resume Templates', icon: HiOutlineCodeBracket },
	{ href: '/dashboard/my-resume', label: 'My Resumes', icon: HiOutlineDocument },
];

interface WorkSpaceSidebarProps extends HTMLAttributes<HTMLDivElement> {
	[x: string]: any;
}

export const WorkSpaceSidebar: FC<WorkSpaceSidebarProps> = ({ ...props }) => {
	const pathname = usePathname();
	const otherRoutes = useMemo(() => NAV_ITEMS.filter((item) => item.href !== '/dashboard').map((item) => item.href), []);

	const isActive = useCallback(
		(path: string) => {
			if (path === '/dashboard') {
				if (pathname === '/dashboard' && !pathname.startsWith('/dashboard/')) return true;
				return !otherRoutes.some((route) => pathname.startsWith(route));
			}
			return pathname === path || pathname.startsWith(`${path}/`);
		},
		[pathname, otherRoutes],
	);

	return (
		<Stack height={'full'} width={'full'} gap={4} padding={4} {...props}>
			{NAV_ITEMS.map((item) => (
				<Button
					key={item.href}
					size={'xl'}
					width={'fit-content'}
					rounded={'full'}
					colorPalette={{ base: isActive(item.href) ? 'blue' : 'gray', _hover: 'blue' }}
					variant={{ base: isActive(item.href) ? 'surface' : 'ghost', _hover: 'solid' }}
					_hover={{ textDecoration: 'none' }}
					asChild
				>
					<Link href={item.href}>
						<Icon as={item.icon} boxSize={'24px'} />
						{item.label}
					</Link>
				</Button>
			))}
		</Stack>
	);
};
