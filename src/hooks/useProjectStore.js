import { create } from 'zustand';
import { collection, getDocs, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const useProjectStore = create((set) => ({
	projects: [],
	roadStationing: [],
	stationDetails: [],
	project: {
		projectId: '', 
		projectName: '',
		creationDate: {}
	},
	// TODO: Add project, station and details objects

	// actions for projects
	getAllProjectsFromFirestore: async () => {
		try {
			const projectsCollection = collection(db, 'example_projects'); 
			const snapshot = await getDocs(projectsCollection); 
			const projects = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(), 
			}));

			set(() => ({
				projects: projects, 
			}));
		} catch (e) {
			console.error('Error al obtener proyectos de la base de datos:', e);
			
		}
	},

	addProject: async (project) => {
		try {
			

			set((state) => ({
				projects: [...state.projects, project],
			}));
		} catch (e) {
			console.error('Error al crear el proyecto en la base de datos:', e);
		}
	},

	removeProject: (projectId) =>
		set((state) => ({
			projects: state.projects.filter(
				(project) => project.projectId !== projectId,
			),
		})),

	// actions for stationing
	addStationing: (stationing) =>
		set((state) => ({
			roadStationing: [...state.roadStationing, stationing],
		})),

	removeStationing: (stationingId) =>
		set((state) => ({
			roadStationing: state.roadStationing.filter(
				(stationing) => stationing.stationingId !== stationingId,
			),
		})),

	// 

}));
