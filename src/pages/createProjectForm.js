import { Image, StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import FileInput from '../componets/FileInput';
import PropTypes from 'prop-types';
import { useStore } from '../store/useStore';
import Topbar from '../componets/Topbar';
import { useState } from 'react';

const CreateProjectForm = (props) => {

	const {
		navigation
	} = props;

	const project = useStore((state) => state.project);
	const updateProjectName = useStore((state) => state.updateProjectName);
	const createProject = useStore((state) => state.createProject);
	const stationingFile = useStore((state) => state.stationingFile);
	const stations = useStore((state) => state.stations);
	const resetProjectStore = useStore((state) => state.resetProjectStore);
	const createStationing = useStore((state) => state.createStationing);
	const resetStationingFileStore = useStore((state) => state.resetStationingFileStore);

	const [errors, setErrors] = useState({});

	const validateForm = () => {
		let errors = {};

		let {
			project_name
		} = project;

		if (!project_name) errors.name = 'El nombre es requerido';
		if (stations.length === 0) errors.stations = 'Carga el trazo para continuar';
		setErrors(errors);

		return Object.keys(errors).length === 0;
	};

	const handleOnBackPress = () => {
		resetProjectStore();
		resetStationingFileStore();
		navigation.goBack();
	};

	const handleCreateProjectTap = async () => {
		await createProject(project);

		if (validateForm()) {
			const { id } = project;
			const { mime_type } = stationingFile;

			stations?.map(async (s) => {
				const station = mime_type === 'txt'
					? s.split('\t')
					: s.split(',');

				const [, , , , stationing_name, code] = station;

				await createStationing(id, { stationing_name, code });
			});

			navigation.navigate('projectDetail');
		}
	};

	return (
		<View style={styles.container}>
			<Topbar title='Nuevo proyecto' hasBackAction onBack={handleOnBackPress} />
			<View style={styles.main}>
				<Image
					// eslint-disable-next-line no-undef
					source={require('../../assets/illustrations/bridge-construction.png')}
					style={styles.image}
				/>
				<View style={styles.form}>
					<View>
						<TextInput
							mode='outlined'
							placeholder='Nombre del proyecto'
							value={project.project_name}
							onChangeText={(e) => updateProjectName(e)}
							right={<TextInput.Icon icon='map' />}
						/>
						{
							errors
								? <HelperText type='error' style={styles.errorText}>{errors.name}</HelperText>
								: null
						}
					</View>

					<FileInput error={errors.stations} />

					<View style={styles.controls}>
						<Button icon='plus' mode='contained' onPress={() => handleCreateProjectTap()}>Crear proyecto</Button>
					</View>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1e2833'
	},
	main: {
		flex: 1,
		flexDirection: 'column',
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
		flexDirection: 'column',
		gap: 16
	},
	helperText: {
		color: '#A8BED1'
	},
	errorText: {
		color: '#e54343',
	},
	controls: {
		position: 'absolute', 
		bottom: 18,
		width: '100%',
		zIndex: -1
	}
});

CreateProjectForm.propTypes = {
	navigation: PropTypes.object
};

export default CreateProjectForm;