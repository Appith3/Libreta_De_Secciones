import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, TextInput, FAB } from 'react-native-paper';
import SectionItem from '../componets/SectionItem';
import PropTypes from 'prop-types';

const ProjectDetail = ({ navigation, route }) => {
	// FIXME: Go Home on projectDetail after create project
	/* 
		At the moment after create project, the screen change to project Detail the problem is when want to go back the screen change to create Project Form instead of that change to homePage
	*/

	const { project } = route.params;

	const [searchText, setSearchText] = useState('');

	const [state, setState] = useState({ open: false });

	const onStateChange = ({ open }) => setState({ open });

	const { open } = state;

	useEffect(() => {
		navigation.setOptions({ title: project.name.projectName || project.name });
	}, []);

	const renderList = project.stationing.map((stationing) => {
		return stationing.status === 'complete'
			? <SectionItem title={stationing.name} listId={stationing._id} key={stationing._id} isComplete navigation={navigation} details={stationing} />
			: <SectionItem title={stationing.name} listId={stationing._id} key={stationing._id} navigation={navigation} details={stationing} />;
	});

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<TextInput
					placeholder='Buscar sección'
					value={searchText}
					onChangeText={searchText => setSearchText(searchText)}
					mode='outlined'
				/>
				<View style={styles.chips}>
					<ScrollView horizontal>
						<Chip mode='outlined' style={styles.chip} selectedColor='#5D84A6' onPress={() => console.log('Todo')}>Todo</Chip>
						<Chip mode='outlined' style={styles.chip} selectedColor='#5D84A6' onPress={() => console.log('Secciones completas')}>Secciones completas</Chip>
						<Chip mode='outlined' style={styles.chip} selectedColor='#5D84A6' onPress={() => console.log('Secciones vacías')}>Secciones vacías</Chip>
					</ScrollView>
				</View>
			</View>
			<View>
				<ScrollView style={styles.sectionsList}>
					{
						renderList
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
						label: 'Nueva sección',
						labelTextColor: '#F5F7FA',
						color: '#F5F7FA',
						style: { backgroundColor: '#799AB7', borderRadius: 32 },
						onPress: () => navigation.navigate('captureCentral'),
					},
					{
						icon: 'upload',
						label: 'Exportar proyecto',
						labelTextColor: '#F5F7FA',
						color: '#F5F7FA',
						style: { backgroundColor: '#799AB7', borderRadius: 32 },
						onPress: () => navigation.navigate('exportProject', { project }),
					},
					{
						icon: 'delete',
						label: 'Borrar proyecto',
						labelTextColor: '#F5F7FA',
						color: '#F5F7FA',
						style: { backgroundColor: '#E54343', borderRadius: 32 },
						onPress: () => console.log('Borrar proyecto'),
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
		backgroundColor: '#1E2833'
	},
	header: {
		flexDirection: 'column',
		paddingHorizontal: 16,
		paddingTop: 16
	},
	chips: {
		marginVertical: 16
	},
	chip: {
		marginRight: 12,
		borderRadius: 24,
		backgroundColor: '#F5F7FA'
	},
	sectionsList: {
		paddingHorizontal: 16,
		height: '70%'
	}
});

ProjectDetail.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
};

export default ProjectDetail;
