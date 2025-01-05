import { Stack } from "expo-router";
import GameContextProvider from '../context/GameContext';

export default function RootLayout() {
  return (
  <GameContextProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="Description" options={{ headerShown: false }} />
    </Stack>
  </GameContextProvider>);
}
