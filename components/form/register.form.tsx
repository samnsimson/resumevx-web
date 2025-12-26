'use client';
import { registerSchema } from '@/lib/schema/auth.schema';
import { RegisterSchema } from '@/lib/types';
import { Button, Field, Input, SimpleGrid, Stack } from '@chakra-ui/react';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, HTMLAttributes, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LuUserPlus } from 'react-icons/lu';
import { toaster } from '../ui/toaster';
import { signUpMutation } from '@/lib/api/@tanstack/react-query.gen';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

interface RegisterFormProps extends HTMLAttributes<HTMLFormElement> {
	[x: string]: unknown;
}

export const RegisterForm: FC<RegisterFormProps> = ({ ...props }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const { mutateAsync: signUp } = useMutation({ ...signUpMutation() });
	const defaultValues: RegisterSchema = { name: '', username: '', email: '', password: '' };
	const form = useForm<RegisterSchema>({ mode: 'onChange', resolver: zodResolver(registerSchema), defaultValues });

	const onSubmit = async ({ name, username, email, password }: RegisterSchema) => {
		try {
			setIsLoading(true);
			await signUp(
				{ body: { name, username, email, password } },
				{ onSuccess: () => router.push('/workspace'), onError: (error) => console.error(error) },
			);
		} catch (error: any) {
			toaster.error({ title: 'Registeration failed', description: error.message });
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<form onSubmit={form.handleSubmit(onSubmit)} {...props}>
			<Stack gap={6}>
				<SimpleGrid columns={2} gap={4}>
					<Controller
						name="name"
						control={form.control}
						render={({ field }) => (
							<Field.Root required invalid={!!form.formState.errors.name}>
								<Field.Label color={'GrayText'}>Name</Field.Label>
								<Input variant={'subtle'} size={'xl'} type="text" placeholder="eg:- John Doe" {...field} />
								<Field.ErrorText>{form.formState.errors.name?.message}</Field.ErrorText>
							</Field.Root>
						)}
					/>
					<Controller
						name="username"
						control={form.control}
						render={({ field }) => (
							<Field.Root required invalid={!!form.formState.errors.username}>
								<Field.Label color={'GrayText'}>Username</Field.Label>
								<Input variant={'subtle'} size={'xl'} type="text" placeholder="eg:- johndoe" {...field} />
								<Field.ErrorText>{form.formState.errors.username?.message}</Field.ErrorText>
							</Field.Root>
						)}
					/>
				</SimpleGrid>
				<Controller
					name="email"
					control={form.control}
					render={({ field }) => (
						<Field.Root required invalid={!!form.formState.errors.email}>
							<Field.Label color={'GrayText'}>Email</Field.Label>
							<Input variant={'subtle'} size={'xl'} type="text" placeholder="eg:- johndoe@exeample.com" {...field} />
							<Field.ErrorText>{form.formState.errors.email?.message}</Field.ErrorText>
						</Field.Root>
					)}
				/>
				<Controller
					name="password"
					control={form.control}
					render={({ field }) => (
						<Field.Root required invalid={!!form.formState.errors.password}>
							<Field.Label color={'GrayText'}>Password</Field.Label>
							<Input variant={'subtle'} size={'xl'} type="password" placeholder="********" {...field} />
							<Field.ErrorText>{form.formState.errors.password?.message}</Field.ErrorText>
						</Field.Root>
					)}
				/>
				<Button type="submit" variant={'solid'} colorPalette={'blue'} width={'full'} size={'xl'} loading={isLoading} disabled={!form.formState.isValid}>
					<LuUserPlus />
					Register
				</Button>
			</Stack>
		</form>
	);
};
