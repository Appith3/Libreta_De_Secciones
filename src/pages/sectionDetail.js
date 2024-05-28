import { useEffect } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';
import { StatusBar } from 'expo-status-bar';
import { useStore } from '../store/useStore';
import Topbar from '../componets/Topbar';

const SectionDetail = ({ navigation }) => {

	const isLoading = useStore((state) => state.isLoading);

	const project = useStore((state) => state.project);
	const stationing = useStore((state) => state.stationing);
	const details = useStore((state) => state.details);
	const getSectionDetails = useStore((state) => state.getSectionDetails);
	const resetStationingStore = useStore((state) => state.resetStationingStore);
	
	useEffect(() => {
		navigation.setOptions({ title: `${stationing.stationing_name} ${stationing.code}` });
		getSectionDetails(project.id, stationing.id);
	}, []);

	const handleOnBackPress = () => {
		resetStationingStore();
		navigation.goBack();
	};

	const renderItem = ({ item }) => {
		return (
			<View style={styles.row} key={item.id}>
				<Text style={styles.cell}>{item.distance}</Text>
				<Text style={styles.cell}>{item.slope}</Text>
				<Text style={styles.cell}>{item.reading}</Text>
			</View>
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
			<Topbar title={`${stationing.stationing_name} ${stationing.code}`} hasBackAction onBack={handleOnBackPress}/>
			<View style={styles.main}>
				<Text variant='headlineSmall' style={styles.title}>Elevación central: {stationing.central_reading}</Text>
				<View style={styles.table}>
					<View style={styles.row}>
						<View style={[styles.headerCell, { borderTopLeftRadius: 8 }]}>
							<Text variant='titleSmall' style={styles.tableHeader}>Distancia</Text>
						</View>
						<View style={styles.headerCell}>
							<Text variant='titleSmall' style={styles.tableHeader}>Desnivel</Text>
						</View>
						<View style={[styles.headerCell, { borderTopEndRadius: 8 }]}>
							<Text variant='titleSmall' style={styles.tableHeader}>Lectura</Text>
						</View>
					</View>
					<FlatList
						data={details}
						renderItem={renderItem}
						keyExtractor={item => item.id}
					/>
				</View>
			</View>
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
		backgroundColor: '#1e2833',
	},
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		gap: 32,
		padding: 16
	},
	table: {
		borderColor: '#A8BED1',
		borderRadius: 8,
		borderWidth: 1
	},
	tableHeader: {
		color: '#F5F7FA',
		alignSelf: 'center',
		paddingHorizontal: 6,
		paddingVertical: 8
	},
	headerCell: {
		backgroundColor: '#5D84A6',
		width: '33.33%',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	cell: {
		borderColor: '#A8BED1',
		borderWidth: 1,
		width: '33.33%',
		textAlign: 'center',
		color: '#F5F7FA',
		fontSize: 16,
		paddingVertical: 8
	},
	title: {
		color: '#F5F7FA',
		alignSelf: 'center'
	}
});

SectionDetail.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object
};

export default SectionDetail;