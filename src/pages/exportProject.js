import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

const ExportProject = (props) => {

	const { route } = props
	const { project } = route.params

	return (
		<View style={styles.container}>
			<Text>Exportar Proyecto</Text>
			<Text>{project.nombre}</Text>
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

export default ExportProject