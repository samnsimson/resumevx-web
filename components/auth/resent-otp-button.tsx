'use client';
import { AuthApi } from '@/lib/api';
import { Button, ButtonProps } from '@chakra-ui/react';
import { FC, useState, useEffect } from 'react';
import { toaster } from '../ui/toaster';

interface ResendOtpButtonProps extends ButtonProps {
	[x: string]: any;
}

export const ResendOtpButton: FC<ResendOtpButtonProps> = ({ ...props }) => {
	const [isLoading, setIsLoading] = useState(false);
	const [cooldown, setCooldown] = useState(0);

	useEffect(() => {
		if (cooldown > 0) {
			const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
			return () => clearTimeout(timer);
		}
	}, [cooldown]);

	const resendOtp = async () => {
		try {
			setIsLoading(true);
			const { error } = await AuthApi.sendVerificationOtp();
			if (error as any) throw new Error((error as any).detail || 'Failed to resend OTP');
			toaster.success({ title: 'OTP resent successfully', description: 'You will receive a new OTP in your email', closable: true });
			setCooldown(30);
		} catch (error: any) {
			console.error(error);
			toaster.error({ title: 'Resend OTP failed', description: error.detail, closable: true });
		} finally {
			setIsLoading(false);
		}
	};

	const isDisabled = isLoading || cooldown > 0;
	const buttonText = cooldown > 0 ? `Resend OTP in (${cooldown}s)` : 'Resend OTP';

	return (
		<Button variant={'plain'} size={'sm'} loading={isLoading} disabled={isDisabled} onClick={resendOtp} {...props}>
			{buttonText}
		</Button>
	);
};
