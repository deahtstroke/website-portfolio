const DESC_LIMIT: number = 100;

export function trimDescription(description: string): string {
	if (description.length > DESC_LIMIT) {
		let shortened: string = description.slice(0, DESC_LIMIT);
		for (let i = shortened.length - 1; i > 0; i--) {
			if (shortened.charAt(i) == " ") {
				shortened = shortened.slice(0, i).concat("...");
				break;
			}
		}
		return shortened;
	}
	return description;
}
