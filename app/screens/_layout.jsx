import { Stack } from "expo-router";
import GameContextProvider from "../../context/GameContext";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="Description" options={{ headerShown: false }} />
      <Stack.Screen name="Lobby" options={{ headerShown: false }} />
    </Stack>);
}
