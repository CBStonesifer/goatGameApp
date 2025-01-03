import { Stack } from "expo-router";
import Description from "./Description";
import HomeScreen from ".";

export default function RootLayout() {
  return <Stack>
    <Description/>
  </Stack>;
}
