import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Description" options={{ headerShown: false }} />
      <Stack.Screen name="Lobby" options={{ headerShown: false }} />
      <Stack.Screen name="Entries" options={{ headerShown: false }} />

    </Stack>);
}
