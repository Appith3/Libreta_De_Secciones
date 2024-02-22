import { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Button, HelperText, TextInput } from 'react-native-paper';
import FileInput from '../componets/FileInput';
import PropTypes from 'prop-types';

const CreateProjectForm = ( props ) => {

	const {
		navigation
	} = props;

	const [projectName, setProjectName] = useState('');

	const createProject = () => {
		navigation.navigate('projectDetail', {
			project: {
				'_id': 'project_id_1000',
				'name': {projectName},
				'creation_date': '27/11/2023',
				'stationing': []
			}
		});
	};

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
							value={projectName}
							onChangeText={projectName => setProjectName(projectName)}
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