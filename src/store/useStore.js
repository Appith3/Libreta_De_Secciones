import { create } from 'zustand';

export const useStore = create((set) => ({
	projects: [], // only save id's
	project: {
		id: '',
		creation_date: null,
		project_name: ''
	},

	stations: [],

	updateProjectName: (project_name) => set((state) =>
		(
			console.log('state: ', state),
			{
				project: {
					...state.project,
					project_name: project_name
				}
			}
		)
	),

	createProject: () => set((state) => {
		console.log('project: ', state.project);

		({ projects: state.projects.push(state.project) });
	})

}));