import { StyleSheet, View } from 'react-native';
import { List, IconButton, Portal, Modal, Text, Icon, Button, Checkbox } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';
import { useState } from 'react';

const SectionItem = (props) => {

	const {
		stationingName,
		stationingId,
		isComplete = false,
		centralReading,
		code = '',
	} = props;

	const navigation = useNavigation();

	// TODO: implement multiple selection to delete items
	const deleteStationOnFirestore = useStore((state) => state.deleteStationOnFirestore);
	const currentProject = useStore((state) => state.project);
	const setCurrentStation = useStore((state) => state.setCurrentStation);
	const deleteStation = useStore((state) => state.deleteStation);
	const stationsToDelete = useStore((state) => state.stationsToDelete);
	const setStationsToDelete = useStore((state) => state.setStationsToDelete);
	const updateStationsToDelete = useStore((state) => state.updateStationsToDelete);
	const resetStationsToDelete = useStore((state) => state.resetStationsToDelete);

	const [isSelected, setIsSelected] = useState(false);
	const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
	const showModalDelete = () => setModalDeleteVisible(true);
	const hideModalDelete = () => setModalDeleteVisible(false);

	const onSelectItem = (itemId) => {
		setIsSelected(!isSelected);

		isSelected
			? updateStationsToDelete(itemId)
			: setStationsToDelete(itemId);

		console.log('stationsToDelete: ', stationsToDelete);
	};

	const deleteItem = () => {
		deleteStation(stationingId);
		deleteStationOnFirestore(currentProject, stationingId);
	};

	const deleteSelectedItems = () => {
		stationsToDelete.map((station) => {
			deleteStation(station);
			deleteStationOnFirestore(currentProject, station);
		});
		resetStationsToDelete();
	};

	const handlePressItem = () => {
		setCurrentStation({ stationingId, stationingName, centralReading, code });

		isComplete
			? navigation.navigate('sectionDetail')
			: navigation.navigate('captureSectionCentral');
	};

	const handleDeletePress = () => {

		stationsToDelete.length < 1
			? deleteItem()
			: deleteSelectedItems();

		hideModalDelete();
	};

	return (
		<>
			<List.Item
				left={() => (
					isSelected
						? <Checkbox.Item
							status={isSelected ? 'checked' : 'unchecked'}
							onPress={() => onSelectItem(stationingId)}
							color='#F5F7FA'

						/>
						: null
				)}
				title={`${stationingName} ${code}`}
				description={
					isComplete
						? 'Completa'
						: null
				}
				right={() => (
					<>
						{
							isComplete
								? null
								: <IconButton icon='delete' iconColor='#EC5F5F' onPress={showModalDelete} />
						}
						<IconButton icon='chevron-right' iconColor='#F5F7FA' onPress={() => handlePressItem()} />
					</>
				)}
				style={
					isComplete || isSelected
						? [styles.listItem, styles.borderCompleted]
						: styles.listItem
				}
				titleStyle={styles.title}
				descriptionStyle={styles.description}
				onPress={() => isSelected ? onSelectItem(stationingId) : handlePressItem()}
				onLongPress={() => !isComplete ? onSelectItem(stationingId) : null}
			/>
			<Portal>
				<Modal visible={modalDeleteVisible} onDismiss={hideModalDelete} contentContainerStyle={styles.modal}>
					<Icon
						source='delete'
						size={48}
						color='#F17878'
					/>
					{
						stationsToDelete.length < 1
							? <Text variant='titleMedium'>¿Estas seguro que quieres borrar este cadenamiento?</Text>
							: <Text variant='titleMedium'>¿Estas seguro que quieres borrar {stationsToDelete.length} cadenamientos?</Text>
					}
					<View style={styles.modalControls}>
						<Button mode='outlined' onPress={hideModalDelete}>Cancelar</Button>
						<Button mode='contained' buttonColor='#F17878' onPress={handleDeletePress}>Borrar</Button>
					</View>
				</Modal>
			</Portal>
		</>
	);
};

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#446585',
		borderRadius: 4,
		marginVertical: 8
	},
	borderCompleted: {
		borderColor: '#369361',
		borderStyle: 'solid',
		borderWidth: 2
	},
	title: {
		color: '#F5F7FA'
	},
	description: {
		color: '#DAF1E0',
		textDecorationLine: 'underline'
	},
	modal: {
		backgroundColor: '#F5F7FA',
		padding: 18,
		margin: 32,
		borderRadius: 12,
		gap: 16,
		alignItems: 'center'
	},
	modalControls: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		gap: 12,
		marginTop: 8
	},
});

SectionItem.propTypes = {
	stationingName: PropTypes.string,
	stationingId: PropTypes.string,
	isComplete: PropTypes.bool,
	centralReading: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	code: PropTypes.string,
};

export default SectionItem;