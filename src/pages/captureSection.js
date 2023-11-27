import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const CaptureSection = ({ navigation }) => {

	const onPressLeft = () => {
		// navegar a captureSectionSide pero con algo que diferencie de izq a der
	}

	const onPressRight = () => {
		// navegar a captureSectionSide pero con algo que diferencie de izq a der
	}

	return (
		<View style={styles.container}>
			<Text>CENTRO</Text>
			<Button mode="contained" onPress={() => console.log("capturar izq")}>Capturar izq</Button>
			<Button mode="contained">Igual a la anterior</Button>
			<Button mode="contained" onPress={() => console.log("capturar der")}>Capturar der</Button>
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

export default CaptureSection;