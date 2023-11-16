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
						<Chip mode="outlined" style={styles.chip} selectedColor="#5D84A6" selected onPress={() => console.log("Todo")}>Todo</Chip>
						<Chip mode="outlined" style={styles.chip} selectedColor="#5D84A6"  onPress={() => console.log("Secciones completas")}>Secciones completas</Chip>
						<Chip mode="outlined" style={styles.chip} selectedColor="#5D84A6"  onPress={() => console.log("Secciones vacías")}>Secciones vacías</Chip>
					</ScrollView>
				</View>
			</View>
			<View>
				<ScrollView style={styles.sectionsList}>
					<ListItem title="0+000" listId="0+000" isSection isComplete/>
					<ListItem title="0+020" listId="0+020" isSection isComplete/>
					<ListItem title="0+040" listId="0+040" isSection isComplete/>
					<ListItem title="0+080" listId="0+080" isSection isComplete/>
					<ListItem title="0+100" listId="0+100" isSection isComplete/>
					<ListItem title="0+120" listId="0+120" isSection/>
					<ListItem title="0+140" listId="0+140" isSection/>
					<ListItem title="0+160" listId="0+160" isSection/>
					<ListItem title="0+180" listId="0+180" isSection/>
					<ListItem title="0+200" listId="0+200" isSection/>
					<ListItem title="0+220" listId="0+220" isSection/>
					<ListItem title="0+240" listId="0+240" isSection/>
					<ListItem title="0+260" listId="0+260" isSection/>
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
		borderRadius: 24,
		backgroundColor: "#F5F7FA"
	},
	sectionsList:{
		paddingHorizontal: 16,
		height: "70%"
	}
});

export default ProjectDetail;
