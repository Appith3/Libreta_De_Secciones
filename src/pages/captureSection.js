import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { doc } from 'firebase/firestore';

const CaptureSection = ({ navigation, route }) => {

	const {
		firestorePath, // example_projects/`${projectId}`/stationing/
		stationingId,
		stationingName
	} = route.params;

	const [central_reading, setCentralReading] = useState();
	const [_code, setCode] = useState();
	const [stationing_name, setStationingName] = useState(stationingName || '');

	useEffect(() => {
		navigation.setOptions({ title: `${stationing_name} centro` || 'Nueva Sección centro' });
		console.log('route: ', route.params);
	}, []);

	const onPressLeft = () => {
		navigation.navigate('captureSectionSides', { _side: 'Izq' });
	};

	const onPressRight = () => {
		navigation.navigate('captureSectionSides', { _side: 'Der' });
	};

	// formateamos el valor del cadenamiento de 0000 a 0+000.00
	// eslint-disable-next-line no-unused-vars
	const formatAlignmentName = () => { };

	// FIXME: TextInput Value is doubled during typing

	return (
		<View style={styles.container}>
			<View style={styles.main} >
				<View style={styles.form} >
					<TextInput
						mode='outlined'
						placeholder='Codigo'
						value={_code}
						onChangeText={_code => setCode(_code.toUpperCase())}
						right={<TextInput.Icon icon='tag' />} />

					<TextInput
						mode='outlined'
						placeholder='Cadenamiento'
						keyboardType='number-pad'
						inputMode='decimal'
						value={stationing_name}
						onChangeText={stationing_name => setStationingName(stationing_name)}
						right={<TextInput.Icon icon='map-marker' />}
					/>

					<TextInput
						mode='outlined'
						placeholder='Lectura central'
						keyboardType='number-pad'
						inputMode='decimal'
						textAlign='left'
						value={central_reading}
						onChangeText={central_reading => setCentralReading(central_reading)} />
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