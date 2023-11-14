import React, { useState } from "react";
import { ScrollView, StyleSheet, View, Text } from "react-native";
import { Appbar, Chip, TextInput } from "react-native-paper"
import ListItem from "../componets/ListItem";

const ProjectDetail = () => {

	const [searchText, setSearchText] = useState("");

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
				{/* TODO: //! Fix hide chips, horizontal scroll and height */}
				<ScrollView style={styles.chips} horizontal>
					<Chip mode="outlined" style={styles.chip} onPress={() => console.log("Todo")}>Todo</Chip>
					<Chip mode="outlined" style={styles.chip} onPress={() => console.log("Secciones completas")}>Secciones completas</Chip>
					<Chip mode="outlined" style={styles.chip} onPress={() => console.log("Secciones vacías")}>Secciones vacías</Chip>
				</ScrollView>

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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#1E2833'
	},
	header: {
		flex: 1,
		flexDirection: "column",
		padding: 16
	},
	chips: {
		flex: 1,
		backgroundColor: "#fff",
		marginVertical: 16
	},
	chip: {
		marginRight: 12,
	}
});

export default ProjectDetail;
