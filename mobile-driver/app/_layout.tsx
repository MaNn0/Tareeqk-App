import { Stack } from 'expo-router';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="login" options={{ headerShown: true, title: 'Login' }} />
      <Stack.Screen name="register" options={{ headerShown: true, title: 'Register' }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Slot />
    </Stack>
  );
}