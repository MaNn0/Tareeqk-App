import { Stack } from 'expo-router';
import { Slot } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Logout" options={{ headerShown: true }} />
      <Slot />
    </Stack>
  );
}