export class Utils {
	public static isEmail = (string: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(string);
	public static slugify = (name: string) => name.toLowerCase().replace(/ /g, '-');
	public static resumeUrl = (path: string | null) => (path ? `/doc/${path}` : null);
}
