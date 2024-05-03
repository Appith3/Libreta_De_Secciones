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
				>
					<Stack.Screen
						name='homePage'
						component={HomePage}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name='projectDetail'
						component={ProjectDetail}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name='createProject'
						component={CreateProjectForm}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name='captureSectionCentral'
						component={CaptureSection}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name='captureNewSectionCentral'
						component={CaptureNewSection}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name='captureSectionSides'
						component={CaptureSectionSides}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name='sectionDetail'
						component={SectionDetail}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name='importProject'
						component={ImportProject}
						options={{headerShown: false}}
					/>
					<Stack.Screen
						name='exportProject'
						component={ExportProject}
						options={{headerShown: false}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</PaperProvider>
	);
}
