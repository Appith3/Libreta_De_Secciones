import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use

const firebaseConfig = {
	apiKey: 'AIzaSyDRr01weX_FkMoSqf4e3F0G1wCD4viOQ2s',
	authDomain: 'libreta-topografica.firebaseapp.com',
	projectId: 'libreta-topografica',
	storageBucket: 'libreta-topografica.appspot.com',
	messagingSenderId: '480144485961',
	appId: '1:480144485961:web:a9ea58924a523917099998'
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);