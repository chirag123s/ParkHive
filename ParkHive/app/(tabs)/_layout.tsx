import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { Home, MapPin, MessageSquare, User, Settings } from 'lucide-react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

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
        tabBarActiveTintColor: '#0c7ff2', // ParkHive primary blue
        tabBarInactiveTintColor: '#60758a', // Secondary text color
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          borderTopColor: colorScheme === 'dark' ? '#333' : '#f0f2f5',
          borderTopWidth: 1,
          paddingTop: 4,
          paddingBottom: 4,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        headerShown: useClientOnlyValue(false, true),
      }}>
      
      {/* Home Tab */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <LucideTabBarIcon Icon={Home} color={color} />,
          headerTitle: 'ParkHive',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
          headerTitleStyle: {
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

      {/* Map/Find Tab */}
      <Tabs.Screen
        name="map"
        options={{
          title: 'Find',
          tabBarIcon: ({ color }) => <LucideTabBarIcon Icon={MapPin} color={color} />,
          headerShown: false, // Map screen has its own header
        }}
      />

      {/* Report Tab */}
      <Tabs.Screen
        name="report"
        options={{
          title: 'Report',
          tabBarIcon: ({ color }) => <LucideTabBarIcon Icon={MessageSquare} color={color} />,
          headerShown: false, // Report screen has its own header
        }}
      />

      {/* Profile Tab */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <LucideTabBarIcon Icon={User} color={color} />,
          headerTitle: 'Profile',
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
          headerTitleStyle: {
            fontWeight: '700',
            fontSize: 20,
            color: '#111418',
          },
        }}
      />
    </Tabs>
  );
}