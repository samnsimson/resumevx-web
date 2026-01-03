'use client';
import { loginSchema } from '@/lib/schema/auth.schema';
import { LoginSchema } from '@/lib/types';
import { Button, Field, Input, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LuSend } from 'react-icons/lu';
import { toaster } from '../ui/toaster';
import { useMutation } from '@tanstack/react-query';
import { signInMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useRouter } from 'next/navigation';

interface LoginFormProps extends HTMLAttributes<HTMLFormElement> {
	[x: string]: unknown;
}

export const LoginForm: FC<LoginFormProps> = ({ ...props }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { mutateAsync: signIn } = useMutation({ ...signInMutation() });
	const form = useForm<LoginSchema>({ mode: 'onChange', resolver: zodResolver(loginSchema), defaultValues: { username: '', password: '' } });

	const onSubmit = async ({ username, password }: LoginSchema) => {
		try {
			setIsLoading(true);
			await signIn(
				{ body: { username, password } },
				{
					onSuccess: () => router.push('/dashboard'),
					onError: (error) => console.error(error),
				},
			);
		} catch (error: any) {
			toaster.error({ title: 'Login failed', description: error.message, closable: true });
		} finally {
			setIsLoading(false);
			form.reset();
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} {...props}>
			<Stack gap={6}>
				<Controller
					name="username"
					control={form.control}
					render={({ field }) => (
						<Field.Root required invalid={!!form.formState.errors.username}>
							<Field.Label color={'GrayText'}>Username or Email</Field.Label>
							<Input variant={'subtle'} size={'xl'} type="text" placeholder="eg:- johndoe@example.com" {...field} />
							<Field.ErrorText>{form.formState.errors.username?.message}</Field.ErrorText>
						</Field.Root>
					)}
				/>
				<Controller
					name="password"
					control={form.control}
					render={({ field }) => (
						<Field.Root required invalid={!!form.formState.errors.username}>
							<Field.Label color={'GrayText'}>Password</Field.Label>
							<Input variant={'subtle'} size={'xl'} type="password" placeholder="********" {...field} />
							<Field.ErrorText>{form.formState.errors.password?.message}</Field.ErrorText>
						</Field.Root>
					)}
				/>
				<Button type="submit" variant={'solid'} colorPalette={'blue'} width={'full'} size={'xl'} loading={isLoading} disabled={!form.formState.isValid}>
					<LuSend />
					Login
				</Button>
			</Stack>
		</form>
	);
};
