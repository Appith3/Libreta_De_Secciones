import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { Appbar, List, IconButton, FAB, Portal } from 'react-native-paper';
import ListItem from '../componets/ListItem';

const HomePage = () => {

	const [state, setState] = React.useState({ open: false });

	const onStateChange = ({ open }) => setState({ open });

	const { open } = state;


	return (
		<View style={styles.container}>
			<Appbar.Header elevated style={{ backgroundColor: '#38526c' }}>
				<Appbar.Content title="Proyectos" color='#F5F7FA' />
			</Appbar.Header>
			<View style={styles.main}>
				<ListItem projectTitle={"Proyecto 1"} listId={1}/>
				<ListItem projectTitle={"Proyecto 2"} listId={2}/>
			</View>
			<Portal>
				<FAB.Group
					open={open}
					visible
					icon={open ? 'close' : 'plus'}
					backdropColor='#fff0'
					color='#F5F7FA'
					fabStyle={{backgroundColor: "#446585", borderRadius: 32}}
					style={{marginBottom: 46}}
					actions={[
						{
							icon: 'plus',
							label: 'Crear proyecto',
							labelTextColor: '#F5F7FA',
							color: '#F5F7FA',
							style: {backgroundColor: "#799AB7", borderRadius: 32},
							onPress: () => console.log('Crear proyecto'),
						},
						{
							icon: 'upload',
							label: 'Importar proyecto',
							labelTextColor: '#F5F7FA',
							color: '#F5F7FA',
							style: {backgroundColor: "#799AB7", borderRadius: 32},
							onPress: () => console.log('Importar proyecto'),
						},
					]}
					onStateChange={onStateChange}
				/>
			</Portal>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1e2833',
	},
	main: {
		flex: 1,
		flexDirection: "column",
		rowGap: 8,
		padding: 16
	},
});

export default HomePage;
