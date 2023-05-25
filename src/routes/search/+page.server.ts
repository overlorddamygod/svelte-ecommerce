import prisma from '$lib';

// disable prerender
export const prerender = false;

export const load = async ({ url }) => {
	const q = url.searchParams.get('q') || '';
	const page = parseInt(url.searchParams.get('page') ?? '1') || 1;
	const limit = parseInt(url.searchParams.get('limit') ?? '10') || 10;

	const results = await prisma.product.findMany({
		where: {
			name: {
				contains: q
				// mode: 'insensitive',
			}
		},
		skip: (page - 1) * limit,
		take: limit
	});
	// with total pages
	const total = await prisma.product.count({
		where: {
			name: {
				contains: q
				// mode: 'insensitive',
			}
		}
	});
	const totalPages = Math.ceil(total / limit);

	return {
		result: results
	};
};
