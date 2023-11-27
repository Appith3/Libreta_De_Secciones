import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, Button, HelperText, TextInput } from "react-native-paper";
import FileInput from "../componets/FileInput";

const CreateProjectForm = ( props ) => {

	const {
		navigation
	} = props;

	const [projectName, setProjectName] = useState("");
	const [currentDate, setCurrentDate] = useState("");

	const createProject = () => {
		console.log(projectName)
		navigation.navigate("ProjectDetail", {
			project: {
				"_id": "project_id_1000",
				"nombre": {projectName},
				"fecha_creacion": "27/11/2023",
				"archivo_texto": "ruta/al/archivo.txt",
				"cadenamientos": []
			}
		})
	};

	useEffect(() => {
		var date = new Date().getDate();
		var month = new Date().getMonth() + 1;
		var year = new Date().getFullYear();

		setCurrentDate(date + '/' + month + '/' + year)
	}, [])

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Image
					source={require('../../assets/illustrations/bridge-construction.png')}
					style={styles.image}
				/>
				<View style={styles.form}>
					<View>
						<TextInput
							mode="outlined"
							placeholder="Nombre del proyecto"
							value={projectName}
							onChangeText={projectName => setProjectName(projectName)}
							right={<TextInput.Icon icon="map" />}
						/>
						<HelperText type="info" style={styles.helperText}>
							¿Como se llama el lugar donde se va seccionar?
						</HelperText>
					</View>
					<TextInput
						mode="outlined"
						value={currentDate}
						onChangeText={text => setProjectName(text)}
						editable={false}
						right={<TextInput.Icon icon="calendar" />}
					/>
					<FileInput/>
				<Button icon="plus" mode="contained" style={{marginTop: 32}} onPress={ createProject }>Crear trabajo</Button>
				</View>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1e2833'
	},
	main: {
		flex: 1,
		flexDirection: "column",
		gap: 32, 
		padding: 16
	},
	image: {
		width: 184,
		height: 184,
		alignSelf: 'center'
	},
	form: {
		flex: 1,
		flexDirection: "column",
		gap: 16
	},
	helperText: {
		color: '#A8BED1'
	}
})

export default CreateProjectForm;