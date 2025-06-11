import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { MapPin, User, Settings } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// Custom Tab Bar Icon component for Lucide icons
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// Custom Tab Bar Icon component for Lucide icons
function LucideTabBarIcon({ 
  Icon, 
  color, 
  size = 24 
}: { 
  Icon: React.ComponentType<any>; 
  color: string; 
  size?: number;
}) {
  return <Icon size={size} color={color} style={{ marginBottom: -3 }} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // ParkHive blue color
        tabBarInactiveTintColor: '#8E8E93',
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          borderTopColor: colorScheme === 'dark' ? '#333' : '#E5E5E7',
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <LucideTabBarIcon Icon={MapPin} color={color} />,
          headerTitle: 'ParkHive',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#F9F9FB',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
          headerRight: () => (
            <Link href="/permissions" asChild>
              <Pressable>
                {({ pressed }) => (
                  <Settings
                    size={24}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ 
                      marginRight: 15, 
                      opacity: pressed ? 0.5 : 1 
                    }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <LucideTabBarIcon Icon={User} color={color} />,
          headerTitle: 'Profile',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#F9F9FB',
          },
          headerTitleStyle: {
            fontWeight: '600',
            fontSize: 18,
          },
        }}
      />
    </Tabs>
  );
}