import * as React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Appbar, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_APPBAR_HEIGHT = 80;

const MyComponent = () => {
	const { bottom } = useSafeAreaInsets();

	const navigation = useNavigation();

	return (
		<Appbar
			style={[
				styles.bottom,
				{
					height: BOTTOM_APPBAR_HEIGHT + bottom,
					backgroundColor: '#38526c',
				},
			]}
			safeAreaInsets={{ bottom }}
		>
			{/* FIXME: enviar currentSide como prop */}
			<TouchableOpacity onPress={() => { navigation.navigate('captureSectionSides'); }} style={styles.tab}>
				<Appbar.Action icon="note-edit" color='#F5F7FA' />
				<Text type='info' style={{color: '#F5F7FA'}} variant='bodyLarge'>capturar detalles</Text>
			</TouchableOpacity>
			{/* TODO: revisar si muestra la data existente */}
			<TouchableOpacity onPress={() => { navigation.navigate('sectionDetail'); }} style={styles.tab}>
				<Appbar.Action icon="chart-line" color='#F5F7FA' />
				<Text type='info' style={{color: '#F5F7FA'}} variant='bodyLarge'>Ver sección</Text>
			</TouchableOpacity>
		</Appbar>
	);
};

const styles = StyleSheet.create({
	bottom: {
		justifyContent: 'space-around'
	},
	tab: {
		justifyContent:'center',
		alignItems: 'center',
	}
});

export default MyComponent;