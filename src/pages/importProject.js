import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

const ImportProject = () => {
	return (
		<View style={styles.container}>
			<Text>Importar Proyecto</Text>
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

export default ImportProject;