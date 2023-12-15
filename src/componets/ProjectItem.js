import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { List, IconButton, Chip } from 'react-native-paper';

const ProjectItem = (props) => {

	const {
		title,
		listId,
		details,
		navigation
	} = props

	return (
		<List.Item
			title={title}
			key={listId}
			right={() => (
				<>
					<IconButton icon="delete" iconColor='#F17878' onPress={() => console.log(`Deleted item ${listId}`)} />
					<IconButton icon="share" iconColor='#F5F7FA' onPress={() => console.log("share")} />
				</>
			)}
			style={styles.listItem}
			titleStyle={{ color: '#F5F7FA' }}
			onPress={() => {
				navigation.navigate('projectDetail', { project: details });
			}}
		/>
	)
}

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#446585',
		borderRadius: 4,
		marginVertical: 8
	}
})

export default ProjectItem;