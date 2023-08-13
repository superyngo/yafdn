import { dev } from '$app/environment';

const config = {
	title: 'YA前開筆',
	description: 'Yet Another 前端開發筆記',
	url: dev ? 'http://localhost:5173' : 'https://joyofcode.xyz'
};

export { config };
