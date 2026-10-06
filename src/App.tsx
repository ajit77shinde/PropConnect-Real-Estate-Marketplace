import { CssBaseline, ThemeProvider } from '@mui/material';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { store } from './app/store';
import { theme } from './theme';
import AppRoutes from './app/routes';

export default function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider maxSnack={3} autoHideDuration={3000}>
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  );
}
