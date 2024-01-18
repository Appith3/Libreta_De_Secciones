import { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import ProjectItem from '../componets/ProjectItem';
import PropTypes from 'prop-types';
import projects from '../../DB/projects';

const HomePage = ({ navigation }) => {

	const [state, setState] = useState({ open: false });
	const [searchText, setSearchText] = useState();
	// TODO: Make function to read projects from DB/projects.json

	const onStateChange = ({ open }) => setState({ open });

	const { open } = state;

	const projectsList = projects.projects;

	return (
		<View style={styles.container}>
			<View  style={styles.main}>
				<TextInput
					style={styles.searchInput}
					mode='outlined'
					placeholder='Buscar proyecto'
					value={searchText}
					onChangeText={searchText => setSearchText(searchText)}
					right={<TextInput.Icon icon='magnify' />} />
				<ScrollView>
					{
						projectsList.map((project) => {
							return (
								<ProjectItem title={project.name} listId={project._id} key={project._id} details={project} navigation={navigation} />
							);
						})
					}
				</ScrollView>
			</View>
			<FAB.Group
				open={open}
				icon={open ? 'close' : 'plus'}
				backdropColor='#fff0'
				color='#F5F7FA'
				fabStyle={{ backgroundColor: '#446585', borderRadius: 32 }}
				style={{ marginBottom: 46 }}
				actions={[
					{
						icon: 'plus',
						label: 'Crear proyecto',
						labelTextColor: '#F5F7FA',
						color: '#F5F7FA',
						style: { backgroundColor: '#799AB7', borderRadius: 32 },
						onPress: () => {
							navigation.navigate('createProject');
						}
					},
					{
						icon: 'upload',
						label: 'Importar proyecto',
						labelTextColor: '#F5F7FA',
						color: '#F5F7FA',
						style: { backgroundColor: '#799AB7', borderRadius: 32 },
						onPress: () => {
							navigation.navigate('importProject');
						},
					},
				]}
				onStateChange={onStateChange}
			/>
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
		padding: 16
	},
	searchInput: {
		marginVertical: 8
	}
});

HomePage.propTypes = {
	navigation: PropTypes.object
};

export default HomePage;
