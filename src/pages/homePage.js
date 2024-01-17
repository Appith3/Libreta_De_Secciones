import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import ProjectItem from '../componets/ProjectItem';

import projects from '../../DB/projects';

const HomePage = ({ navigation }) => {
	const [fabVisible, setFabVisible] = useState(false);

	const [state, setState] = useState({ open: false });
	// TODO: Make function to read projects from DB/projects.json

	const onStateChange = ({ open }) => setState({ open });

	const { open } = state;

	const projectsList = projects.projects;

	useEffect(() => {
		setFabVisible(true)
	}, [])

	return (
		<View style={styles.container}>
			{/* TODO: add input search */}
			<ScrollView style={styles.main}>
				{
					projectsList.map((project) => {
						return (
							<ProjectItem title={project.name} listId={project._id} key={project._id} details={project} navigation={navigation} />
						);
					})
				}
			</ScrollView>
			<Portal>
				<FAB.Group
					open={open}
					visible={fabVisible}
					icon={open ? 'close' : 'plus'}
					backdropColor='#fff0'
					color='#F5F7FA'
					fabStyle={{ backgroundColor: "#446585", borderRadius: 32 }}
					style={{ marginBottom: 46 }}
					actions={[
						{
							icon: 'plus',
							label: 'Crear proyecto',
							labelTextColor: '#F5F7FA',
							color: '#F5F7FA',
							style: { backgroundColor: "#799AB7", borderRadius: 32 },
							onPress: () => {
								navigation.navigate('createProject');
								setFabVisible(false);
							},
							//FIXME:  when go back from createProjectForm screen the FAB not appear
							//FIXME:  FAB persist in others screen
						},
						{
							icon: 'upload',
							label: 'Importar proyecto',
							labelTextColor: '#F5F7FA',
							color: '#F5F7FA',
							style: { backgroundColor: "#799AB7", borderRadius: 32 },
							onPress: () => {
								navigation.navigate('importProject')
								setFabVisible(false);
							},
						},
					]}
					onStateChange={onStateChange}
				/>
			</Portal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1e2833'
	},
	main: {
		flex: 1,
		flexDirection: "column",
		padding: 16
	},
});

export default HomePage;
