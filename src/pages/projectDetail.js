import { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Chip, TextInput, FAB, Text, ActivityIndicator } from 'react-native-paper';
import SectionItem from '../componets/SectionItem';
import PropTypes from 'prop-types';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const ProjectDetail = ({ navigation, route }) => {
	// FIXME: Go Home on projectDetail after create project
	/* 
		At the moment after create project, the screen change to project Detail the problem is when want to go back the screen change to create Project Form instead of that change to homePage
	*/

	const {
		projectTitle,
		projectId,
		firestorePath
	} = route.params;

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [docs, setDocs] = useState();

	const getStationingCollection = async () => {
		try {
			const stationingColRef = collection(db, firestorePath);
			const stationingDocs = await getDocs(stationingColRef);

			const roadStationing = stationingDocs.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setDocs(roadStationing);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	const [openFAB, setOpenFAB] = useState({ open: false });
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		navigation.setOptions({ title: projectTitle });
		getStationingCollection();
	}, []);

	const onStateChange = () => {
		openFAB.open ? setOpenFAB({ open: false }) : setOpenFAB({ open: true });
	};

	//TODO: get data ordered by name

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
					{loading && (<ActivityIndicator size={'large'} animating={true} />)}
					{
						docs?.map((stationing) => {
							let { central_reading, code, id, is_complete, stationing_name } = stationing;

							return is_complete
								? <SectionItem stationingName={stationing_name} stationingId={id} key={id} rest={[central_reading, code, projectId]} isComplete />
								: <SectionItem stationingName={stationing_name} stationingId={id} key={id} rest={[central_reading, code, projectId]} />;
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
