import { User } from '@repo/auth';

export class Utils {
	public static isEmail = (string: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);
	public static isUser = (user: User) => user.role === 'user';
	public static verificationPath = (data: User) => `/auth/verify-email?uid=${data.id}&email=${data.email}`;
	public static slugify = (name: string) => name.toLowerCase().replace(/ /g, '-');
	public static resumeUrl = (path: string | null) => (path ? `/doc/${path}` : null);
}
