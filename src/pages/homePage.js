import { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { AnimatedFAB, TextInput, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';
import ProjectItem from '../componets/ProjectItem';
import { useStore } from '../store/useStore';
import { StatusBar } from 'expo-status-bar';
import Topbar from '../componets/Topbar';

const HomePage = ({ navigation }) => {


	const [isExtended, setIsExtended] = useState(true);
	const [searchText, setSearchText] = useState();

	const isLoading = useStore((state) => state.isLoading);
	const getProjectsFromFirestore = useStore((state) => state.getProjectsFromFirestore);
	const projects = useStore((state) => state.projects);

	useEffect(() => {
		getProjectsFromFirestore();
	}, []);

	const filterProjects = (searchText) => {
		if (!searchText) {
			return projects;
		}

		return projects.filter((project) =>
			project.name.toLowerCase().includes(searchText.toLowerCase())
		);
	};

	const onScroll = ({ nativeEvent }) => {
		const currentScrollPosition =
			Math.floor(nativeEvent?.contentOffset?.y) ?? 0;

		setIsExtended(currentScrollPosition <= 0);
	};

	const renderItem = ({ item }) => {
		return (
			<ProjectItem
				projectName={item.name}
				projectId={item.id} />
		);
	};

	if (isLoading) {
		// TODO: add gif/image to loading state
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size={'large'} />
			</View>
		);
	}

	// TODO: Add FAB.Group instead of AnimatedFAB
	return (
		<View style={styles.container}>
			<Topbar title='Proyectos' />
			<View style={styles.main}>
				<TextInput
					style={styles.searchInput}
					mode='outlined'
					placeholder='Buscar proyecto'
					value={searchText}
					onChangeText={searchText => setSearchText(searchText)}
					right={<TextInput.Icon icon='magnify' />} />
				<FlatList
					data={filterProjects(searchText)}
					renderItem={renderItem}
					keyExtractor={item => item.id}
					onScroll={onScroll}
				/>
				<AnimatedFAB
					icon={'plus'}
					label={'Crear proyecto'}
					extended={isExtended}
					onPress={() => navigation.navigate('createProject')}
					animateFrom={'right'}
					iconMode={'static'}
					style={styles.fabStyle}
				/>
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
		backgroundColor: '#1e2833'
	},
	main: {
		flex: 1,
		flexDirection: 'column',
		padding: 16
	},
	searchInput: {
		marginVertical: 8
	},
	fabStyle: {
		bottom: 16,
		right: 16,
		position: 'absolute',
	},
});

HomePage.propTypes = {
	navigation: PropTypes.object
};

export default HomePage;
