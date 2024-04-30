import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useStore } from '../store/useStore';

const CaptureSection = ({ navigation }) => {

	const loading = useStore((state) => state.loading);

	const project = useStore((state) => state.project);
	const stationing = useStore((state) => state.stationing);
	const createStationing = useStore((state) => state.createStationing);
	const updateStationingCode = useStore((state) => state.updateStationingCode);
	const updateStationingName = useStore((state) => state.updateStationingName);
	const updateStationingCentralReading = useStore((state) => state.updateStationingCentralReading);

	useEffect(() => {
		navigation.setOptions({ title: `${stationing.stationing_name === '' ? 'Nueva sección' : stationing.stationing_name} centro` });
	}, [stationing.stationing_name]);

	// FIXME: prevent navigation before writeStationingCenter, stationId is undefined
	const onPressLeft = () => {
		createStationing(project.id, stationing);

		// if (stationExists) {
		// 	navigation.navigate('captureSectionSides', {
		// 		_side: 'Izq',
		// 		firestorePath: `example_projects/${project.id}/stationing/${stationId}/details`,
		// 		stationingName,
		// 		centralReading: stationing.central_reading,
		// 		stationId
		// 	});
		// }
	};

	const onPressRight = () => {
		createStationing(project.id, stationing);

		// console.log('station ID: ', stationId);
		// navigation.navigate('captureSectionSides', {
		// 	_side: 'Der',
		// 	firestorePath: `example_projects/${project.id}/stationing/${stationId}/details`,
		// 	stationingName,
		// 	centralReading: stationing.central_reading,
		// 	stationId
		// });
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

		updateStationingName(formattedNumber);
	};

	// TODO: add some error indicator
	return (
		<View style={styles.container}>
			<View style={styles.main} >
				<View style={styles.form} >
					<TextInput
						mode='outlined'
						placeholder='Codigo'
						value={stationing.code ? stationing.code : ''}
						onChangeText={(code) => updateStationingCode(code.toUpperCase())}
						right={<TextInput.Icon icon='tag' />} />

					<TextInput
						mode='outlined'
						placeholder='Cadenamiento'
						keyboardType='number-pad'
						value={stationing.stationing_name}
						onChangeText={(stationing_name) => updateStationingName(stationing_name)}
						onEndEditing={() => number2stationingFormat(Number(stationing.stationing_name))}
						right={<TextInput.Icon icon='map-marker' />}
					/>

					<TextInput
						mode='outlined'
						placeholder='Lectura central'
						keyboardType='number-pad'
						inputMode='decimal'
						textAlign='left'
						value={stationing.central_reading ? stationing.central_reading.toString() : ''}
						onChangeText={(central_reading) => updateStationingCentralReading(central_reading)} />
				</View>

				<View style={styles.controls} >
					<Button icon='chevron-left' onPress={onPressLeft} uppercase mode='contained' loading={loading}>Capturar izquierda</Button>
					<Button icon='chevron-right' onPress={onPressRight} uppercase mode='contained' loading={loading}>Capturar derecha</Button>
					<Button uppercase mode='outlined' textColor='#F5F7FA' loading={loading}>Igual a la anterior</Button>
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
};

export default CaptureSection;