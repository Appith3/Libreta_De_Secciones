import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Appbar, Chip, TextInput,  Portal, FAB } from "react-native-paper"
import ListItem from "../componets/ListItem";

const ProjectDetail = () => {

	const [searchText, setSearchText] = useState("");

	const [state, setState] = useState({ open: false });

	const onStateChange = ({ open }) => setState({ open });

	const { open } = state;

	return (
		<View style={styles.container}>
			<Appbar.Header elevated style={{ backgroundColor: '#38526c' }}>
				<Appbar.BackAction onPress={() => { console.log('back') }} color="#F5F7FA" />
				<Appbar.Content title="Proyectos" color='#F5F7FA' />
			</Appbar.Header>
			<View style={styles.header}>
				<TextInput
					placeholder="Buscar sección"
					value={searchText}
					onChangeText={searchText => setSearchText(searchText)}
					mode="outlined"
				/>
				<View style={styles.chips}>
					<ScrollView horizontal>
						<Chip mode="outlined" style={styles.chip} onPress={() => console.log("Todo")}>Todo</Chip>
						<Chip mode="outlined" style={styles.chip} onPress={() => console.log("Secciones completas")}>Secciones completas</Chip>
						<Chip mode="outlined" style={styles.chip} onPress={() => console.log("Secciones vacías")}>Secciones vacías</Chip>
					</ScrollView>
				</View>
			</View>
			<View>
				<ScrollView style={styles.sectionsList}>
					<ListItem title="0+000" />
					<ListItem title="0+020" />
					<ListItem title="0+040" />
					<ListItem title="0+080" />
					<ListItem title="0+100" />
					<ListItem title="0+120" />
					<ListItem title="0+140" />
					<ListItem title="0+160" />
					<ListItem title="0+180" />
					<ListItem title="0+200" />
					<ListItem title="0+220" />
					<ListItem title="0+240" />
					<ListItem title="0+260" />
				</ScrollView>
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
							label: 'Nueva sección',
							labelTextColor: '#F5F7FA',
							color: '#F5F7FA',
							style: {backgroundColor: "#799AB7", borderRadius: 32},
							onPress: () => console.log('Nueva sección'),
						},
						{
							icon: 'upload',
							label: 'Exportar proyecto',
							labelTextColor: '#F5F7FA',
							color: '#F5F7FA',
							style: {backgroundColor: "#799AB7", borderRadius: 32},
							onPress: () => console.log('Exportar proyecto'),
						},
						{
							icon: 'delete',
							label: 'Borrar proyecto',
							labelTextColor: '#F5F7FA',
							color: '#F5F7FA',
							style: {backgroundColor: "#E54343", borderRadius: 32},
							onPress: () => console.log('Borrar proyecto'),
						},
					]}
					onStateChange={onStateChange}
				/>
			</Portal>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E2833'
	},
	header: {
		flexDirection: "column",
		paddingHorizontal: 16,
		paddingTop: 16
	},
	chips: {
		marginVertical: 16
	},
	chip: {
		marginRight: 12,
	},
	sectionsList:{
		paddingHorizontal: 16,
		height: "70%"
	}
});

export default ProjectDetail;
