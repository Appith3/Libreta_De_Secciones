import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { FAB, TextInput, Text } from 'react-native-paper';
import ProjectItem from '../componets/ProjectItem';
import PropTypes from 'prop-types';

import { useProjectStore } from '../hooks/useProjectStore';

const HomePage = ({ navigation }) => {

	const [openFAB, setOpenFAB] = useState({ open: false });
	const [searchText, setSearchText] = useState();

	const projects = useProjectStore((state) => state.projects);
	const getAllProjectsFromFirestore = useProjectStore((state) => state.getAllProjectsFromFirestore);

	useEffect(() => {
		getAllProjectsFromFirestore();
	}, []);

	const onStateChange = () => {
		openFAB.open ? setOpenFAB({ open: false }) : setOpenFAB({ open: true });
	};

	const emptyState = () => {
		// TODO: Add image to empty state
		return (
			<Text
				variant='displaySmall'
				style={{
					color: '#F5F7FA',
					alignSelf: 'center'
				}}
			>No creaste proyectos aun, crea uno para continuar</Text>
		);
	};

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<TextInput
					style={styles.searchInput}
					mode='outlined'
					placeholder='Buscar proyecto'
					value={searchText}
					onChangeText={searchText => setSearchText(searchText)}
					right={<TextInput.Icon icon='magnify' />} />
				<ScrollView>
					{
						projects
							? (
								projects.map((project) => {
									return (
										<ProjectItem title={project.name} listId={project._id} key={project._id} details={project} navigation={navigation} />
									);
								})
							)
							: emptyState
					}
				</ScrollView>
			</View>
			<FAB.Group
				open={openFAB.open}
				icon={openFAB.open ? 'close' : 'plus'}
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
