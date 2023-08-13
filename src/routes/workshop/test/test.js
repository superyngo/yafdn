import dotenv from 'dotenv';
const config = dotenv.config({ path: '../../../../.env.development.local' });

import fs from 'fs';
import parseMD from 'parse-md';

import { createPool } from '@vercel/postgres';
import { sql } from '@vercel/postgres';

const db = createPool();

async function fetchMD(slug) {
	const fileContents = fs.readFileSync(`../../../posts.md/${slug}.md`, 'utf8');
	const { metadata, content } = parseMD(fileContents);
	return { metadata, content };
}

// import markdown from '../../../posts.md/first-post.md';
var moduleData = '"# markdown"';
var b64moduleData = 'data:text/markdown;base64,' + btoa(moduleData);

async function doimport() {
	const module = await import(b64moduleData);
	console.log(module);
	// module.hello();
}

// doimport();

import memfs from 'memfs';
// Create a virtual file system
const vol = memfs.Volume.fromJSON({}, '/virtual');

// Use the virtual file system
const virtualFile = vol.createWriteStream('/virtual/file.txt', 'utf8');
virtualFile.write('Hello, virtual file!');
virtualFile.end();

// Read the virtual file
const content = vol.readFileSync('/virtual/file.txt', 'utf8');
console.log(content);
