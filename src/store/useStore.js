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
import { FIRESTORE_ROOT_COLLECTION } from '../utils/constants';

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
		notes: ''
	},

	details: [],
	detail: {
		id: '',
		distance: '',
		detail_name: '',
		reading: '',
	},

	resetLoading: () => {
		set(() => ({ isLoading: true }));
	},
	
	//* Project store methods
	resetProjectStore: () => {
		set(() => ({
			project: {
				id: '',
				project_name: ''
			}
		}));
	},
	
	updateProjectName: (project_name) =>
		set((state) => ({
			project: {
				...state.project,
				project_name: project_name
			}
		})),

	setCurrentProject: (project) => {
		set(() => ({
			project: {
				id: project.projectId,
				project_name: project.projectName
			},
			stationExists: true
		}));
	},

	createProject: async (project) => {
		try {
			const newProjectDocRef = await addDoc(collection(db, FIRESTORE_ROOT_COLLECTION), {
				creation_date: Timestamp.fromMillis(Date.now()),
				name: project.project_name
			});

			project.id = newProjectDocRef.id;
		} catch (error) {
			console.error('create project error: ', error);
		}
	},

	getProjectsFromFirestore: async () => {
		try {
			const projectsColRef = collection(db, FIRESTORE_ROOT_COLLECTION);
			const q = query(projectsColRef, orderBy('creation_date', 'desc'));
			const projectSnapshot = await getDocs(q);

			set(() => ({
				projects: projectSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})),
				isLoading: false
			}));

		} catch (error) {
			console.error('error getting projects: ', error);
			set(() => ({
				error: error,
				isLoading: false
			}));
		}
	},

	deleteProject: async (project_id) => {
		try {
			await deleteDoc(doc(db, FIRESTORE_ROOT_COLLECTION, project_id));
		} catch (error) {
			console.error('delete project error: ', error);
		}
	},

	//* Stationing store methods
	resetStationingStore: () => {
		set(() => ({
			stationing: {
				id: '',
				central_reading: '',
				code: '',
				is_complete: false,
				stationing_name: '',
			},
			details: [],
		}));
	},

	resetStationingFileStore: () => {
		set(() => ({
			stationingFile: {
				mime_type: '',
				file_name: 'Nombre del archivo',
				uri: '',
			}
		}));
	},

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
		set((state) => ({
			stationing: {
				...state.stationing,
				is_complete: true
			}
		}));
	},

	updateStationingNotes: (value) => {
		set((state) => ({
			stationing: {
				...state.stationing,
				notes: value
			}
		}));
	},

	getStationingFromFile: (stations) => {
		let stationingArray = stations.split('\n');

		set(() => ({ stations: stationingArray }));
	},

	setCurrentStation: (station) => {
		set((state) => ({
			stationing: {
				...state.station,
				id: station.stationingId,
				central_reading: station.centralReading,
				code: station.code,
				stationing_name: station.stationingName,
			},
		}));
	},

	createStationing: async (currentProject, stationing) => {
		try {
			const newStationingDocRef = await addDoc(collection(db, `${FIRESTORE_ROOT_COLLECTION}/${currentProject}/stationing`), {
				stationing_name: stationing.stationing_name,
				code: stationing.code.trim(),
				is_complete: false,
				central_reading: Number(stationing.central_reading) || '',
				notes: stationing.notes
			});

			set(() => ({
				stationing: {
					...stationing,
					id: newStationingDocRef.id
				},
			}));
		} catch (error) {
			console.error('create station error: ', error);
		}
	},

	createStationingWhitNote: async (currentProject, stationing) => {
		try {
			const newStationingDocRef = await addDoc(collection(db, `${FIRESTORE_ROOT_COLLECTION}/${currentProject}/stationing`), {
				stationing_name: stationing.stationing_name,
				code: stationing.code.trim(),
				is_complete: true,
				central_reading: Number(stationing.central_reading) || '',
				notes: stationing.notes
			});

			set(() => ({
				stationing: {
					...stationing,
					id: newStationingDocRef.id
				},
			}));
		} catch (error) {
			console.error('create station whit notes error: ', error);
		}
	},

	getStationingFromFirestore: async (currentProject) => {
		try {
			const stationingColRef = collection(db, `${FIRESTORE_ROOT_COLLECTION}/${currentProject}/stationing`);
			const q = query(stationingColRef, orderBy('stationing_name', 'asc'));
			const stationingSnapshot = await getDocs(q);

			set(() => ({
				stations: stationingSnapshot.docs.map((doc) => ({
					id: doc.id,
					...doc.data(),
				})),
				isLoading: false
			}));

		} catch (error) {
			console.error('get stationing error: ', error);
			set(() => ({
				error: error,
				isLoading: false
			}));
		}
	},

	getStationFromFirestore: async (currentProject, currentStation) => {
		try {
			const stationingDocRef = doc(db, `${FIRESTORE_ROOT_COLLECTION}/${currentProject}/stationing/${currentStation}`);
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

			}
		} catch (error) {
			console.error('get station error: ', error);
			set(() => ({ error: error }));
		}
	},

	updateStationingFromFirestore: async (currentProject, currentStation) => {
		try {
			const stationingDocRef = doc(db, `${FIRESTORE_ROOT_COLLECTION}/${currentProject}/stationing/${currentStation.id}`);

			await updateDoc(stationingDocRef, {
				stationing_name: currentStation.stationing_name,
				code: currentStation.code?.trim(),
				central_reading: Number(currentStation.central_reading)
			});

			set((state) => ({ isLoading: state.isLoading }));
		} catch (error) {
			console.error('update station error: ', error);
			set(() => ({ error: error }));
		}
	},

	updateStationingIsCompleteFromFirestore: async (currentProject, currentStation) => {
		try {
			const stationingDocRef = doc(db, `${FIRESTORE_ROOT_COLLECTION}/${currentProject}/stationing/${currentStation.id}`);

			await updateDoc(stationingDocRef, {
				is_complete: true
			});

			set((state) => ({ isLoading: state.isLoading }));
		} catch (error) {
			console.error('update station error: ', error);
			set(() => ({ error: error }));
		}
	},

	updateStationingNotesFromFirestore: async (currentProject, currentStation, notes) => {
		try {
			const stationingDocRef = doc(db, `${FIRESTORE_ROOT_COLLECTION}/${currentProject}/stationing/${currentStation.id}`);

			await updateDoc(stationingDocRef, {
				notes: notes
			});

			set((state) => ({ isLoading: state.isLoading }));
		} catch (error) {
			console.error('update station error: ', error);
			set(() => ({ error: error }));
		}
	},

	deleteStationOnFirestore: async (currentProject, stationId) => {
		try {
			await deleteDoc(doc(db, `${FIRESTORE_ROOT_COLLECTION}/${currentProject.id}/stationing`, stationId));
		} catch (error) {
			console.error('delete station error: ', error);
			set(() => ({
				error: error
			}));
		}
	},

	deleteStation: (stationId) => {
		set((state) => ({
			stations: state.stations.filter((station) => station.id !== stationId),
		}));
	},

	//* Details store methods
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

	clearDetailStore: () => {
		set(() => ({
			detail: {
				distance: '',
				detail_name: '',
				reading: ''
			}
		}));
	},

	createSectionDetail: async (currentProject, currentStation, detail, side) => {
		let slope = currentStation.central_reading - Number(detail.reading);

		try {
			await addDoc(collection(db, `${FIRESTORE_ROOT_COLLECTION}/${currentProject}/stationing/${currentStation.id}/details`), {
				distance: side === 'Izq' ? Number(detail.distance) * -1 : Number(detail.distance),
				detail_name: detail.detail_name,
				reading: Number(detail.reading),
				slope: Number(slope.toFixed(2))
			});
		} catch (error) {
			console.error('create detail error: ', error);
			set(() => ({ error: error }));
		}
	},

	getSectionDetails: async (currentProject, currentStation) => {
		try {
			const detailsColRef = collection(db, `${FIRESTORE_ROOT_COLLECTION}/${currentProject}/stationing/${currentStation}/details`);
			const q = query(detailsColRef, orderBy('distance', 'asc'));
			const detailsDocs = await getDocs(q);
	
			if (detailsDocs.empty) {
				set(() => ({
					details: [],
					isLoading: false,
				}));
				return;
			}
	
			const processedDetails = detailsDocs.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
	
			set(() => ({
				details: processedDetails,
				isLoading: false,
			}));
	
		} catch (error) {
			console.error('getSectionDetail error: ', error);
			set(() => ({
				error: error,
				isLoading: false,
			}));
		}
	}
}));