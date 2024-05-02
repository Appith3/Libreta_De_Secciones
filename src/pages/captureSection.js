import { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useStore } from '../store/useStore';

const CaptureSection = ({ navigation }) => {

	const loading = useStore((state) => state.loading);

	const project = useStore((state) => state.project);
	const stationing = useStore((state) => state.stationing);
	const getStationFromFirestore = useStore((state) => state.getStationFromFirestore);
	const updateStationingFromFirestore = useStore((state) => state.updateStationingFromFirestore);
	const updateStationingCentralReading = useStore((state) => state.updateStationingCentralReading);

	useEffect(() => {
		getStationFromFirestore(project.id, stationing.id,);
	}, []);

	useEffect(() => {
		navigation.setOptions({ title: `${stationing.stationing_name === '' ? 'Nueva sección' : stationing.stationing_name} centro` });
	}, [stationing.stationing_name]);

	// FIXME: prevent navigation before writeStationingCenter, stationId is undefined
	const onPressLeft = () => {
		updateStationingFromFirestore(project.id, stationing);

		navigation.navigate('captureSectionSides', { _side: 'Izq' });

	};

	const onPressRight = () => {
		updateStationingFromFirestore(project.id, stationing);

		navigation.navigate('captureSectionSides', { _side: 'Der' });
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
						disabled
						right={<TextInput.Icon icon='tag' />} />

					<TextInput
						mode='outlined'
						placeholder='Cadenamiento'
						keyboardType='number-pad'
						value={stationing.stationing_name}
						disabled
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