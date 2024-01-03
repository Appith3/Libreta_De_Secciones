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
		detalles,
		codigo
	} = route.params.cadenamiento

	useEffect(() => {
		navigation.setOptions({ title: `${nombre} ${codigo}` })
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text variant="headlineSmall" style={styles.title}>Elevación Central: {lectura_central}</Text>
				<View style={styles.table}>
					<View style={styles.row}>
						<View style={[styles.tableHeader, { borderTopLeftRadius: 8 }]}>
							<Text variant="titleSmall" style={styles.headerCell}>Distancia</Text>
						</View>
						<View style={styles.tableHeader}>
							<Text variant="titleSmall" style={styles.headerCell}>Desnivel</Text>
						</View>
						<View style={[styles.tableHeader, { borderTopEndRadius: 8 }]}>
							<Text variant="titleSmall" style={styles.headerCell}>Lectura</Text>
						</View>
					</View>
					<View> {/* NOTE: this View will change to ScrollView */}
						{
							detalles.map((detalles) => {
								return (
									<View style={styles.row} id={detalles._id}>
										<Text style={styles.cell}>{detalles.distancia}</Text>
										<Text style={styles.cell}>{detalles.desnivel}</Text>
										<Text style={styles.cell}>{detalles.lectura}</Text>
									</View>
								)
							})
						}
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
		width: "33.33%",
	},
	headerCell: {
		color: "#F5F7FA",
		alignSelf: "center",
		paddingHorizontal: 6,
		paddingVertical: 8
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between"
	},
	cell: {
		borderColor: "#A8BED1",
		borderWidth: 1,
		width: "33.33%",
		textAlign: "center",
		color: "#F5F7FA",
		fontSize: 16,
		paddingVertical: 8
	},
	editButton: {
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