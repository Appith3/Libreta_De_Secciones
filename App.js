import { MD3LightTheme as DefaultTheme, PaperProvider } from 'react-native-paper';
import HomePage from './src/pages/homePage';
import ProjectDetail from './src/pages/projectDetail';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#5d84a6',
  }
};

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <ProjectDetail/>
    </PaperProvider>
  );
}
