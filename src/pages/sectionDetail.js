import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

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

	useEffect(() => {
		navigation.setOptions({ title: `${nombre} ${codigo}` })
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text style={{ color: "#F5F7FA" }}>Elevación Central: {lectura_central}</Text>
				<View style={styles.table}>
					<View style={styles.col}>
						<View style={styles.row}>

						</View>
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
		justifyContent: "center",
		gap: 32,
	},
	table: {
		backgroundColor: "#A8BED1",
		height: "90%"
	},
	tableHeader: {
		
	}

});

export default SectionDetail