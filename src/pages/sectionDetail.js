import { useEffect } from 'react';
import { StyleSheet, View  } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';

const SectionDetail = ({ route, navigation }) => {

	const {
		name,
		central_reading,
		details,
		code
	} = route.params.stationing;

	useEffect(() => {
		navigation.setOptions({ title: `${name} ${code}` });
	}, []);

	return (
		<View style={styles.container}>
			<View style={styles.main}>
				<Text variant='headlineSmall' style={styles.title}>Elevación central: {central_reading}</Text>
				{/* Start table code */}
				<View style={styles.table}>
					<View style={styles.row}>
						<View style={[styles.headerCell, { borderTopLeftRadius: 8}]}>
							<Text variant='titleSmall' style={styles.tableHeader}>Distancia</Text>
						</View>
						<View style={styles.headerCell}>
							<Text variant='titleSmall' style={styles.tableHeader}>Desnivel</Text>
						</View>
						<View style={[styles.headerCell, { borderTopEndRadius: 8}]}>
							<Text variant='titleSmall' style={styles.tableHeader}>Lectura</Text>
						</View>
					</View>
					{/* Note: think about to add a ScrollView */}
					{
						details.map((detail) => {
							return (
								<View style={styles.row} key={detail._id}>
									<Text style={styles.cell}>{detail.distance}</Text>
									<Text style={styles.cell}>{detail.slope}</Text>
									<Text style={styles.cell}>{detail.reading}</Text>
								</View>
							);
						})
					}
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
		color: '#F5F7FA'
	}
});

SectionDetail.propTypes = {
	navigation: PropTypes.object,
	route: PropTypes.object	
};

export default SectionDetail;