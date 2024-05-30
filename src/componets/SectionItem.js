import { StyleSheet, View } from 'react-native';
import { List, IconButton, Portal, Modal, Text, Icon, Button } from 'react-native-paper';
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

	const [visible, setVisible] = useState(false);
	const showModal = () => setVisible(true);
	const hideModal = () => setVisible(false);

	const handlePressItem = () => {
		setCurrentStation({ stationingId, stationingName, centralReading, code });

		isComplete
			? navigation.navigate('sectionDetail')
			: navigation.navigate('captureSectionCentral');
	};

	const handlePressDeleteStationing = () => {
		deleteStation(stationingId);
		deleteStationOnFirestore(currentProject, stationingId);
		hideModal();
	};

	return (
		<>
			<List.Item
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
								: <IconButton icon='delete' iconColor='#F17878' onPress={showModal} />
						}
						<IconButton icon='chevron-right' iconColor='#F5F7FA' onPress={() => handlePressItem()} />
					</>
				)}
				style={
					isComplete
						? [styles.listItem, styles.borderCompleted]
						: styles.listItem
				}
				titleStyle={styles.title}
				descriptionStyle={styles.description}
				onPress={() => handlePressItem()}
			/>
			<Portal>
				<Modal visible={visible} onDismiss={hideModal} contentContainerStyle={styles.modal}>
					<Icon
						source='delete'
						size={48}
						color='#F17878'
					/>
					<Text variant='titleMedium'>¿Estas seguro que quieres borrar este cadenamiento?</Text>
					<View style={styles.modalControls}>
						<Button mode='outlined' onPress={hideModal}>Cancelar</Button>
						<Button mode='contained' buttonColor='#F17878' onPress={handlePressDeleteStationing}>Borrar</Button>
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