import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import HomePage from './src/pages/homePage';
import ProjectDetail from './src/pages/projectDetail';
import CreateProjectForm from './src/pages/createProjectForm';
import CaptureSection from './src/pages/captureSection';
import CaptureNewSection from './src/pages/captureNewSection';
import CaptureSectionSides from './src/pages/captureSectionSides';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SectionDetail from './src/pages/sectionDetail';
import ImportProject from './src/pages/importProject';
import ExportProject from './src/pages/exportProject';

const theme = {
	...DefaultTheme,
	colors: {
		...DefaultTheme.colors,
		primary: '#5d84a6',
	}
};

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<PaperProvider theme={theme}>
			<NavigationContainer>
				<Stack.Navigator
					initialRouteName='HomePage'
					screenOptions={{
						headerStyle: {
							backgroundColor: '#38526c'
						},
						headerTintColor: '#F5F7FA'
					}}
				>
					<Stack.Screen
						name='homePage'
						component={HomePage}
						options={{ title: 'Proyectos' }}
					/>
					<Stack.Screen
						name='projectDetail'
						component={ProjectDetail}
					/>
					<Stack.Screen
						name='createProject'
						component={CreateProjectForm}
						options={{ title: 'Crear Proyecto' }}
					/>
					<Stack.Screen
						name='captureSectionCentral'
						component={CaptureSection}
					/>
					<Stack.Screen
						name='captureNewSectionCentral'
						component={CaptureNewSection}
					/>
					<Stack.Screen
						name='captureSectionSides'
						component={CaptureSectionSides}
					/>
					<Stack.Screen
						name='sectionDetail'
						component={SectionDetail}
					/>
					<Stack.Screen
						name='importProject'
						component={ImportProject}
						options={{ title: 'Importar proyecto' }}
					/>
					<Stack.Screen
						name='exportProject'
						component={ExportProject}
						options={{ title: 'Exportar proyecto' }}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
