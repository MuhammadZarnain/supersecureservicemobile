import { Stack } from 'expo-router';
import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { UserProvider } from '../context/UserContext'; // 👈 import context

export default function RootLayout() {
  const colorScheme = useColorScheme() ?? 'light';
  const router = useRouter();

  useEffect(() => {
    router.push('/SplashScreen'); // 🔁 Start with splash screen
  }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <UserProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack screenOptions={{ headerShown: false }} />
          <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
        </ThemeProvider>
      </UserProvider>
    </GestureHandlerRootView>
  );
}
