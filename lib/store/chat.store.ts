'use client';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

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
					set((state) => ({
						messages: [...state.messages, { ...message, id: Math.random().toString(36).substring(2, 15), timestamp: new Date() }],
					}));
				},
			}),
			{
				name: 'chat-store',
				storage: createJSONStorage(() => localStorage),
				partialize: (state) => ({
					messages: state.messages.map((msg) => ({ ...msg, timestamp: msg.timestamp.toISOString() })),
				}),
				merge: (persistedState, currentState) => {
					const persisted = persistedState as {
						messages?: Array<Omit<ChatMessage, 'timestamp'> & { timestamp: string }>;
					};
					if (persisted?.messages) {
						return {
							...currentState,
							messages: persisted.messages.map((msg) => ({ ...msg, timestamp: new Date(msg.timestamp) })),
						};
					}
					return currentState;
				},
			},
		),
	),
);
