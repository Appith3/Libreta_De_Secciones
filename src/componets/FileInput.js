import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text } from 'react-native-paper';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';
import PropTypes from 'prop-types';

import { useStore } from '../store/useStore';

const FileInput = (props) => {

	const { error } = props;

	const stationingFile = useStore((state) => state.stationingFile);
	const updateStationingFile = useStore((state) => state.updateStationingFile);
	const getStationingFromFile = useStore((state) => state.getStationingFromFile);

	const pickFile = async () => {
		try {
			const doc = await DocumentPicker.getDocumentAsync({
				type: ['text/plain', 'text/comma-separated-values'],
				copyToCacheDirectory: true,
			});

			if (doc.assets) {
				updateStationingFile({
					mimeType: doc.assets[0].name.split('.')[1],
					fileName: doc.assets[0].name.split('.')[0],
					uri: doc.assets[0].uri,
				});

				readFileContent(doc.assets[0].uri);
			}
			else doc.canceled;

		} catch (err) {
			console.error('Error al seleccionar el documento:', err);
		}
	};

	const readFileContent = async (uri) => {
		try {
			const file = await FileSystem.getInfoAsync(uri);

			if (file.exists && !file.isDirectory) {
				const content = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.UTF8 });

				getStationingFromFile(content.trimEnd());
			} else {
				return;
			}
		} catch (err) {
			console.error('Error al leer el contenido del archivo', err);
		}
	};

	return (
		<View>
			<View style={styles.fileInput}>
				<Text
					style={styles.placeholder}
					variant='bodyLarge'
					ellipsizeMode='tail'
					numberOfLines={1}
				>
					{stationingFile.file_name}
				</Text>
				<Button
					mode='contained'
					onPress={pickFile}
				>
					Cargar trazo
				</Button>
			</View>
			{
				error
					? <HelperText type='error' style={styles.errorText}>{error}</HelperText>
					: <HelperText type='info'  style={styles.caption}>{stationingFile.file_name}</HelperText>
			}
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
		maxWidth: '60%',
	},
	caption: {
		color: '#A8BED1',
	},
	errorText: {
		color: '#e54343',
	}
});

FileInput.propTypes = {
	error: PropTypes.string
};

export default FileInput;