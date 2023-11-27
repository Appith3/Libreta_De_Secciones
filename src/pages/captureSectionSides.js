import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const CaptureSectionSides = () => {
	return(
		<View style={styles.container}>
			<Text>IZQUIERDA</Text>
			<Button mode="contained" onPress={()=> console.log("capturar izq")}>TERMINAR LADO</Button>
			<Button mode="contained">SIGUIENTE SECCIÓN</Button>
			<Button mode="contained" onPress={()=> console.log("capturar der")}>SIGUIENTE DETALLE</Button>
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

export default CaptureSectionSides;