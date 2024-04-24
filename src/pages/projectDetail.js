import { useEffect, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Chip, TextInput, FAB, ActivityIndicator } from 'react-native-paper';
import SectionItem from '../componets/SectionItem';
import PropTypes from 'prop-types';
import { useStore } from '../store/useStore';

const ProjectDetail = ({ navigation }) => {
	// FIXME: Go Home on projectDetail after create project
	/* 
		At the moment after create project, the screen change to project Detail the problem is when want to go back the screen change to create Project Form instead of that change to homePage
	*/

	const [openFAB, setOpenFAB] = useState({ open: false });
	const [searchText, setSearchText] = useState('');

	const isLoading = useStore((state) => state.isLoading);
	const project = useStore((state) => state.project);
	const getStationingFromFirestore = useStore((state) => state.getStationingFromFirestore);
	const stations = useStore((state) => state.stations);

	useEffect(() => {
		navigation.setOptions({ title: project.project_name });
	}, []);

	useEffect(() => {getStationingFromFirestore(project.id);}, [stations]);

	const onStateChange = () => {
		openFAB.open ? setOpenFAB({ open: false }) : setOpenFAB({ open: true });
	};

	const renderItem = ({item}) => {
		return (
			<SectionItem 
				stationingName={item.stationing_name}
				stationingId={item.id}
				isComplete={item.is_complete}
				centralReading={item.central_reading}
				code={item.code}
			/>
		);
	};

	// TODO: add popup confirmation to delete
	if(isLoading) {
		// TODO: add gif/image to loading state
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size={'large'}/>
			</View>
		);
	}

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
				<FlatList
					style={styles.sectionsList}
					data={stations}
					renderItem={renderItem}
					keyExtractor={item => item.id}
				/>
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
						label: 'Nueva sección',
						labelTextColor: '#F5F7FA',
						color: '#F5F7FA',
						style: { backgroundColor: '#799AB7', borderRadius: 32 },
						onPress: () => navigation.navigate('captureCentral', {firestorePath: `example_projects/${project.id}/stationing`}),
					},
					{
						icon: 'upload',
						label: 'Exportar proyecto',
						labelTextColor: '#F5F7FA',
						color: '#F5F7FA',
						style: { backgroundColor: '#799AB7', borderRadius: 32 },
						onPress: () => navigation.navigate('exportProject'),
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
