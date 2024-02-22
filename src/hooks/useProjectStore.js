import { create } from 'zustand';
import { collection, getDocs, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const useProjectStore = create((set) => ({
	projects: [],
	roadStationing: [],
	stationDetails: [],
	// TODO: Add project, station and details objects

	// actions for projects

	/*FIXME: @firebase/firestore: Firestore (10.8.0): Could not reach Cloud Firestore backend. Connection failed 1 times. 
		
	Fix reading of firebase credentials
	*/
	getProjectsFromFirestore: async () => {
		try {
			const projectsCollection = collection(db, 'example_projects'); // Referencia a la colección de proyectos
			const snapshot = await getDocs(projectsCollection); // Obtener los proyectos

			const projects = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(), // Extraer los datos del documento
			}));

			set((state) => ({
				projects: [...state.projects, projects], // Actualizar el estado con los proyectos recuperados
			}));
		} catch (e) {
			console.error('Error al obtener proyectos de Firebase:', e);
			// Manejar el error de forma adecuada, por ejemplo, mostrando un mensaje al usuario
		}
	},

	addProject: (project) =>
		set((state) => ({
			projects: [...state.projects, project],
		})),

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

}));
