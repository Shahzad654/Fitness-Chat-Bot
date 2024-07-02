import React from "react";
import Splash from "./screens/Splash";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Chat from "./screens/Chat";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="splash">
          <Stack.Screen
            name="splash"
            component={Splash}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="chat"
            component={Chat}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}


