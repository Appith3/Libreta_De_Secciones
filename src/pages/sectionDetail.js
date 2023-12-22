import { useEffect, useState } from "react";
import { StyleSheet, TextInput, View } from "react-native";
import { Button, IconButton, Text } from "react-native-paper";

const SectionDetail = (props) => {

	const {
		route,
		navigation
	} = props

	const {
		nombre,
		lectura_central,
		detalles_izquierda,
		detalles_derecha,
		codigo
	} = route.params.cadenamiento

	const [isEditable, setIsEditable] = useState(false)
	const [isEditing, setIsEditing] = useState(false)

	useEffect(() => {
		navigation.setOptions({ title: `${nombre} ${codigo}` })
	}, [])

	const editText = () => {
		setIsEditing(true)
	}

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text variant="headlineSmall" style={styles.title}>Elevación Central: {lectura_central}</Text>
				<View style={styles.table}>
					<View style={styles.row}>
						<View style={[styles.col, styles.tableHeader, { borderTopLeftRadius: 8 }]}>
							<Text variant="titleSmall" style={styles.tableHeaderText}>Distancia</Text>
						</View>
						<View style={[styles.col, styles.tableHeader]}>
							<Text variant="titleSmall" style={styles.tableHeaderText}>Desnivel</Text>
						</View>
						<View style={[styles.col, styles.tableHeader]}>
							{/* <View style={[styles.col, styles.tableHeader, { borderTopEndRadius: 8 }]}> */}
							<Text variant="titleSmall" style={styles.tableHeaderText}>Altura</Text>
						</View>
						<View style={[styles.col, styles.tableHeader, { borderTopEndRadius: 8 }]}>
							<Text variant="titleSmall" style={styles.tableHeaderText}>Editar</Text>
						</View>
					</View>
					<View style={styles.row} id="1">
						<TextInput
							value="-20"
							keyboardType="decimal-pad"
							readOnly={!isEditable}
							style={styles.tableRow}
							// onEndEditing={() => setIsEditable(false)}
						/>
						<TextInput
							value="-0.38"
							keyboardType="decimal-pad"
							style={styles.tableRow}
						/>
						<TextInput
							value="2.79"
							keyboardType="decimal-pad"
							readOnly
							style={styles.tableRow}
						/>
						<IconButton
							icon="pencil"
							mode="outlined"
							style={styles.editButton}
							iconColor="#B8E2C7"
							onPress={editText}
						/>
					</View>
					<View style={styles.row} id="2">
						<TextInput
							value="-20"
							keyboardType="decimal-pad"
							readOnly={!isEditable}
							style={styles.tableRow}
						/>
						<TextInput
							value="-0.38"
							keyboardType="decimal-pad"
							readOnly
							style={styles.tableRow}
						/>
						<TextInput
							value="2.79"
							keyboardType="decimal-pad"
							readOnly={!isEditable}
							style={styles.tableRow}
						/>
						<IconButton
							icon="pencil"
							mode="outlined"
							style={styles.editButton}
							iconColor="#B8E2C7"
							onPress={editText}
						/>
					</View>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#1e2833",
		padding: 16
	},
	main: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "flex-start",
		gap: 32,
	},
	table: {
		borderColor: "#A8BED1",
		borderRadius: 8,
		borderWidth: 2
	},
	tableHeader: {
		backgroundColor: "#5D84A6",
		// width: "33.33%",
		width: "25%",
	},
	tableHeaderText: {
		color: "#F5F7FA",
		alignSelf: "center",
		paddingHorizontal: 6,
		paddingVertical: 8
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	tableRow: {
		borderColor: "#A8BED1",
		borderWidth: 1,
		width: "25%",
		// width: "33.33%",
		textAlign: "center",
		color: "#F5F7FA",
		fontSize: 16,
		paddingVertical: 8
	},
	editButton:{
		width: "25%",
		borderColor: "#A8BED1",
		borderWidth: 1,
		borderRadius: 0,
		margin: 0,
		height: "100%"
	},
	title: {
		color: "#F5F7FA"
	}
});

export default SectionDetail