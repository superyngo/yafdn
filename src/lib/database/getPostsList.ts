import { createPool } from '@vercel/postgres';
const db = createPool();

export async function getPostsList(categories: string | string[] | '') {
	let where = '';
	if (categories) {
		if (typeof categories === 'string') categories = [categories];
		where =
			'AND (' +
			categories.map((c, i) => (i ? 'OR ' : '') + `'${c}' = ANY(categories)`).join(' ') +
			')';
	}

	const { rows: postsList } = await db.query(
		`SELECT "slug","metadata","categories" FROM posts
		WHERE metadata->>'published' = 'true'
		${where}
		ORDER BY "createdAt" DESC`
	);

	return postsList;
}
