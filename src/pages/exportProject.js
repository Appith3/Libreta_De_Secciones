import { StyleSheet, View } from 'react-native';
import { Button, Checkbox, Text } from 'react-native-paper';
import PropTypes from 'prop-types';
import Topbar from '../componets/Topbar';
import { useStore } from '../store/useStore';
import { useState } from 'react';

const ExportProject = ({ navigation, route }) => {

	const { projectName, projectId } = route.params;

	const [excelChecked, setExcelChecked] = useState(false);
	const [txtChecked, setTxtChecked] = useState(false);

	const handleOnBackPress = () => {
		navigation.goBack();
	};

	return (
		<View style={styles.container}>
			<Topbar title={projectName} hasBackAction onBack={handleOnBackPress} />
			<View style={styles.main}>
				<Text variant='headlineSmall' style={{ color: '#F5F7FA' }}>Exportar en formato: </Text>
				<View style={styles.checkboxWrapper}>
					<View style={styles.checkbox}>
						<Checkbox
							status={excelChecked ? 'checked' : 'unchecked'}
							onPress={() => {
								setExcelChecked(!excelChecked);
							}}
						/>
						<Text variant='labelLarge' style={styles.checkboxText}>{projectName}.xlsx</Text>
					</View>
					<View style={styles.checkbox}>
						<Checkbox
							status={txtChecked ? 'checked' : 'unchecked'}
							onPress={() => {
								setTxtChecked(!txtChecked);
							}}
						/>
						<Text variant='labelLarge' style={styles.checkboxText}>{projectName}.txt</Text>
					</View>
				</View>
				<View style={styles.controls}>
					<Button icon="export" mode="contained" onPress={() => console.log('Pressed')}>
						Exportar proyecto
					</Button>
				</View>
			</View>
		</View >
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E2833',
	},
	main: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 32,
	},
	checkboxWrapper: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		height: 40,
		marginVertical: 32
	},
	checkbox: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
	},
	checkboxText: {
		color: '#F5F7FA'
	},
	controls: {
		gap: 8
	}
});

ExportProject.propTypes = {
	route: PropTypes.object,
	navigation: PropTypes.object
};

export default ExportProject;