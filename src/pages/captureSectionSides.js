import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

const CaptureSectionSides = ({ navigation, route}) => {

	const { _side } = route.params;

	const [ side, setSide ] = useState(_side);

	useEffect(() => {
		navigation.setOptions({ title: `Capturando ${side}`})
	}, [side])

	const changeSide = () => {
		side === "left" ? setSide("right") : setSide("left")
	}

	return(
		<View style={styles.container}>
			<Text>LADO</Text>
			<Button mode="contained" onPress={changeSide}>TERMINAR LADO</Button>
			<Button mode="contained" onPress={ navigation.navigate("captureCentral")}>SIGUIENTE SECCIÓN</Button>
			<Button mode="contained" onPress={()=> console.log("reset form")}>SIGUIENTE DETALLE</Button>
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