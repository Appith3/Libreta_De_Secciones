import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const SectionDetail = (props) => {

	const {
		route,
		navigation
	} = props

	const { cadenamiento } = route.params
	
	useEffect(() => {
		navigation.setOptions({ title: cadenamiento.nombre })
	}, [])

	return (
		<View style={styles.container}>
			{
				cadenamiento.status === "complete"
					? <Text>Detalles de la sección</Text>
					: <Text>Empty</Text>
			}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		gap: 32
	}
});

export default SectionDetail