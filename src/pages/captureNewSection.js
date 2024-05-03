import { StyleSheet, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useStore } from '../store/useStore';
import Topbar from '../componets/Topbar';
import { useState } from 'react';

const CaptureSection = ({ navigation }) => {

	const loading = useStore((state) => state.loading);

	const project = useStore((state) => state.project);
	const stationing = useStore((state) => state.stationing);
	const createStationing = useStore((state) => state.createStationing);
	const updateStationingCode = useStore((state) => state.updateStationingCode);
	const updateStationingName = useStore((state) => state.updateStationingName);
	const updateStationingCentralReading = useStore((state) => state.updateStationingCentralReading);
	const resetStationingStore = useStore((state) => state.resetStationingStore);

	const [errors, setErrors] = useState({});

	const validateForm = () => {
		let errors = {};

		let {
			stationing_name
		} = stationing;

		if (!stationing_name) errors.stationing_name = 'El cadenamiento es requerido';
		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const handleOnBackPress = () => {
		resetStationingStore();
		navigation.goBack();
	};

	const onPressLeft = () => {
		if (validateForm()) {
			setErrors({});
			createStationing(project.id, stationing);
			navigation.navigate('captureSectionSides', { _side: 'Izq' });
		}
	};

	const onPressRight = () => {
		if (validateForm()) {
			setErrors({});
			createStationing(project.id, stationing);
			navigation.navigate('captureSectionSides', { _side: 'Der' });
		}
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
			<Topbar title={stationing.stationing_name === '' ? 'Nueva sección centro' : `${stationing.stationing_name} centro`} hasBackAction onBack={handleOnBackPress} />
			<View style={styles.main} >
				<View style={styles.form} >
					<TextInput
						mode='outlined'
						placeholder='Codigo'
						value={stationing.code ? stationing.code : ''}
						onChangeText={(code) => updateStationingCode(code.toUpperCase())}
						right={<TextInput.Icon icon='tag' />} />

					<View>
						<TextInput
							mode='outlined'
							placeholder='Cadenamiento'
							keyboardType='number-pad'
							value={stationing.stationing_name}
							onChangeText={(stationing_name) => updateStationingName(stationing_name)}
							onEndEditing={() => number2stationingFormat(Number(stationing.stationing_name))}
							right={<TextInput.Icon icon='map-marker' />} />

						{errors.stationing_name ? <HelperText style={styles.errorText} type='error'>{errors.stationing_name}</HelperText> : null}
					</View>

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
	},
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		gap: 32,
		padding: 16
	},
	form: {
		gap: 16
	},
	controls: {
		gap: 16
	},
	errorText: {
		color: '#e54343',
	}
});

CaptureSection.propTypes = {
	navigation: PropTypes.object,
};

export default CaptureSection;