import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, FAB, Portal } from 'react-native-paper';
import ListItem from '../componets/ListItem';

import projects from '../../DB/projects';

const HomePage = ({ navigation }) => {

	const [open, setOpen] = useState(false);

	const projectsList = projects.projects;

	return (
		<View style={styles.container}>
			{/* TODO: add input search */}
			<ScrollView style={styles.main}>
				{
					projectsList.map((project) => {
						return (
							<ListItem title={project.nombre} listId={project._id} details={project} navigation={navigation}/>
						);
					}) 
				}
			</ScrollView>
			<Portal>
				<FAB.Group
					open={open}
					visible
					icon={open ? 'close' : 'plus'}
					backdropColor='#fff0'
					color='#F5F7FA'
					fabStyle={{backgroundColor: "#446585", borderRadius: 32}}
					style={{marginBottom: 46}}
					actions={[
						{
							icon: 'plus',
							label: 'Crear proyecto',
							labelTextColor: '#F5F7FA',
							color: '#F5F7FA',
							style: {backgroundColor: "#799AB7", borderRadius: 32},
							onPress: () => navigation.navigate('CreateProject'),
							//! TODO: FIX when navigate to CreateProjectForm the FAB it remains
						},
						{
							icon: 'upload',
							label: 'Importar proyecto',
							labelTextColor: '#F5F7FA',
							color: '#F5F7FA',
							style: {backgroundColor: "#799AB7", borderRadius: 32},
							onPress: () => console.log('Importar proyecto'),
						},
					]}
					onStateChange={(open) => setOpen(open)}
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
