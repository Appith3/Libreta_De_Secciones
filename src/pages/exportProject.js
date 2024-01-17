import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';
import PropTypes from 'prop-types';

const ExportProject = ({ route }) => {

	const { project } = route.params;

	return (
		<View style={styles.container}>
			<Text>Exportar Proyecto</Text>
			<Text>{project.name}</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		gap: 32
	}
});

ExportProject.propTypes = {
	route: PropTypes.object	
};

export default ExportProject;