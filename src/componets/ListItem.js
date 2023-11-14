import { StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';

const ListItem = (props) => {

	const {
		title,
		listId
	} = props

	return (
		<List.Item
			title={title}
			key={listId}
			right={props => (
				<>
					<IconButton {...props} icon="delete" iconColor='#F17878' onPress={() => console.log(`Deleted item ${listId}`)} />
					<IconButton {...props} icon="share" iconColor='#F5F7FA' onPress={() => console.log("share")} />
				</>
			)}
			style={styles.listItem}
			titleStyle={{ color: '#F5F7FA' }}
			onPress={() => console.log(`List item ${listId}`)}
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

export default ListItem;