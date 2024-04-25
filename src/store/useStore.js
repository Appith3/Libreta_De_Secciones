import { create } from 'zustand';
import {
	Timestamp,
	addDoc,
	collection,
	deleteDoc,
	doc,
	getDocs,
	orderBy,
	query,
	getDoc,
	updateDoc
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

export const useStore = create((set) => ({

	isLoading: true,
	error: {},

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

	stationExists: false,

	stationing: {
		id: '',
		central_reading: '',
		code: '',
		is_complete: false,
		stationing_name: '',
	},

	// TODO: refactor methods related whit stationing or details made previously

	// Updates the project name in the store state.
	updateProjectName: (project_name) =>
		set((state) => ({
			project: {
				...state.project,
				project_name: project_name
			}
		})),

	// Sets the currently selected project in the store state.
	setCurrentProject: (project) => {
		set(() => ({
			project: {
				id: project.projectId,
				project_name: project.projectName
			}
		}));
	},

	// Creates a new project in the Firestore database.
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

	// Fetches projects from the Firestore database and sets them in the store state.
	getProjectsFromFirestore: async () => {
		try {
			const projectsColRef = collection(db, 'example_projects');
			const q = query(projectsColRef, orderBy('creation_date', 'desc'));
			const projectSnapshot = await getDocs(q);

			set(() => ({
				projects: projectSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})),
				isLoading: false
			}));

			console.log('Proyectos leídos: ', projectSnapshot.docs.length);
		} catch (error) {
			console.log('error: ', error);
			set(() => ({
				error: error,
				isLoading: false
			}));
		}
	},

	// Deletes a project from the Firestore database.
	deleteProject: async (project_id) => {
		// TODO: implement deep deleting to delete sub collections

		try {
			await deleteDoc(doc(db, 'example_projects', project_id));
			console.log(`proyecto con id ${project_id} borrado`);
		} catch (error) {
			console.log('error: ', error);
		}
	},

	// Updates the stationing file information in the store state.
	updateStationingFile: (stationingFile) =>
		set(() => ({
			stationingFile: {
				mime_type: stationingFile.mimeType,
				file_name: stationingFile.fileName,
				uri: stationingFile.uri,
			}
		})),

	updateStationingCode: (value) => {
		set((state) => ({
			stationing: {
				...state.stationing,
				code: value
			}
		}));
	},

	updateStationingName: (value) => {
		set((state) => ({
			stationing: {
				...state.stationing,
				stationing_name: value
			}
		}));
	},

	updateStationingCentralReading: (value) => {
		set((state) => ({
			stationing: {
				...state.stationing,
				central_reading: value
			}
		}));
	},

	// Parses stationing data from a file and sets it in the store state.
	getStationingFromFile: (stations) => {
		let stationingArray = stations.split('\n');

		set(() => ({ stations: stationingArray }));
	},

	setCurrentStation: (station) => {
		console.log('store station: ', station);
		set((state) => ({
			stationing: {
				...state.station,
				id: station.id,
				central_reading: station.centraReading,
				code: station.code,
				stationing_name: station.stationingName,
			},
		}));
	},

	/**
	 * Creates a new stationing entry in the Firestore database for a specific project.
	 * 
	 * @param currentProject project id 
	 * @param stationing stationing object
	 */
	createStationing: async (currentProject, stationing) => {		
		try {
			const newStationingDocRef = await addDoc(collection(db, `example_projects/${currentProject}/stationing`), {
				stationing_name: stationing.stationing_name,
				code: stationing.code,
				is_complete: false,
				central_reading: Number(stationing.central_reading)
			});

			set(() => ({
				stationing: {
					...stationing,
					id: newStationingDocRef.id
				},
				stationExists: true
			}));
			console.log('estación creada con el ID: ', newStationingDocRef.id);
		} catch (error) {
			console.log('error: ', error);
		}
	},

	// Fetches stationing data for a specific project from the Firestore database.
	getStationingFromFirestore: async (currentProject) => {
		try {
			const stationingColRef = collection(db, `example_projects/${currentProject}/stationing`);
			const q = query(stationingColRef, orderBy('stationing_name', 'asc'));
			const stationingSnapshot = await getDocs(q);

			set(() => ({
				stations: stationingSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})),
				isLoading: false
			}));

			console.log('Estaciones leídas: ', stationingSnapshot.docs.length);
		} catch (error) {
			console.log('error: ', error);
			set(() => ({
				error: error,
				isLoading: false
			}));
		}
	},

	// Fetches a single stationing entry by ID from the Firestore database.
	getStationFromFirestore: async (currentProject, currentStation) => {
		console.log('currentStation: ', currentStation);
		console.log('currentProject: ', currentProject);
		try {
			const stationingDocRef = doc(db, `example_projects/${currentProject}/stationing/${currentStation}`);
			const stationingDocSnap = await getDoc(stationingDocRef);

			if (stationingDocSnap.exists()) {

				set(() => ({
					stationing: {
						id: '',
						central_reading: stationingDocSnap.data().central_reading,
						code: stationingDocSnap.data().code,
						is_complete: stationingDocSnap.data().is_complete,
						stationing_name: stationingDocSnap.data().stationing_name,
					},
					stationExists: true
				}));

			} else {
				console.log('El documento no existe');
			}
		} catch (error) {
			console.log('error: ', error);
			set(() => ({ error: error }));
		}
	},

	/**
	 * Updates an existing stationing entry in the Firestore database.
	 * 
	 * @param currentProject project id 
	 * @param currentStation stationing object
	 */
	updateStationingFromFirestore: async (currentProject, currentStation) => {
		try {
			const stationingDocRef = doc(db, `example_projects/${currentProject}/stationing/${currentStation.id}`);

			await updateDoc(stationingDocRef, {
				...currentStation,
				central_reading: Number(currentStation.central_reading)
			});

			console.log(`estación con ID ${currentStation.id} actualizada`);
			set((state) => ({ isLoading: state.isLoading }));
		} catch (error) {
			console.log('error: ', error);
			set(() => ({ error: error }));
		}
	},

	// Deletes a stationing entry from the Firestore database.
	deleteStation: async (currentProject, stationId) => {
		try {
			await deleteDoc(doc(db, `example_projects/${currentProject}/stationing`, stationId));
			console.log('documento borrado con id: ', stationId);
		} catch (error) {
			set(() => ({
				error: error
			}));
		}
	},

}));