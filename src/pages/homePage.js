import React, { useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Appbar, FAB, Portal } from 'react-native-paper';
import ListItem from '../componets/ListItem';

const HomePage = () => {

	const [state, setState] = useState({ open: false });
	// TODO: Make function to read projects from DB/projects.json

	const onStateChange = ({ open }) => setState({ open });

	const { open } = state;

	const projectsList = {
		projects: [
			{
				"id": "cff8abf2-fae4-46ed-938b-14c295bbfef3",
				"project_name": "Izumi"
			}, {
				"id": "41836bd8-1317-4b0f-a8e3-b18185459329",
				"project_name": "Shaogongzhuang"
			}, {
				"id": "1da87b91-6d49-4b38-897c-b9df27f82eb7",
				"project_name": "Dinghuo"
			}, {
				"id": "7d529ad9-0d0b-4b35-ac02-0c402b2a3c48",
				"project_name": "Xiaochi"
			}, {
				"id": "15c09604-73e2-4c52-b4d7-0fc65a6bf0b2",
				"project_name": "Batulawang"
			}, {
				"id": "30410aec-50a3-47ab-b521-aeda7b509e52",
				"project_name": "Santa Rita"
			}, {
				"id": "6b98ba96-a7b7-4709-98a8-e131d201a4c7",
				"project_name": "Sena Madureira"
			}, {
				"id": "41f41139-c8f2-4b12-8559-e1ead7b51249",
				"project_name": "Kalasin"
			}, {
				"id": "ec776784-8135-4a14-a5b1-3d4118fa1565",
				"project_name": "Chicoana"
			}, {
				"id": "1f8395e2-bd7c-4193-9ddb-41bc7b4d8ab1",
				"project_name": "Berlin"
			}
		]
	};

	return (
		<View style={styles.container}>
			<Appbar.Header elevated style={{ backgroundColor: '#38526c' }}>
				<Appbar.Content title="Proyectos" color='#F5F7FA' />
			</Appbar.Header>
			{/* TODO: add input search */}
			<ScrollView style={styles.main}>
				{
					projectsList.projects.map((project) => {
						return (
							<ListItem title={project.project_name} listId={project.id}/>
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
							onPress: () => console.log('Crear proyecto'),
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
