import { useEffect, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

const FileInput = () => {

	const [file, setFile] = useState({
		mimeType: '',
		name: 'Nombre del archivo',
		uri: '',
		content: {}
	});

	useEffect(() => {
		readFileContent(file.uri);
	}, [file]);
	
	const pickFile = async () => {
		try {
			const doc = await DocumentPicker.getDocumentAsync({
				type: ['text/plain', 'text/comma-separated-values'],
				copyToCacheDirectory: false,
			});

			if (doc.assets) {
				setFile({
					mimeType: doc.assets[0].mimeType,
					name: doc.assets[0].name,
					uri: doc.assets[0].uri
				});
			}
			else doc.canceled;

		} catch (err) {
			console.error('Error al seleccionar el documento:', err);
		}
	};

	const readFileContent = async (uri) => {
		try {
			const file = await FileSystem.getInfoAsync(uri);

			if(file.exists && !file.isDirectory) {
				const content = await FileSystem.readAsStringAsync(uri, {encoding: FileSystem.EncodingType.UTF8}); // 
				console.log(content);
			} else {
				Alert.alert('Error', 'No se puede leer el contenido del archivo');
			}
		} catch (err) {
			console.error('Error al leer el contenido del archivo', err);
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
				onPress={pickFile}
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