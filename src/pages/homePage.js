import { useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { FAB, TextInput, Text, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';
import ProjectItem from '../componets/ProjectItem';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const HomePage = ({ navigation }) => {

	const [openFAB, setOpenFAB] = useState({ open: false });
	const [searchText, setSearchText] = useState();

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [docs, setDocs] = useState();

	const getProjectsCollection = async () => {
		try {
			const projectsColRef = collection(db, 'example_projects');
			const projectDocs = await getDocs(projectsColRef);

			const projects = projectDocs.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setDocs(projects);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	useEffect(() => {
		getProjectsCollection();
	}, []);

	const onStateChange = () => {
		openFAB.open ? setOpenFAB({ open: false }) : setOpenFAB({ open: true });
	};

	// TODO: change ScrollView to FlatList
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
				{/* TODO: Create empty state screen */}
				<ScrollView>
					{loading && (<ActivityIndicator size={'large'} animating={true} />)}
					{
						docs?.map((doc) => {
							return (
								<ProjectItem title={doc.name} key={doc.id} projectId={doc.id} />
							);
						})
					}
					{error && <Text variant='bodyLarge' style={{ color: '#F5F7FA' }}>{error}</Text>}
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
