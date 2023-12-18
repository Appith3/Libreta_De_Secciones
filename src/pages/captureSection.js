import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput } from "react-native-paper";

const CaptureSection = ({ navigation, route }) => {

	const { cadenamiento } = route.params // pasado como parámetro dentro de route en el componente ListItem

	const { codigo, nombre, lectura_central } = cadenamiento

	const [_codigo, setCodigo] = useState(codigo)
	const [_nombre, setNombre] = useState(nombre)
	const [_lecturaCentral, setLecturaCentral] = useState(lectura_central)

	useEffect(() => {
		navigation.setOptions({ title: `${_nombre} CENTRO` || 'Nueva Sección centro' })
		console.log("cadenamiento: ", cadenamiento);
		console.log("route: ", route);
	}, [])

	const onPressLeft = () => {
		navigation.navigate("captureSectionSides", { _side: "Izq", cadenamiento })
	}

	const onPressRight = () => {
		navigation.navigate("captureSectionSides", { _side: "Der", cadenamiento })
	}

	// formateamos el valor del cadenamiento de 0000 a 0+000.00
	const formatAlignmentName = () => {}

	return (
		<View style={styles.container}>
			<View style={styles.main} >
				<View style={styles.form} >
					<TextInput
						mode="outlined"
						placeholder="Codigo"
						value={_codigo}
						onChangeText={_codigo => setCodigo(_codigo)}
						right={<TextInput.Icon icon="tag" />} />

					<TextInput
						mode="outlined"
						placeholder="Cadenamiento"
						keyboardType="number-pad"
						inputMode="decimal"
						value={_nombre}
						onChangeText={_nombre => setNombre(_nombre)}
						right={<TextInput.Icon icon="map-marker" />}
					/>

					<TextInput
						mode="outlined"
						placeholder="Lectura central"
						keyboardType="number-pad"
						inputMode="decimal"
						textAlign="left"
						value={_lecturaCentral}
						onChangeText={_lecturaCentral => setLecturaCentral(_lecturaCentral)} />
				</View>
				<View style={styles.controls} >
					<Button icon="chevron-left" onPress={onPressLeft} uppercase mode="contained" >Capturar izquierda</Button>
					<Button icon="chevron-right" onPress={onPressRight} uppercase mode="contained" >Capturar derecha</Button>
					<Button uppercase mode="outlined" textColor="#F5F7FA" >Igual a la anterior</Button>
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

export default CaptureSection;