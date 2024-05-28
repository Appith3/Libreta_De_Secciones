import { StyleSheet } from 'react-native';
import { List, IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

import { useStore } from '../store/useStore';

const ProjectItem = (props) => {

	const {
		projectName,
		projectId
	} = props;

	const navigation = useNavigation();

	const setCurrentProject = useStore((state) => state.setCurrentProject);
	const resetLoading = useStore((state) => state.resetLoading);

	return (
		<List.Item
			title={projectName}
			right={
				<IconButton
					icon='share'
					iconColor='#F5F7FA'
					onPress={() => navigation.navigate('exportProject', { projectName, projectId })} 
				/>
			}
			style={styles.listItem}
			titleStyle={{ color: '#F5F7FA' }}
			onPress={() => {
				resetLoading();
				setCurrentProject({ projectId, projectName });
				navigation.navigate('projectDetail');
			}}
		/>
	);
};

const styles = StyleSheet.create({
	listItem: {
		backgroundColor: '#446585',
		borderRadius: 4,
		marginVertical: 8
	}
});

ProjectItem.propTypes = {
	projectName: PropTypes.string,
	projectId: PropTypes.string
};

export default ProjectItem;