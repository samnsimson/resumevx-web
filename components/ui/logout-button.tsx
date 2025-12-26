'use client';
import { FC, useState } from 'react';
import { Button, ButtonProps, Show, Spinner } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { IconType } from 'react-icons';
import { LuLogOut } from 'react-icons/lu';
import { usePdfStore } from '@/lib/store/pdf.store';
import { useChatStore } from '@/lib/store/chat.store';
import { signOutMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useMutation } from '@tanstack/react-query';

interface LogoutButtonProps extends ButtonProps {
	label?: string;
	icon?: IconType;
	iconOnly?: boolean;
}

export const LogoutButton: FC<LogoutButtonProps> = ({ label, icon: Icon, iconOnly, ...props }) => {
	const router = useRouter();
	const { clearPdf, clearResume } = usePdfStore((state) => state);
	const { clearMessages } = useChatStore((state) => state);
	const [isLoading, setIsLoading] = useState(false);
	const { mutateAsync: signOut } = useMutation({ ...signOutMutation() });

	const onSuccess = () => {
		clearPdf();
		clearResume();
		clearMessages();
		setIsLoading(false);
		router.replace('/auth/login');
	};

	const handleLogout = async () => {
		setIsLoading(true);
		await signOut({}, { onSuccess });
	};

	return (
		<Button loading={isLoading} disabled={isLoading} onClick={handleLogout} {...props}>
			{isLoading ? <Spinner /> : Icon ? <Icon /> : <LuLogOut />}
			<Show when={!iconOnly}>{label ?? 'Logout'}</Show>
		</Button>
	);
};
