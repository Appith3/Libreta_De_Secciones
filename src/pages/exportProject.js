import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { StyleSheet, View } from 'react-native';
import { Button, HelperText, Text, TextInput, Snackbar } from 'react-native-paper';
import PropTypes from 'prop-types';
import Topbar from '../componets/Topbar';
import { useState } from 'react';
import { Iconify } from 'react-native-iconify';

const ExportProject = ({ navigation, route }) => {

	const { projectName, projectId } = route.params;

	const [fileName, setFileName] = useState(projectName);
	const [snackbarState, setSnackbarState] = useState({
		showSnack: false,
		snackMessage: ''
	});
	const [isLoading, setIsLoading] = useState(false);
	const [createdFile, setCreatedFile] = useState(false);

	const handleOnBackPress = () => {
		navigation.goBack();
	};

	const onToggleSnackBar = () => setSnackbarState(!snackbarState.showSnack);

	const onDismissSnackBar = () => setSnackbarState({
		...snackbarState,
		showSnack: false
	});

	const handlePressMakeFile = async () => {
		setIsLoading(true);
		try {
			let response = await fetch(`https://api-libreta-topografica.onrender.com/api/create-sections-file/?id=${projectId}`, {
				method: 'POST',
			});

			if (response.ok) {
				setSnackbarState({
					showSnack: true,
					snackMessage: 'Archivo creado'
				});
				setIsLoading(false);
				setCreatedFile(true);
			} else {
				let error = await response;
				console.log('try error status: ', error.status);
				setSnackbarState({
					showSnack: true,
					snackMessage: 'Error al crear el archivo'
				});
				setIsLoading(false);
			}
		} catch (error) {
			console.error('catch error: ', error);
			setIsLoading(false);
		}
	};

	const handlePressDownloadFile = async () => {
		setIsLoading(true);
	
		try {
			const response = await fetch(`https://api-libreta-topografica.onrender.com/api/download-file/?id=${projectId}&filename=${fileName}`);
	
			if (response.ok) {
				const blob = await response.blob();
	
				// Download file using Expo's FileSystem API
				const fileUri = await FileSystem.downloadAsync(
					response.url, // Use the original API endpoint URL for download
					`${FileSystem.documentDirectory}/${fileName}.xlsx` // Specify local file path
				);
	
				if (fileUri.status === 200) {
					console.log('File downloaded successfully in Expo!');
					setSnackbarState({
						showSnack: true,
						snackMessage: 'Archivo descargado',
					});
				} else {
					console.error('Error downloading file in Expo:', fileUri.status);
					setSnackbarState({
						showSnack: true,
						snackMessage: 'Error al descargar el archivo',
					});
				}
	
				setIsLoading(false);
			} else {
				const error = await response.json();
				console.log('try error status: ', error.status);
				setSnackbarState({
					showSnack: true,
					snackMessage: 'Error al descargar el archivo',
				});
				setIsLoading(false);
			}
		} catch (error) {
			console.error('catch error: ', error);
			setIsLoading(false);
		}
	};

	const handlePressShareFile = async () => {
		try {
			const fileUri = await FileSystem.getUriAsync(`${FileSystem.documentDirectory}/${fileName}.xlsx`);
	
			if (fileUri) {
				await Sharing.shareAsync({
					uri: fileUri,
					title: `${fileName}.xlsx`, // Set the title of the shared file
					mimeType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', 
				});
			} else {
				console.error('Error getting file URI for sharing');
				setSnackbarState({
					showSnack: true,
					snackMessage: 'Error al obtener el archivo para compartir',
				});
			}
		} catch (error) {
			console.error('Error sharing file:', error);
			setSnackbarState({
				showSnack: true,
				snackMessage: 'Error al compartir el archivo',
			});
		}
	};

	return (
		<View style={styles.container}>
			<Topbar title={projectName} hasBackAction onBack={handleOnBackPress} />

			<View style={styles.main}>
				<View style={styles.card}>
					<Iconify icon="vscode-icons:file-type-excel2" size={48} />
					<Text variant='titleLarge' style={styles.cardText}>{fileName}.xlsx</Text>
				</View>

				<View>
					<TextInput
						mode='outlined'
						label='Nombre del archivo'
						value={fileName}
						textColor='#F5F7FA'
						style={styles.textInput}
						onChangeText={fileName => setFileName(fileName)}
					/>
					<HelperText type='info' style={styles.helperText}>Puedes cambiar el nombre del archivo</HelperText>
				</View>
			</View>

			{
				!createdFile
					? <Button
						icon="export"
						mode="contained"
						onPress={handlePressMakeFile}
						style={styles.button}
						loading={isLoading}
					>
						Crear archivo
					</Button>
					: (
						<>
							<Button
								icon="share"
								mode="contained"
								onPress={handlePressShareFile}
								style={{ marginHorizontal: 32, marginBottom: 16 }}
								loading={isLoading}
							>
								Compartir archivo
							</Button>
							<Button
								icon="download"
								mode="outlined"
								onPress={handlePressDownloadFile}
								style={{ marginHorizontal: 32, marginBottom: 64 }}
								loading={isLoading}
							>
								Descargar archivo
							</Button>
						</>
					)
			}

			<Snackbar
				visible={snackbarState.showSnack}
				onDismiss={onDismissSnackBar}
				action={{
					label: 'cerrar',
					onPress: onToggleSnackBar,
				}}>
				{snackbarState.snackMessage}
			</Snackbar>
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E2833',
	},
	main: {
		flex: 1,
		justifyContent: 'center',
		flexDirection: 'column',
		padding: 32,
		gap: 64
	},
	card: {
		flexDirection: 'column',
		alignItems: 'center',
		backgroundColor: '#F5F7FA',
		gap: 16,
		padding: 12,
		borderRadius: 4
	},
	cardText: {
		color: '#1E2833'
	},
	helperText: {
		color: '#A8BED1'
	},
	button: {
		margin: 32,
		marginBottom: 64
	},
	textInput: {
		backgroundColor: '#1E2833'
	}
});

ExportProject.propTypes = {
	route: PropTypes.object,
	navigation: PropTypes.object
};

export default ExportProject;