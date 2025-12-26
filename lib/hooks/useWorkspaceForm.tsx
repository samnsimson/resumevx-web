'use client';
import { createContext, FC, PropsWithChildren, useContext } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { WorkspaceSchema } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { workspaceSchema } from '@/lib/schema/workspace.schema';

interface WorkspaceFormContext {
	form: UseFormReturn<WorkspaceSchema> | null;
}

const workspaceFormContext = createContext<WorkspaceFormContext>({
	form: null,
});

export const WorkspaceFormProvider: FC<PropsWithChildren> = ({ children }) => {
	const form = useForm<WorkspaceSchema>({
		mode: 'onChange',
		resolver: zodResolver(workspaceSchema),
		defaultValues: { jobDescription: '', input: '' },
	});

	return <workspaceFormContext.Provider value={{ form }}>{children}</workspaceFormContext.Provider>;
};

export const useWorkspaceForm = () => {
	const context = useContext(workspaceFormContext);
	if (!context) throw new Error('useWorkspaceForm must be used within a WorkspaceFormProvider');
	return context;
};
