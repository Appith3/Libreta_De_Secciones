import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { FAB, TextInput, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';
import ProjectItem from '../componets/ProjectItem';
import { useStore } from '../store/useStore';
import { StatusBar } from 'expo-status-bar';

const HomePage = ({ navigation }) => {

	// TODO: Clean all store

	const [openFAB, setOpenFAB] = useState({ open: false });
	const [searchText, setSearchText] = useState();

	const isLoading = useStore((state) => state.isLoading);
	const getProjectsFromFirestore = useStore((state) => state.getProjectsFromFirestore);
	const projects = useStore((state) => state.projects);
	
	useEffect(() => {
		getProjectsFromFirestore();
	}, []);

	const onStateChange = () => {
		openFAB.open ? setOpenFAB({ open: false }) : setOpenFAB({ open: true });
	};

	const renderItem = ({item}) => {
		return (
			<ProjectItem 
				projectName={item.name} 
				projectId={item.id} />
		);
	};

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
			<View style={styles.main}>
				<TextInput
					style={styles.searchInput}
					mode='outlined'
					placeholder='Buscar proyecto'
					value={searchText}
					onChangeText={searchText => setSearchText(searchText)}
					right={<TextInput.Icon icon='magnify' />} />
				<FlatList
					data={projects}
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
	loadingContainer: {
		flex: 1,
		backgroundColor: '#1e2833',
		paddingTop: StatusBar.currentHeight,
		justifyContent: 'center',
		alignItems: 'center'
	},
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
