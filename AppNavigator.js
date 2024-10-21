import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import PeopleScreen from "./Screens/PeopleScreen";
import AddPeopleScreen from "./Screens/AddPersonScreen";
import AddIdeaScreen from "./Screens/AddIdeaScreen";
import IdeaScreen from "./Screens/IdeaScreen";

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="PeopleScreen" component={PeopleScreen} />
        <Stack.Screen name="AddPeopleScreen" component={AddPeopleScreen} />
        <Stack.Screen name="AddIdeaScreen" component={AddIdeaScreen} />
        <Stack.Screen name="IdeaScreen" component={IdeaScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
