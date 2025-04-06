import {Stack} from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { ThemeProvider } from "../context/ThemeContext";

export default function RootLayotu()
{
  return(
    <ThemeProvider>
    <SafeAreaProvider>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index"/>
        <Stack.Screen name="todos/"/> 
        
      </Stack>
    </SafeAreaProvider>
    </ThemeProvider>
  )

  // / -> dynamic routing
}