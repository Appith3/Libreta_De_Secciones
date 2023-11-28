import { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { List, IconButton, Chip } from 'react-native-paper';

const ListItem = (props) => {

	const {
		title,
		listId,
		isComplete = false,
		isSection = false,
		details,
		navigation
	} = props

	return (
		<List.Item
			title={title}
			key={listId}
			right={() => (
				<>
					{
						isComplete ?
							<Chip mode="outlined" style={styles.chip} textStyle={{ color: "#F5F7FA", alignSelf: "center" }}>Completa</Chip>
							: <></>
					}

					<IconButton icon="delete" iconColor='#F17878' onPress={() => console.log(`Deleted item ${listId}`)} />

					{
						isSection ?
							<IconButton icon="chevron-right" iconColor='#F5F7FA' onPress={() => console.log("chevron-right")} />
							: <IconButton icon="share" iconColor='#F5F7FA' onPress={() => console.log("share")} />
					}
				</>
			)}
			style={isComplete ?
				[styles.listItem, styles.completed]
				: styles.listItem}
			titleStyle={{ color: '#F5F7FA' }}
			onPress={() => {
				isSection ?
					navigation.navigate('captureCentral', { cadenamiento: details })
					: navigation.navigate('ProjectDetail', { project: details });
			}}
		/>
	)
}

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#446585',
		borderRadius: 4,
		marginVertical: 8
	},
	completed: {
		borderColor: "#369361",
		borderStyle: "solid",
		borderWidth: 2
	},
	chip: {
		borderRadius: 24,
		backgroundColor: "#369361",
		height: 32,
		alignSelf: "center"
	},
})

export default ListItem;