import { StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { useStore } from '../store/useStore';

const SectionItem = (props) => {

	const {
		stationingName,
		stationingId,
		isComplete = false,
		centralReading,
		code = '',
	} = props;

	const navigation = useNavigation();

	const deleteStation = useStore((state) => state.deleteStation);
	const currentProject = useStore((state) => state.project);
	const setCurrentStation = useStore((state) => state.setCurrentStation);

	const handlePressItem = () => {
		setCurrentStation({ stationingId, stationingName, centralReading, code });
		
		isComplete
			? navigation.navigate('sectionDetail', { firestorePath: `example_projects/${currentProject.id}/stationing/${stationingId}/details`, centralReading, code, stationingName })
			: navigation.navigate('captureCentral'); //* FIXME: TypeError: Cannot read property 'toString' of undefined.
	};

	return (
		<List.Item
			title={`${stationingName} ${code}`}
			description={
				isComplete
					? 'Completa'
					: null
			}
			right={() => (
				<>
					<IconButton icon='delete' iconColor='#F17878' onPress={() => deleteStation(currentProject.id, stationingId)} />
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
	chip: {
		borderRadius: 24,
		backgroundColor: '#369361',
		height: 32,
		alignSelf: 'center'
	},
	title: {
		color: '#F5F7FA'
	},
	description: {
		color: '#DAF1E0',
		textDecorationLine: 'underline'
	}
});

SectionItem.propTypes = {
	stationingName: PropTypes.string,
	stationingId: PropTypes.string,
	isComplete: PropTypes.bool,
	centralReading: PropTypes.number,
	code: PropTypes.string,
};

export default SectionItem;