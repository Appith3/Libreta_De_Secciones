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
	updateDoc,
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

	stationing: {
		id: '',
		central_reading: '',
		code: '',
		is_complete: false,
		stationing_name: '',
	},

	details: [],
	detail: {
		id: '',
		distance: '',
		detail_name: '',
		notes: '',
		reading: '',
	},

	// TODO: refactor methods related whit stationing or details made previously

	resetProjectStore: () => {
		// TODO: reset store when go back from determined screen
	},

	resetLoading: () => {
		set(() => ({ isLoading: true }));
	},

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
			},
			stationExists: true
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
			console.log('create project error: ', error);
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
			console.log('error getting projects: ', error);
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

	resetStationingStore: () => {
		// TODO: reset store when go back from determined screen
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

	updateStationingIsComplete: () => {
		console.log('updateStationingIsComplete');
		set((state) => ({
			stationing: {
				...state.stationing,
				is_complete: true
			}
		}));
	},

	// Parses stationing data from a file and sets it in the store state.
	getStationingFromFile: (stations) => {
		let stationingArray = stations.split('\n');

		set(() => ({ stations: stationingArray }));
	},

	setCurrentStation: (station) => {
		set((state) => ({
			stationing: {
				...state.station,
				id: station.stationingId,
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
				code: stationing.code.trim(),
				is_complete: false,
				central_reading: Number(stationing.central_reading) || ''
			});

			set(() => ({
				stationing: {
					...stationing,
					id: newStationingDocRef.id
				},
			}));
			console.log('estación creada con el ID: ', newStationingDocRef.id);
		} catch (error) {
			console.log('create error: ', error);
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
			console.log('get stationing error: ', error);
			set(() => ({
				error: error,
				isLoading: false
			}));
		}
	},

	// Fetches a single stationing entry by ID from the Firestore database.
	getStationFromFirestore: async (currentProject, currentStation) => {
		try {
			const stationingDocRef = doc(db, `example_projects/${currentProject}/stationing/${currentStation}`);
			const stationingDocSnap = await getDoc(stationingDocRef);

			if (stationingDocSnap.exists()) {

				set(() => ({
					stationing: {
						id: stationingDocSnap.id,
						central_reading: stationingDocSnap.data().central_reading,
						code: stationingDocSnap.data().code,
						is_complete: stationingDocSnap.data().is_complete,
						stationing_name: stationingDocSnap.data().stationing_name,
					},
				}));

			} else {
				console.log('El documento no existe');
			}
		} catch (error) {
			console.log('get station error: ', error);
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
				stationing_name: currentStation.stationing_name,
				code: currentStation.code?.trim(),
				central_reading: Number(currentStation.central_reading)
			});

			console.log(`estación con ID ${currentStation.id} actualizada`);
			set((state) => ({ isLoading: state.isLoading }));
		} catch (error) {
			console.log('update station error: ', error);
			set(() => ({ error: error }));
		}
	},

	updateStationingIsCompleteFromFirestore: async (currentProject, currentStation) => {
		console.log('updateStationingIsCompleteFromFirestore currentStation: ', currentStation);
		try {
			const stationingDocRef = doc(db, `example_projects/${currentProject}/stationing/${currentStation.id}`);

			await updateDoc(stationingDocRef, {
				is_complete: true
			});

			console.log(`estación con ID ${currentStation.id} actualizada`);
			set((state) => ({ isLoading: state.isLoading }));
		} catch (error) {
			console.log('update station error: ', error);
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

	updateDistance: (value) => {
		set((state) => ({
			detail: {
				...state.detail,
				distance: value
			}
		}));
	},

	updateDetailName: (value) => {
		set((state) => ({
			detail: {
				...state.detail,
				detail_name: value
			}
		}));
	},

	updateReading: (value) => {
		set((state) => ({
			detail: {
				...state.detail,
				reading: value
			}
		}));
	},

	updateNotes: (value) => {
		set((state) => ({
			detail: {
				...state.detail,
				notes: value
			}
		}));
	},

	clearDetailStore: () => {
		set(() => ({
			detail: {
				distance: 0,
				detail_name: '',
				notes: '',
				reading: 0
			}
		}));
	},

	createSectionDetail: async (currentProject, currentStation, detail, side) => {
		let slope = currentStation.central_reading - Number(detail.reading);

		try {
			const newDetailDocRef = await addDoc(collection(db, `example_projects/${currentProject}/stationing/${currentStation.id}/details`), {
				distance: side === 'Izq' ? Number(detail.distance) * -1 : Number(detail.distance),
				detail_name: detail.detail_name,
				notes: detail.notes,
				reading: Number(detail.reading),
				slope: Number(slope.toFixed(2))
			});
			console.log('detalle creado con el ID: ', newDetailDocRef.id);
		} catch (error) {
			console.log('create detail error: ', error);
			set(() => ({ error: error }));
		}
	},

	getSectionDetails: async () => {},

	updateDetailsInFirestore: async () => {},

	deleteDetailFromFirestore: async () => {},

}));