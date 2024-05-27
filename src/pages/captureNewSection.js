import { StyleSheet, View } from 'react-native';
import { Button, TextInput, HelperText, Modal, Portal, Text, Checkbox } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useStore } from '../store/useStore';
import Topbar from '../componets/Topbar';
import { useState } from 'react';

const CaptureSection = ({ navigation }) => {

	const loading = useStore((state) => state.loading);

	const project = useStore((state) => state.project);
	const stationing = useStore((state) => state.stationing);
	const createStationing = useStore((state) => state.createStationing);
	const createStationingWhitNote = useStore((state) => state.createStationingWhitNote);
	const updateStationingCode = useStore((state) => state.updateStationingCode);
	const updateStationingName = useStore((state) => state.updateStationingName);
	const updateStationingCentralReading = useStore((state) => state.updateStationingCentralReading);
	const updateStationingNotes = useStore((state) => state.updateStationingNotes);
	const updateStationingIsComplete = useStore((state) => state.updateStationingIsComplete);
	const resetStationingStore = useStore((state) => state.resetStationingStore);

	const [errors, setErrors] = useState({});
	const [visible, setVisible] = useState(false);
	const [leftChecked, setLeftChecked] = useState(false);
	const [rightChecked, setRightChecked] = useState(false);
	const [hasNotes, setHasNotes] = useState(false);
	const [note, setNote] = useState('');

	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

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

	const handlePressFinishSection = () => {
		if (validateForm) {
			updateStationingIsComplete();
			setTimeout(() => {
				createStationingWhitNote(project.id, stationing);
				navigation.navigate('projectDetail');
			}, 1000);
		}
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

	const saveNotes = (note) => {
		let notes = [];

		if (leftChecked) notes.push('Izquierda igual');
		if (rightChecked) notes.push('Derecha igual');
		if (note) notes.push(note);

		console.log('notes: ', notes.toString());

		updateStationingNotes(notes);
		hideModal();
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

	// TODO: implement checkbox logic to save who side is equal and if had other notes save all notes
	return (
		<View style={styles.container}>
			<Topbar
				title={
					stationing.stationing_name === ''
						? 'Nueva sección centro'
						: `${stationing.stationing_name} centro`
				}
				hasBackAction
				onBack={handleOnBackPress} />
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

						{
							errors.stationing_name
								? <HelperText style={styles.errorText} type='error'>{errors.stationing_name}</HelperText>
								: null
						}
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
					{
						!rightChecked
							? <Button icon='chevron-right' onPress={onPressRight} uppercase mode='contained' loading={loading}>Capturar derecha</Button>
							: null
					}
					{
						!leftChecked
							? <Button icon='chevron-left' onPress={onPressLeft} uppercase mode='contained' loading={loading}>Capturar izquierda</Button>
							: null
					}
					{
						leftChecked && rightChecked
							? <Button onPress={handlePressFinishSection} uppercase mode='contained' textColor='#F5F7FA' loading={loading}>Terminar sección</Button>
							: <Button onPress={showModal} uppercase mode='outlined' textColor='#F5F7FA' loading={loading}>Igual a la anterior</Button>
					}
				</View>
			</View>
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
					<Text variant='titleMedium'>¿De que lados es igual?</Text>

					{
						hasNotes
							? <TextInput
								mode='outlined'
								multiline
								label="Notas"
								value={note}
								onChangeText={note => setNote(note)}
							/>
							: <>
								<Checkbox.Item
									label="Igual izquierda"
									status={leftChecked ? 'checked' : 'unchecked'}
									onPress={() => {
										setLeftChecked(!leftChecked);
									}}
								/>
								<Checkbox.Item
									label="Igual derecha"
									status={rightChecked ? 'checked' : 'unchecked'}
									onPress={() => {
										setRightChecked(!rightChecked);
									}}
								/>
							</>
					}

					<View style={styles.modalControls}>
						<Button mode='outlined' onPress={hideModal} icon='close' textColor='#F17878'>Cerrar</Button>
						{
							hasNotes
								? <Button mode='outlined' onPress={() => setHasNotes(!hasNotes)} icon='arrow-left'>Regresar</Button>
								: <Button mode='outlined' onPress={() => setHasNotes(!hasNotes)} icon='note-plus'>Agregar nota</Button>
						}
					</View>

					<Button mode='contained' onPress={() => saveNotes(note)} icon='note-plus'>Continuar</Button>
				</Modal>
			</Portal>
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
	},
	modal: {
		backgroundColor: '#F5F7FA',
		padding: 18,
		margin: 32,
		borderRadius: 12,
		gap: 16
	},
	modalControls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		gap: 12,
		marginTop: 8
	}
});

CaptureSection.propTypes = {
	navigation: PropTypes.object,
};

export default CaptureSection;