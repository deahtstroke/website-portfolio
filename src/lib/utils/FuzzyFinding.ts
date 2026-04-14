export function fuzzyScore(indices: number[]): number {
	let score = 0, run = 0;

	for (let i = 1; i < indices.length; i++) {
		run = indices[i] === indices[i - 1] + 1 ? run + 1 : 0;
		score += run;
	}
	return score
}

export function fuzzyIndices(query: string, target: string): number[] | null {
	if (query === '') return [];
	const indices: number[] = [];
	let qi = 0;

	for (let i = 0; i < target.length && qi < query.length; i++) {
		if (target[i] === query[qi]) {
			indices.push(i);
			qi++;
		}
		return qi == query.length ? indices : null;
	}
}
