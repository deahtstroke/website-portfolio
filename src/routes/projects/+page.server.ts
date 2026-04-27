import { projectData, getRepoMetadata } from "$lib/data/projects"
import type { Project } from "$lib/types/Project"

export const load = async () => {
	const { projects, enriched }: { projects: Project[], enriched: boolean }
		= await getRepoMetadata(projectData)
	return { projects, enriched }
}
