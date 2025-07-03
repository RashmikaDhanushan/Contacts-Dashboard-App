import Ionicons from '@expo/vector-icons/Ionicons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import ContactDetailScreen from './screens/ContactDetailScreen';
import ContactsListScreen from './screens/ContactsListScreen';
import FavoritesScreen from './screens/FavoritesScreen';
import StatsScreen from './screens/StatsScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function ContactsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ContactsList"
        component={ContactsListScreen}
        options={{ title: 'Contacts', headerShown: false }}
      />
      <Stack.Screen
        name="ContactDetail"
        component={ContactDetailScreen}
        options={{ title: 'Contact Detail' }}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'ellipse'; // default icon
          if (route.name === 'Contacts') {
            iconName = 'people-outline';
          } else if (route.name === 'Favorites') {
            iconName = 'star-outline';
          } else if (route.name === 'Stats') {
            iconName = 'stats-chart-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Contacts" component={ContactsStack} options={{ headerShown: false }} />
      <Tab.Screen name="Favorites" component={FavoritesScreen} />
      <Tab.Screen name="Stats" component={StatsScreen} />
    </Tab.Navigator>
  );
}


