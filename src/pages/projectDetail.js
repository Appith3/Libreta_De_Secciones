import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { FAB, ActivityIndicator, SegmentedButtons, Text } from 'react-native-paper';
import SectionItem from '../componets/SectionItem';
import PropTypes from 'prop-types';
import { useStore } from '../store/useStore';
import { StatusBar } from 'expo-status-bar';
import Topbar from '../componets/Topbar';

const ProjectDetail = ({ navigation }) => {

	const [refreshing, setRefreshing] = useState(false);
	const [openFAB, setOpenFAB] = useState({ open: false });
	const [filterValue, setFilterValue] = useState('all');

	const isLoading = useStore((state) => state.isLoading);
	const project = useStore((state) => state.project);
	const getStationingFromFirestore = useStore((state) => state.getStationingFromFirestore);
	const stations = useStore((state) => state.stations);
	const resetProjectStore = useStore((state) => state.resetProjectStore);

	const { project_name, id } = project;

	const handleOnBackPress = () => {
		resetProjectStore();
		navigation.popToTop();
	};

	useEffect(() => {
		getStationingFromFirestore(id);
	}, []);

	const filterStations = (stations) => {
		return stations.filter((station) => {
			switch (filterValue) {
			case 'all':
				return true; // Show all stations
			case 'done':
				return station.is_complete; // Show only stations marked as complete
			case 'todo':
				return !station.is_complete; // Show only stations not marked as complete
			default:
				return true; // Default to showing all stations if filterValue is unexpected
			}
		});
	};

	const onStateChange = () => {
		openFAB.open ? setOpenFAB({ open: false }) : setOpenFAB({ open: true });
	};

	const handleRefresh = () => {
		setRefreshing(true);
		getStationingFromFirestore(id);
		setRefreshing(false);
	};

	const renderItem = ({ item }) => {
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

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<Topbar title={project_name} hasBackAction onBack={handleOnBackPress} />
			<View style={styles.header}>
				<View style={styles.filter}>
					<Text variant='labelLarge' style={styles.filterText}>Mostrar secciones</Text>
					<SegmentedButtons
						value={filterValue}
						onValueChange={setFilterValue}
						buttons={[
							{
								value: 'all',
								label: 'Todas',
								uncheckedColor: '#F5F7FA'
							},
							{
								value: 'done',
								label: 'Completas',
								uncheckedColor: '#F5F7FA'
							},
							{
								value: 'todo',
								label: 'Vacías',
								uncheckedColor: '#F5F7FA'
							},
						]}
					/>
				</View>
			</View>
			<View>
				<FlatList
					style={styles.sectionsList}
					data={filterStations(stations)}
					renderItem={renderItem}
					keyExtractor={item => item.id}
					refreshing={refreshing}
					onRefresh={handleRefresh}
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
						onPress: () => navigation.navigate('captureNewSectionCentral'),
					},
					{
						icon: 'upload',
						label: 'Exportar proyecto',
						labelTextColor: '#F5F7FA',
						color: '#F5F7FA',
						style: { backgroundColor: '#799AB7', borderRadius: 32 },
						onPress: () => navigation.navigate('exportProject', { projectId: id, projectName: project_name }),
					},
				]}
				onStateChange={onStateChange}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	loadingContainer: {
		flex: 1,
		backgroundColor: '#1e2833',
		paddingTop: StatusBar.currentHeight,
		justifyContent: 'center',
		alignItems: 'center'
	},
	container: {
		flex: 1,
		backgroundColor: '#1E2833'
	},
	header: {
		flexDirection: 'column',
		paddingHorizontal: 16,
		paddingTop: 16
	},
	filter: {
		marginBottom: 16,
	},
	filterText: {
		marginBottom: 4,
		color: '#F5F7FA'
	},
	sectionsList: {
		marginHorizontal: 16,
		marginBottom: 200
	}
});

ProjectDetail.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
};

export default ProjectDetail;
