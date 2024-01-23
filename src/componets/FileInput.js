import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';

const FileInput = () => {

	const [file, setFile] = useState({
		mimeType: '',
		name: 'Nombre del archivo',
		uri: ''
	});

	const pickDocument = async () => {
		try {
			const doc = await DocumentPicker.getDocumentAsync({
				type: ['text/plain', 'text/comma-separated-values'],
				copyToCacheDirectory: false,
			});

			!doc.assets ?
				doc.canceled :
				setFile({
					mimeType: doc.assets[0].mimeType,
					name: doc.assets[0].name,
					uri: doc.assets[0].uri
				});

		} catch (err) {
			console.error('Error al seleccionar el documento:', err);
		}
	};

	return (
		<View style={styles.fileInput}>
			<Text
				style={styles.placeholder}
				variant='bodyLarge'
				ellipsizeMode='tail'
				numberOfLines={1}
			>
				{file.name.split('.')[0]
				}</Text>
			<Button
				mode='contained'
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
		maxWidth: '65%'
	}
});

export default FileInput;