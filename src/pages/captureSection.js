import { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const CaptureSection = ({ navigation, route }) => {

	const { cadenamiento } = route.params

	useEffect(() => {
		navigation.setOptions({ title: cadenamiento.nombre })
	}, [])

	const onPressLeft = () => {
		navigation.navigate("captureSectionSides", { _side: "left" })
	}

	const onPressRight = () => {
		navigation.navigate("captureSectionSides", { _side: "right" })
	}

	return (
		<View style={styles.container}>
			<View style={styles.main} >
				<TextInput
					mode="outlined"
					placeholder="Codigo"
					// value={projectName}
					// onChangeText={projectName => setProjectName(projectName)}
					right={<TextInput.Icon icon="tag" />} />

				<TextInput
					mode="outlined"
					placeholder="Cadenamiento"
					keyboardType="number-pad"
					inputMode="decimal"
					// value={projectName}
					// onChangeText={projectName => setProjectName(projectName)}
					right={<TextInput.Icon icon="map-marker" />} />

				<TextInput
					mode="outlined"
					placeholder="Lectura central"
					keyboardType="number-pad"
					inputMode="decimal"
					textAlign="left"
					// value={projectName}
					// onChangeText={projectName => setProjectName(projectName)}
					/>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	main: {
		flex: 1,
		flexDirection: "column",
		backgroundColor: "#1e2833",
		padding: 16,
		gap: 16
	}
});

export default CaptureSection;