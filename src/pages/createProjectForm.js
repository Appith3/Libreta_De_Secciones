import { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import FileInput from '../componets/FileInput';
import PropTypes from 'prop-types';

import { useStore } from '../store/useStore';

const CreateProjectForm = ( props ) => {

	const {
		navigation
	} = props;

	const project = useStore((state) => state.project);
	const createProject = useStore((state) => state.createProject);
	const updateProjectName = useStore((state) => state.updateProjectName);
	
	useEffect(() => {
		console.log('project: ', project.project_name);
	}, []);

	return (
		<View style={styles.container}>
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
						<HelperText type='info' style={styles.helperText}>
							¿Como se llama el lugar donde se va seccionar?
						</HelperText>
					</View>
					<FileInput/>
					<Button icon='plus' mode='contained' style={{marginTop: 96}} onPress={ createProject }>Crear trabajo</Button>
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
	}
});

CreateProjectForm.propTypes = {
	navigation: PropTypes.object	
};

export default CreateProjectForm;