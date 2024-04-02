import { StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const SectionItem = (props) => {

	const {
		stationingName,
		stationingId,
		isComplete = false,
		rest
	} = props;

	const navigation = useNavigation();

	const [centralReading, code, projectId] = rest;

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
					<IconButton icon='delete' iconColor='#F17878' onPress={() => console.log(`Deleted item ${stationingId}`)} />
					<IconButton icon='chevron-right' iconColor='#F5F7FA' onPress={() => {
						isComplete
							? navigation.navigate('sectionDetail', { firestorePath: `example_projects/${projectId}/stationing/${stationingId}/details`, centralReading, code, stationingName })
							: navigation.navigate('captureCentral', { firestorePath: `example_projects/${projectId}/stationing/`, stationingName, stationingId });
					}} />
				</>
			)}
			style={
				isComplete
					? [styles.listItem, styles.borderCompleted]
					: styles.listItem
			}
			titleStyle={styles.title}
			descriptionStyle={styles.description}
			onPress={() => {
				isComplete
					? navigation.navigate('sectionDetail', { firestorePath: `example_projects/${projectId}/stationing/${stationingId}/details`, centralReading, code, stationingName })
					: navigation.navigate('captureCentral', { firestorePath: `example_projects/${projectId}/stationing/`, stationingName, stationingId });
			}}
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
	rest: PropTypes.array
};

export default SectionItem;