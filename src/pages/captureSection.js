import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { db } from '../firebase/firebaseConfig';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';

const CaptureSection = ({ navigation, route }) => {

	const {
		firestorePath, // example_projects/`${projectId}`/stationing/`${stationingId}` ||  example_projects/`${projectId}`/stationing/
		stationingId,
		stationingName = 'Nueva Sección'
	} = route.params;

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [stationing, setStationing] = useState({
		central_reading: '',
		code: '',
		is_complete: false,
		stationing_name: ''
	});

	const [docExists, setDocExists] = useState(false);

	
	const getStationingDoc = async () => {
		try {
			const stationingDocRef = doc(db, firestorePath);
			const stationingDocSnap = await getDoc(stationingDocRef);
			
			if (stationingDocSnap.exists()) {
				setStationing({
					...stationingDocSnap.data()
				});
				setDocExists(true);
			} else {
				console.log('El documento no existe');
				setDocExists(false);
			}

			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	const updateStationing = async () => {
		const stationingDocRef = doc(db, firestorePath);
		await updateDoc(stationingDocRef, {
			...stationing,
			central_reading: Number(stationing.central_reading)
		});
	};

	const createStationing = async () => {
		const newStationingDocRef = await addDoc(collection(db, firestorePath), {
			...stationing,
			central_reading: Number(stationing.central_reading)
		});
		console.log('estación creada con el ID: ', newStationingDocRef.id);
	};

	const writeStationingCenter = () => {
		docExists 
			? updateStationing()
			: createStationing();
	};

	useEffect(() => {
		navigation.setOptions({ title: `${stationingName} centro`});
		getStationingDoc();
	}, []);

	const onPressLeft = () => {
		writeStationingCenter();
		// navigation.navigate('captureSectionSides', { _side: 'Izq' });
	};

	const onPressRight = () => {
		writeStationingCenter();
		// navigation.navigate('captureSectionSides', { _side: 'Der' });
	};

	const handleOnChangeText = (key, value) => {
		setStationing({
			...stationing,
			[key]: value
		});
	};

	// formateamos el valor del cadenamiento de 0 a 0+000.00
	const formatAlignmentName = (number) => {
		// FIXME: input 20.5 -> output 0+002..5
		let strNumber = number.toString();

		let millares = '0';
		let resto = '';
		let decimales = '00';
		
		if(number >= 1000) {
			millares = strNumber.slice(0,1);
			
			if (!Number.isInteger(number)) {
				decimales = strNumber.slice(-2);
				resto = strNumber.slice(1,-3);
			} else {
				resto = strNumber.slice(1);
			}
			
		} else {
			if (!Number.isInteger(number)) {
				decimales = strNumber.slice(-2);
				resto = strNumber.slice(0,-3);
			} else {
				resto = strNumber;
			}
			
			let ceros = '0'.repeat(3 - resto.length);
			resto = ceros + resto;
		}
		
		const formattedNumber = `${millares}+${resto}.${decimales}`;

		setStationing({
			...stationing,
			stationing_name: formattedNumber
		});
	};

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
						inputMode='decimal'
						value={stationing.stationing_name}
						onChangeText={(stationing_name) => handleOnChangeText('stationing_name', stationing_name.toUpperCase())}
						onEndEditing={() => formatAlignmentName(Number(stationing.stationing_name))}
						right={<TextInput.Icon icon='map-marker' />}
					/>

					<TextInput
						mode='outlined'
						placeholder='Lectura central'
						keyboardType='number-pad'
						inputMode='decimal'
						textAlign='left'
						value={stationing.central_reading}
						onChangeText={(central_reading) => handleOnChangeText('central_reading', central_reading.toUpperCase())} />
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