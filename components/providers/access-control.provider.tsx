'use client';
import { Session, Subscription, User, UserSession } from '@/lib/api/types.gen';
import { createContext, PropsWithChildren, useContext, useMemo } from 'react';

type AccessControlContextType = {
	isFreePlan: boolean;
	user: User | null;
	session: Session | null;
	subscription: Subscription | null;
};

interface AccessControlProviderProps extends PropsWithChildren {
	session: UserSession | null;
	subscription: Subscription | null;
}

export const AccessControlContext = createContext<AccessControlContextType>({
	user: null,
	session: null,
	isFreePlan: true,
	subscription: null,
});

export const AccessControlProvider = ({ children, session, subscription }: AccessControlProviderProps) => {
	const user = useMemo(() => session?.user ?? null, [session]);
	const sessionData = useMemo(() => session?.session ?? null, [session]);
	const isFreePlan = useMemo(() => (subscription ? subscription.plan === 'free' : true), [subscription]);

	return <AccessControlContext.Provider value={{ user, session: sessionData, isFreePlan, subscription }}>{children}</AccessControlContext.Provider>;
};

export const useAccessControl = () => {
	const context = useContext(AccessControlContext);
	if (!context) throw new Error('useAccessControl must be used within a AccessControlProvider');
	return context;
};
