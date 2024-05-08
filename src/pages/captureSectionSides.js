import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, TextInput, HelperText } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useStore } from '../store/useStore';
import Topbar from '../componets/Topbar';

const CaptureSectionSides = ({ navigation, route }) => {

	const {
		_side,
	} = route.params;

	const project = useStore((state) => state.project);
	const stationing = useStore((state) => state.stationing);
	const updateStationingIsComplete = useStore((state) => state.updateStationingIsComplete);
	const updateStationingIsCompleteFromFirestore = useStore((state) => state.updateStationingIsCompleteFromFirestore);
	const detail = useStore((state) => state.detail);
	const clearDetailStore = useStore((state) => state.clearDetailStore);
	const createSectionDetail = useStore((state) => state.createSectionDetail);
	const updateDetailName = useStore((state) => state.updateDetailName);
	const updateReading = useStore((state) => state.updateReading);
	const updateDistance = useStore((state) => state.updateDistance);

	const [side, setSide] = useState(_side);
	const [errors, setErrors] = useState({});

	const validateForm = () => {
		let errors = {};

		let {
			distance,
			reading,
		} = detail;

		if (!distance) errors.distance = 'La distancia es requerida';
		if (!reading) errors.reading = 'La lectura es requerida';
		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	useEffect(() => {
		navigation.setOptions({ title: `${stationing.stationing_name} ${side}` });
	}, [side]);

	const changeSide = () => {
		let { id, central_reading } = stationing;

		if (validateForm()) {
			createSectionDetail(project.id, { id, central_reading }, detail, side);
			clearDetailStore();
			side === 'Izq' ? setSide('Der') : setSide('Izq');
		}
	};

	const handlePressNextDetails = () => {
		let { id, central_reading } = stationing;

		if (validateForm()) {
			createSectionDetail(project.id, { id, central_reading }, detail, side);
			clearDetailStore();
		}
	};

	const goNextSection = () => {

		if (validateForm) {
			updateStationingIsComplete();
			setTimeout(() => {
				updateStationingIsCompleteFromFirestore(project.id, stationing);
				navigation.navigate('projectDetail');
			}, 1000);
		}
	};

	return (
		<View style={styles.container}>
			<Topbar title={`${stationing.stationing_name} ${side}`} hasBackAction onBack={() => navigation.goBack()} />
			<View style={styles.main}>
				<View style={styles.form}>
					<TextInput
						mode='outlined'
						placeholder='Nombre del detalle'
						value={detail.detail_name}
						onChangeText={detail_name => updateDetailName(detail_name.toUpperCase())}
						right={<TextInput.Icon icon='tag' />} />

					<View>
						<TextInput
							mode='outlined'
							placeholder='Lectura'
							keyboardType='number-pad'
							inputMode='decimal'
							value={detail.reading.toString()}
							onChangeText={reading => updateReading(reading)}
							right={<TextInput.Icon icon='ruler' />}
						/>
						{errors.reading ? <HelperText style={styles.errorText} type='error'>{errors.reading}</HelperText> : null}
					</View>

					<View>
						<TextInput
							mode='outlined'
							placeholder='Distancia'
							keyboardType='number-pad'
							inputMode='decimal'
							textAlign='left'
							value={detail.distance.toString()}
							onChangeText={distance => updateDistance(distance)}
							right={<TextInput.Icon icon='map-marker-distance' />}
						/>
						{errors.distance ? <HelperText style={styles.errorText} type='error'>{errors.distance}</HelperText> : null}
					</View>
				</View>
				<View style={styles.controls}>
					<Button uppercase mode='contained' onPress={() => handlePressNextDetails()}>Siguiente detalle</Button>
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

CaptureSectionSides.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
};

export default CaptureSectionSides;