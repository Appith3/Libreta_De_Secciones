import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo-sharing';
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
					snackMessage: 'Archivo creado 🤩'
				});
				setIsLoading(false);
				setCreatedFile(true);
			} else {
				setSnackbarState({
					showSnack: true,
					snackMessage: '😵 Error al crear el archivo 😵'
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
		let apiUrl = `https://api-libreta-topografica.onrender.com/api/download-file/?id=${projectId}&filename=${projectName}`;

		try {
			const result = await FileSystem.downloadAsync(
				apiUrl,
				`${FileSystem.documentDirectory}/${fileName}.xlsx`
			);
				
			if (result.status !== 200) {
				setSnackbarState({
					showSnack: true,
					snackMessage: '😵 Error al descargar el archivo 😵'
				});
	
				setIsLoading(false);
				return;
			} else {
				saveFile(result.uri);
			}
		} catch (error) {
			setSnackbarState({
				showSnack: true,
				snackMessage: '🤕 Algo salio mal! 🤷'
			});

			setIsLoading(false);
		}
	};

	const saveFile = (uri) => {
		shareAsync(uri);
		setIsLoading(false);
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
					: <Button
						icon="download"
						mode="contained"
						onPress={handlePressDownloadFile}
						style={{ marginHorizontal: 32, marginBottom: 64 }}
						loading={isLoading}
					>
						Descargar archivo
					</Button>
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