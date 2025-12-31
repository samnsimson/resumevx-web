'use client';
import { FC, useState } from 'react';
import { Button, ButtonProps, IconButton, Show, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';
import { LuLogOut } from 'react-icons/lu';
import { useDocumentStore } from '@/lib/store/document.store';
import { useChatStore } from '@/lib/store/chat.store';
import { useQuery } from '@tanstack/react-query';
import { signOutOptions } from '@/lib/api/@tanstack/react-query.gen';

interface LogoutButtonProps extends ButtonProps {
	label?: string;
	icon?: IconType;
	iconOnly?: boolean;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ label, icon: Icon, iconOnly, ...props }) => {
	const router = useRouter();
	const { clearFormData, clearResumeData } = useDocumentStore((state) => state);
	const { clearMessages } = useChatStore((state) => state);
	const [isLoading, setIsLoading] = useState(false);
	const { refetch: logout } = useQuery({ ...signOutOptions(), enabled: false });

	const handleLogout = async () => {
		try {
			setIsLoading(true);
			const { error } = await logout();
			if (error) throw new Error(error.message);
			clearFormData();
			clearResumeData();
			clearMessages();
			router.replace('/auth/login');
		} catch (error) {
			console.error(error);
		} finally {
			setIsLoading(false);
		}
	};

	const ButtonComponent = iconOnly ? IconButton : Button;
	return (
		<ButtonComponent loading={isLoading} disabled={isLoading} onClick={handleLogout} {...props}>
			{isLoading ? <Spinner /> : Icon ? <Icon /> : <LuLogOut />}
			<Show when={!iconOnly}>{label ?? 'Logout'}</Show>
		</ButtonComponent>
	);
};
