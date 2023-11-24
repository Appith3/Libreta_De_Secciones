import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import HomePage from './src/pages/homePage';
import ProjectDetail from './src/pages/projectDetail';
import CreateProjectForm from './src/pages/createProjectForm';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
          headerTintColor: '#F5F7FA',
          headerTitleStyle: {
            fontFamily: 'sans-serif',
            fontWeight: '400',
            fontSize: '200'
          }
        }}
        >
          <Stack.Screen 
          name="HomePage" 
          component={HomePage} 
          options={{title: 'Proyectos'}}
          />
          <Stack.Screen name="ProjectDetail" component={ProjectDetail} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
