import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import { Appbar, HelperText, TextInput } from "react-native-paper";

const CreateProjectForm = () => {

	const [text, setText] = useState("");

	return (
		<View style={styles.container}>
			<Appbar.Header elevated style={{ backgroundColor: '#38526c' }}>
				<Appbar.Content title="Proyectos" color='#F5F7FA' />
			</Appbar.Header>
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
							value={text}
							onChangeText={text => setText(text)}
							right={<TextInput.Icon icon="map" />}
						/>
						<HelperText type="info" style={styles.helperText}>
							¿Como se llama el lugar donde se va seccionar?
						</HelperText>
					</View>
					<TextInput
						mode="outlined"
						value={Date.now().toString()}
						onChangeText={text => setText(text)}
						editable={false}
						right={<TextInput.Icon icon="calendar" />}
					/>
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
		padding: 16
	},
	image: {
		width: 184,
		height: 184,
		alignSelf: 'center'
	},
	form: {
		flex: 1
	},
	helperText: {
		color: '#A8BED1'
	}
})

export default CreateProjectForm;