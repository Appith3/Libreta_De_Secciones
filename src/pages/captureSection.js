import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const CaptureSection = ({ navigation, route }) => {

	const { cadenamiento } = route.params
	
	useEffect(() => {
		navigation.setOptions({ title: cadenamiento.nombre})
	}, [])

	const onPressLeft = () => {
		navigation.navigate("captureSectionSides", { _side: "left" })
	}

	const onPressRight = () => {
		navigation.navigate("captureSectionSides", { _side: "right" })
	}

	return (
		<View style={styles.container}>
			<Text>CENTRO</Text>
			<Button mode="contained" onPress={onPressLeft}>Capturar izq</Button>
			<Button mode="contained">Igual a la anterior</Button>
			<Button mode="contained" onPress={onPressRight}>Capturar der</Button>
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