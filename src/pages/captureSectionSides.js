import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const CaptureSectionSides = ({ navigation, route }) => {

	const { _side, cadenamiento } = route.params;

	const { detalles_derecha, detalles_izquierda, nombre } = cadenamiento

	const [side, setSide] = useState(_side);

	useEffect(() => {
		navigation.setOptions({ title: `${nombre} ${side}` })
	}, [side])
	
	const changeSide = () => side === "Izq" ? setSide("Der") : setSide("Izq")

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<View style={styles.form}>
					<TextInput
						mode="outlined"
						placeholder="Nombre del detalle"
						// value={_codigo}
						// onChangeText={_codigo => setCodigo(_codigo)}
						right={<TextInput.Icon icon="tag" />} />

					<TextInput
						mode="outlined"
						placeholder="Lectura"
						keyboardType="number-pad"
						inputMode="decimal"
						// value={_nombre}
						// onChangeText={_nombre => setNombre(_nombre)}
						right={<TextInput.Icon icon="ruler" />}
					/>

					<TextInput
						mode="outlined"
						placeholder="Distancia"
						keyboardType="number-pad"
						inputMode="decimal"
						textAlign="left"
						// value={_lecturaCentral}
						// onChangeText={_lecturaCentral => setLecturaCentral(_lecturaCentral)} 
						right={<TextInput.Icon icon="map-marker-distance" />}
					/>
				</View>
				<View style={styles.controls}>
					<Button uppercase mode="contained" onPress={() => console.log("reset form")}>Siguiente detalle</Button>
					<Button uppercase mode="contained" onPress={changeSide}>Terminar lado</Button>
					<Button uppercase mode="outlined" textColor="#F5F7FA" onPress={() => navigation.navigate("captureCentral")}>Siguiente sección</Button>
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
		gap: 32
	},
	form: {
		gap: 16
	},
	controls: {
		gap: 16
	}
});

export default CaptureSectionSides;