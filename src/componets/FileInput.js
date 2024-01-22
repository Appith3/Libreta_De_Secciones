import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

const FileInput = () => {
	// eslint-disable-next-line no-unused-vars
	const [text, setText] = useState('');

	const pickDocument = async () => {
		try {
			const result = await DocumentPicker.pick({
				type: [DocumentPicker.types.allFiles],
			});
			console.log(result);
		} catch (err) {
			if (DocumentPicker.isCancel(err)) {
				// El usuario canceló la selección del documento
				console.log('Selección de documento cancelada');
			} else {
				// Manejo de otros errores
				console.error('Error al seleccionar el documento:', err);
			}
		}
	};
	

	return (
		<View style={styles.fileInput}>
			<Text style={styles.placeholder}>Nombre del archivo</Text>
			<Button
				mode='contained'
				style={styles.button}	
				onPress={pickDocument}
			>
				Cargar trazo
			</Button>
		</View>
	);
};

const styles = StyleSheet.create({
	fileInput: {
		alignItems: 'center',
		justifyContent: 'space-between',
		flexDirection: 'row',
		backgroundColor: '#F5F7FA',
		paddingHorizontal: 16,
		height: 56,
		borderRadius: 4
	},
	placeholder: {
		fontFamily: 'sans-serif',
		letterSpacing: 0.15,
		fontSize: 16,
		textAlignVertical: 'center',
		textAlign: 'left',
	},
	button: {
		
	}
});

export default FileInput;