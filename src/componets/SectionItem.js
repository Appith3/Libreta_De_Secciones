import { StyleSheet } from 'react-native';
import { List, IconButton, Chip, Text } from 'react-native-paper';

const SectionItem = (props) => {

	const {
		title,
		listId,
		isComplete = false,
		details,
		navigation
	} = props

	return (
		<List.Item
			title={title}
			description={
				isComplete
					?	"Completa"
					: null
			}
			key={listId}
			right={() => (
				<>
					{/* {
						isComplete
							? <Chip mode="outlined" style={styles.chip} textStyle={{ color: "#F5F7FA", alignSelf: "center" }}>Completa</Chip>
							: <></>
					} */}

					<IconButton icon="delete" iconColor='#F17878' onPress={() => console.log(`Deleted item ${listId}`)} />
					<IconButton icon="share" iconColor='#F5F7FA' onPress={() => console.log("share")} />
				</>
			)}
			style={
				isComplete
					? [styles.listItem, styles.borderCompleted]
					: styles.listItem
			}
			titleStyle={ styles.title }
			descriptionStyle={ styles.description}
			onPress={() => {
				navigation.navigate('captureCentral', { cadenamiento: details })
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
	borderCompleted: {
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
	title: {
		color: '#F5F7FA'
	},
	description: {
		color: "#DAF1E0",
		textDecorationLine: "underline"
	}
})

export default SectionItem;