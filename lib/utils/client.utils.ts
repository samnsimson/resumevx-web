export class Utils {
	public static isEmail = (string: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);
	public static slugify = (name: string) => name.toLowerCase().replace(/ /g, '-');
	public static resumeUrl = (path: string | null) => (path ? `/doc/${path}` : null);
	public static generateId = () => Math.random().toString(36).substring(2, 15);
	public static dateId = () => new Date().getTime().toString();
}
