import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const CaptureSection = ({ navigation, route }) => {

	const {
		firestorePath,
		stationingId,
		projectId,
		stationingName = 'Nueva Sección'
	} = route.params;

	// eslint-disable-next-line no-unused-vars
	const [error, setError] = useState();
	const [stationing, setStationing] = useState({
		central_reading: '',
		code: '',
		is_complete: false,
		stationing_name: ''
	});

	const [docExists, setDocExists] = useState(false);
	const [stationId, setStationId] = useState(stationingId);

	const getStationingDoc = async () => {
		try {
			const stationingDocRef = doc(db, `${firestorePath}/${stationId}`);
			const stationingDocSnap = await getDoc(stationingDocRef);

			if (stationingDocSnap.exists()) {
				setStationing({
					central_reading: stationingDocSnap.data().central_reading,
					code: stationingDocSnap.data().code,
					is_complete: stationingDocSnap.data().is_complete,
					stationing_name: stationingDocSnap.data().stationing_name
				});
				setDocExists(true);
			} else {
				console.log('El documento no existe');
				setDocExists(false);
			}
		} catch (error) {
			console.log('error: ', error);
			setError(error);
		}
	};

	const updateStationing = async () => {
		try {
			const stationingDocRef = doc(db, `${firestorePath}/${stationId}`);
			await updateDoc(stationingDocRef, {
				...stationing,
				central_reading: Number(stationing.central_reading)
			});
			console.log(`estación con ID ${stationId} actualizada`);
		} catch (error) {
			console.log('error: ', error);
			setError(error);
		}
	};

	const createStationing = async () => {
		try {
			const newStationingDocRef = await addDoc(collection(db, firestorePath), {
				...stationing,
				central_reading: Number(stationing.central_reading)
			});
			setStationId(newStationingDocRef.id);
			console.log('estación creada con el ID: ', newStationingDocRef.id);
		} catch (error) {
			console.log('error: ', error);
			setError(error);
		}
	};

	const writeStationingCenter = () => {
		docExists
			? updateStationing()
			: createStationing();
	};

	useEffect(() => {
		getStationingDoc();
		navigation.setOptions({ title: `${stationingName} centro` });
		console.log('route: ', route.params);
	}, []);

	const onPressLeft = () => {
		writeStationingCenter();
		console.log('station ID: ', stationId);
		navigation.navigate('captureSectionSides', {
			_side: 'Izq',
			firestorePath: `example_projects/${projectId}/stationing/${stationId}/details`,
			stationingName,
			centralReading: stationing.central_reading,
			stationId
		});
	};

	const onPressRight = () => {
		writeStationingCenter();
		console.log('station ID: ', stationId);
		navigation.navigate('captureSectionSides', {
			_side: 'Der',
			firestorePath: `example_projects/${projectId}/stationing/${stationId}/details`,
			stationingName,
			centralReading: stationing.central_reading,
			stationId
		});
	};

	const handleOnChangeText = (key, value) => {
		setStationing({
			...stationing,
			[key]: value
		});
	};

	// formateamos el valor del cadenamiento de 0 a 0+000.00
	const number2stationingFormat = (number) => {
		const strNumber = number.toString();
		let thousands = '0';
		let integers = '';
		let decimals = '00';

		if (number >= 10000) {
			[thousands, integers, decimals] = strNumber.includes('.')
				? [strNumber.slice(0, 2), strNumber.slice(2).split('.')[0], strNumber.split('.')[1] || '00']
				: [strNumber.slice(0, 2), strNumber.slice(2), '00'];
		} else if (number >= 1000) {
			[thousands, integers, decimals] = strNumber.includes('.')
				? [strNumber[0], strNumber.slice(1).split('.')[0], strNumber.split('.')[1] || '00']
				: [strNumber[0], strNumber.slice(1), '00'];
		} else {
			[integers, decimals] = strNumber.includes('.')
				? strNumber.split('.')
				: [strNumber, '00'];
			integers = integers.padStart(3, '0');
		}

		const formattedNumber = `${thousands}+${integers}.${decimals}`;

		setStationing({
			...stationing,
			stationing_name: formattedNumber
		});
	};

	// TODO: add some error indicator
	// FIXME: central_reading isn't rendered on TexTInput 
	return (
		<View style={styles.container}>
			<View style={styles.main} >
				<View style={styles.form} >
					<TextInput
						mode='outlined'
						placeholder='Codigo'
						value={stationing.code}
						onChangeText={(code) => handleOnChangeText('code', code.toUpperCase())}
						right={<TextInput.Icon icon='tag' />} />

					<TextInput
						mode='outlined'
						placeholder='Cadenamiento'
						keyboardType='number-pad'
						value={stationing.stationing_name}
						onChangeText={(stationing_name) => handleOnChangeText('stationing_name', stationing_name)}
						onEndEditing={() => number2stationingFormat(Number(stationing.stationing_name))}
						right={<TextInput.Icon icon='map-marker' />}
					/>

					<TextInput
						mode='outlined'
						placeholder='Lectura central'
						keyboardType='number-pad'
						inputMode='decimal'
						textAlign='left'
						value={stationing.central_reading}
						onChangeText={(central_reading) => handleOnChangeText('central_reading', central_reading)} />
				</View>

				<View style={styles.controls} >
					<Button icon='chevron-left' onPress={onPressLeft} uppercase mode='contained' >Capturar izquierda</Button>
					<Button icon='chevron-right' onPress={onPressRight} uppercase mode='contained' >Capturar derecha</Button>
					<Button uppercase mode='outlined' textColor='#F5F7FA' >Igual a la anterior</Button>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1e2833',
		padding: 16
	},
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 32
	},
	form: {
		gap: 16
	},
	controls: {
		gap: 16
	}
});

CaptureSection.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
};

export default CaptureSection;