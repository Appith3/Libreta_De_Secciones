import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, ActivityIndicator } from 'react-native-paper';
import PropTypes from 'prop-types';
import { db } from '../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const SectionDetail = ({ route, navigation }) => {

	const {
		firestorePath,
		centralReading,
		code,
		stationingName
	} = route.params;

	useEffect(() => {
		navigation.setOptions({ title: `${stationingName} ${code}` });
		getStationingDetailsCollection();
	}, []);

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState();
	const [docs, setDocs] = useState();

	const getStationingDetailsCollection = async () => {
		try {
			const detailsColRef = collection(db, firestorePath);
			const detailsDocs = await getDocs(detailsColRef);

			const roadStationingDetail = detailsDocs.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			console.log('details: ', roadStationingDetail);
			setDocs(roadStationingDetail);
			setLoading(false);
		} catch (error) {
			setError(error);
			setLoading(false);
		}
	};

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text variant='headlineSmall' style={styles.title}>Elevación central: {centralReading}</Text>
				{/* Start table code */}
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
					{/* Note: think about to add a ScrollView */}
					{loading && (<ActivityIndicator size={'large'} animating={true} />)}
					{
						docs?.map((detail) => {
							return (
								<View style={styles.row} key={detail.id}>
									<Text style={styles.cell}>{detail.distance}</Text>
									<Text style={styles.cell}>{detail.slope}</Text>
									<Text style={styles.cell}>{detail.reading}</Text>
								</View>
							);
						})
					}
					{error && <Text variant='bodyLarge' style={{ color: '#F5F7FA' }}>{error}</Text>}
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1e2833',
		padding: 16
	},
	main: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'flex-start',
		gap: 32,
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