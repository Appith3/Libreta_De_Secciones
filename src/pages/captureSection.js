import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';

const CaptureSection = ({ navigation, route }) => {

	const stationing = route.params.stationing;
	const { code, name, central_reading } = stationing;

	const [_code, setCode] = useState(code);
	const [_name, setName] = useState(name);
	const [_centralReading, setCentralReading] = useState(central_reading);

	useEffect(() => {
		navigation.setOptions({ title: `${_name} CENTRO` || 'Nueva Sección centro' });
		console.log('stationing: ', stationing);
		console.log('route: ', route);
	}, []);

	const onPressLeft = () => {
		navigation.navigate('captureSectionSides', { _side: 'Izq', stationing });
	};

	const onPressRight = () => {
		navigation.navigate('captureSectionSides', { _side: 'Der', stationing });
	};

	// formateamos el valor del cadenamiento de 0000 a 0+000.00
	// eslint-disable-next-line no-unused-vars
	const formatAlignmentName = () => {};

	return (
		<View style={styles.container}>
			<View style={styles.main} >
				<View style={styles.form} >
					<TextInput
						mode='outlined'
						placeholder='Codigo'
						value={_code}
						onChangeText={_code => setCode(_code)}
						right={<TextInput.Icon icon='tag' />} />

					<TextInput
						mode='outlined'
						placeholder='Cadenamiento'
						keyboardType='number-pad'
						inputMode='decimal'
						value={_name}
						onChangeText={_name => setName(_name)}
						right={<TextInput.Icon icon='map-marker' />}
					/>

					<TextInput
						mode='outlined'
						placeholder='Lectura central'
						keyboardType='number-pad'
						inputMode='decimal'
						textAlign='left'
						value={_centralReading}
						onChangeText={_centralReading => setCentralReading(_centralReading)} />
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