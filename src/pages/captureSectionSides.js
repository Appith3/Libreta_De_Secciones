import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { addDoc, collection, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

const CaptureSectionSides = ({ navigation, route }) => {

	const {
		_side,
		firestorePath,
		stationingName,
		centralReading
	} = route.params;

	const [side, setSide] = useState(_side);
	const [error, setError] = useState();

	const [detail, setDetail] = useState({
		distance: 0,
		detail_name: '',
		notes: '',
		reading: 0,
	});

	const createDetail = async () => {

		let slope = centralReading - Number(detail.reading)

		try {
			const newDetailDocRef = await addDoc(collection(db, `${firestorePath}/details`), {
				distance: side === 'Izq' ? Number(detail.distance) * -1 : Number(detail.distance),
				detail_name: detail.detail_name,
				notes: detail.notes,
				reading: Number(detail.reading),
				slope: slope.toFixed(2)
			});
			console.log('detalle creado con el ID: ', newDetailDocRef.id);
		} catch (error) {
			setError(error);
		}
	};

	const updateStationing = async () => {
		try {
			const stationingDocRef = doc(db, firestorePath);
			await updateDoc(stationingDocRef, {
				is_complete: true
			});
		} catch (error) {
			setError(error);
		}
	};

	useEffect(() => {
		navigation.setOptions({ title: `${stationingName} ${side}` });
	}, [side]);

	const changeSide = () => side === 'Izq' ? setSide('Der') : setSide('Izq');

	const handleOnChangeText = (key, value) => {
		setDetail({
			...detail,
			[key]: value
		});
	};

	const clearForm = () => {
		setDetail({
			distance: 0,
			detail_name: '',
			notes: '',
			reading: 0
		});
	};

	const goNextSection = () => {
		updateStationing();
		// navigation.navigate('captureCentral');
	};

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<View style={styles.form}>
					<TextInput
						mode='outlined'
						placeholder='Nombre del detalle'
						value={detail.detail_name}
						onChangeText={detail_name => handleOnChangeText('detail_name', detail_name.toUpperCase())}
						right={<TextInput.Icon icon='tag' />} />

					<TextInput
						mode='outlined'
						placeholder='Lectura'
						keyboardType='number-pad'
						inputMode='decimal'
						value={detail.reading}
						onChangeText={reading => handleOnChangeText('reading', reading)}
						right={<TextInput.Icon icon='ruler' />}
					/>

					<TextInput
						mode='outlined'
						placeholder='Distancia'
						keyboardType='number-pad'
						inputMode='decimal'
						textAlign='left'
						value={detail.distance}
						onChangeText={distance => handleOnChangeText('distance', distance)}
						right={<TextInput.Icon icon='map-marker-distance' />}
					/>
				</View>
				<View style={styles.controls}>
					<Button uppercase mode='contained' onPress={() => { createDetail(); clearForm(); }}>Siguiente detalle</Button>
					<Button uppercase mode='contained' onPress={() => changeSide()}>Terminar lado</Button>
					<Button uppercase mode='outlined' textColor='#F5F7FA' onPress={() => goNextSection()}>Siguiente sección</Button>
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

CaptureSectionSides.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
};

export default CaptureSectionSides;