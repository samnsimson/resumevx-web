'use client';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';
import { Utils } from '@/lib/utils/client.utils';

export interface ChatMessage {
	id: string;
	role: 'user' | 'assistant';
	content: string;
	timestamp: Date;
}

export interface ChatStore {
	messages: ChatMessage[];
	isSubmitting: boolean;
	addMessage: (message: Omit<ChatMessage, 'id' | 'timestamp'>) => void;
	setSubmitting: (isSubmitting: boolean) => void;
	clearMessages: () => void;
}

export const useChatStore = create<ChatStore>()(
	devtools(
		persist(
			(set) => ({
				messages: [],
				isSubmitting: false,
				setSubmitting: (isSubmitting) => set({ isSubmitting }),
				clearMessages: () => set({ messages: [] }),
				addMessage: (message) => {
					set((state) => ({ messages: [...state.messages, { ...message, id: Utils.generateId(), timestamp: new Date() }] }));
				},
			}),
			{
				name: 'chat-store',
				storage: createJSONStorage(() => sessionStorage),
				partialize: (state) => ({
					messages: state.messages.map((msg) => ({ ...msg, timestamp: msg.timestamp.toISOString() })),
				}),
				merge: (persistedState, currentState) => {
					const persisted = persistedState as { messages?: Array<Omit<ChatMessage, 'timestamp'> & { timestamp: string }> };
					if (!persisted?.messages) return currentState;
					return { ...currentState, messages: persisted.messages.map((msg) => ({ ...msg, timestamp: new Date(msg.timestamp) })) };
				},
			},
		),
	),
);
