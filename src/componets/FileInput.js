import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper'

const FileInput = () => {
	const [text, setText] = useState("");

	return (
		<View style={styles.fileInput}>
			<Text style={styles.placeholder}>Nombre del archivo</Text>
			<Button
				mode='contained'
				style={styles.button}	
			>
				Cargar trazo
			</Button>
		</View>
	)
}

const styles = StyleSheet.create({
	fileInput: {
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		backgroundColor: "#F5F7FA",
		paddingHorizontal: 16,
		height: 56,
		borderRadius: 4
	},
	placeholder: {
		fontFamily: "sans-serif",
		letterSpacing: 0.15,
		fontSize: 16,
		textAlignVertical: "center",
		textAlign: "left",
	},
	button: {
		
	}
})

export default FileInput