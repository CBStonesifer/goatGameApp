import { Stack } from "expo-router";
import Description from "./Description";

export default function RootLayout() {
  return (
  <Stack>
    <Stack.Screen name="index" options={{ headerShown: false }} />
    <Stack.Screen name="Description" options={{ headerShown: false }} />
  </Stack>);
}
