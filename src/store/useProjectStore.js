import create from 'zustand';

// Definimos el estado inicial
const initialState = {
	projects: [],
};

const actions = (set) => ({
	setProjects: (projects) => set({ projects }),

	addProject: (project) => set((state) => ({ projects: [...state.projects, project] })),

	updateProject: (projectId, updatedProject) =>
		set((state) => ({
			projects: state.projects.map((project) =>
				project._id === projectId ? { ...project, ...updatedProject } : project
			),
		})),
});

const useProjectStore = create((set) => ({
	...initialState,
	...actions(set),
}));

export default useProjectStore;
