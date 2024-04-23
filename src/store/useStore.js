import { create } from 'zustand';
import { Timestamp, addDoc, collection, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const useStore = create((set) => ({
	projects: [],
	project: {
		id: '',
		project_name: ''
	},

	stationingFile: {
		mime_type: '',
		file_name: 'Nombre del archivo',
		uri: '',
	},

	stations: [],

	stationing: {
		id: '',
		central_reading: 0,
		code: '',
		is_complete: false,
		stationing_name: '',
	},

	// TODO: refactor methods related whit stationing or details made previously

	updateProjectName: (project_name) =>
		set((state) =>
			(
				{
					project: {
						...state.project,
						project_name: project_name
					}
				}
			)
		),

	getProjectsFromFirestore: async () => {
		// TODO: implement getProjectsFromFirestore
	},

	createProject: async (project) => {
		try {
			const newProjectDocRef = await addDoc(collection(db, 'example_projects'), {
				creation_date: Timestamp.fromMillis(Date.now()),
				name: project.project_name
			});

			project.id = newProjectDocRef.id;
			console.log('proyecto creado con el ID: ', newProjectDocRef.id);
		} catch (error) {
			console.log('error: ', error);
		}
	},

	deleteProject: async (project_id) => {
		// TODO: implement deep deleting to delete sub collections

		try {
			await deleteDoc(doc(db, 'example_projects', project_id));
			console.log(`proyecto con id ${project_id} borrado`);
		} catch (error) {
			console.log('error: ', error);
		}
	},

	updateStationingFile: (stationingFile) => 
		set(() =>
			(
				{
					stationingFile: {
						mime_type: stationingFile.mimeType,
						file_name: stationingFile.fileName,
						uri: stationingFile.uri,
					}
				}
			)
		),

	getStationingFromFile: (stations) => {
		let stationingArray = stations.split('\n');

		set(() => ({ stations: stationingArray }));
	},

	createStationing: async (stationing, currentProject) => {
		try {
			const newStationingDocRef = await addDoc(collection(db, `example_projects/${currentProject}/stationing`), {
				stationing_name: stationing.station_name,
				code: stationing.code,
				is_complete: false,
			});

			stationing.id = newStationingDocRef.id;
			console.log('estación creada con el ID: ', newStationingDocRef.id);
		} catch (error) {
			console.log('error: ', error);
		}
	}

}));