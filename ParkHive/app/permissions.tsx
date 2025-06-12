import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Switch, View, Alert } from 'react-native';
import { ChevronLeft, MapPin, Camera, Bell, Shapes } from 'lucide-react-native';
import { router } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Pressable } from '@/components/ui/pressable';

export default function PermissionsScreen() {
  const [locationEnabled, setLocationEnabled] = useState(true);
  const [cameraEnabled, setCameraEnabled] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const permissions = [
    {
      id: 'location',
      icon: MapPin,
      title: 'Location Access',
      description: 'Find nearby spots and navigate easily.',
      enabled: locationEnabled,
      onToggle: setLocationEnabled,
      iconBg: 'bg-blue-100',
      iconColor: '#007AFF',
    },
    {
      id: 'camera',
      icon: Camera,
      title: 'Camera Access',
      description: 'Report parking and share spot photos.',
      enabled: cameraEnabled,
      onToggle: setCameraEnabled,
      iconBg: 'bg-blue-100',
      iconColor: '#007AFF',
    },
    {
      id: 'notifications',
      icon: Bell,
      title: 'Notifications',
      description: 'Stay updated on availability and alerts.',
      enabled: notificationsEnabled,
      onToggle: setNotificationsEnabled,
      iconBg: 'bg-blue-100',
      iconColor: '#007AFF',
    },
  ];

  const handleContinue = () => {
    // Show confirmation of permissions
    Alert.alert(
      'Permissions Configured',
      `Location: ${locationEnabled ? 'Enabled' : 'Disabled'}\nCamera: ${cameraEnabled ? 'Enabled' : 'Disabled'}\nNotifications: ${notificationsEnabled ? 'Enabled' : 'Disabled'}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // Navigate to authentication screen
            router.replace('/auth');
          },
        },
      ]
    );
  };

  // const handleBack = () => {
  //   if (router.canGoBack()) {
  //     router.back();
  //   } else {
  //     router.replace('/splash');
  //   }
  // };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 py-3 bg-gray-50 border-b border-gray-200">
        /{/*<Pressable 
          className="w-10 h-10 items-center justify-center rounded-lg"
          onPress={handleBack}
        >
          <ChevronLeft size={24} color="#1C1C1E" />
        </Pressable>*/}
        
        <Heading size="lg" className="text-gray-900 font-semibold">
          ParkHive
        </Heading>
        
        <View className="w-10 h-10" />
      </View>

      <ScrollView className="flex-1 px-5 py-6">
        {/* Welcome Section */}
        <VStack space="lg" className="items-center mb-10">
          {/* App Icon */}
          <View className="w-16 h-16 bg-blue-500 rounded-full items-center justify-center mb-6">
            <Shapes size={40} color="white" />
          </View>

          <VStack space="sm" className="items-center max-w-sm">
            <Heading size="2xl" className="text-gray-900 font-bold text-center">
              Welcome to ParkHive
            </Heading>
            
            <Text className="text-gray-600 text-center leading-relaxed">
              To provide you with the best parking experience, we need a few permissions.
            </Text>
          </VStack>
        </VStack>

        {/* Permissions List */}
        <VStack space="md">
          {permissions.map((permission) => (
            <Card
              key={permission.id}
              size="md"
              variant="elevated"
              className="bg-white border border-gray-200 shadow-sm"
            >
              <HStack space="md" className="items-center">
                {/* Icon */}
                <View className={`w-10 h-10 ${permission.iconBg} rounded-lg items-center justify-center`}>
                  <permission.icon size={24} color={permission.iconColor} />
                </View>

                {/* Content */}
                <VStack space="xs" className="flex-1">
                  <Text className="text-gray-900 font-medium text-base">
                    {permission.title}
                  </Text>
                  <Text className="text-gray-600 text-xs leading-snug">
                    {permission.description}
                  </Text>
                </VStack>

                {/* Toggle Switch */}
                <Switch
                  value={permission.enabled}
                  onValueChange={permission.onToggle}
                  trackColor={{ false: '#E5E5E7', true: '#007AFF' }}
                  thumbColor={permission.enabled ? '#FFFFFF' : '#FFFFFF'}
                  ios_backgroundColor="#E5E5E7"
                />
              </HStack>
            </Card>
          ))}
        </VStack>
      </ScrollView>

      {/* Footer */}
      <View className="px-5 py-4 bg-gray-50 border-t border-gray-200">
        <Button 
          size="lg" 
          className="w-full bg-blue-500 rounded-xl"
          onPress={handleContinue}
        >
          <ButtonText className="text-white font-semibold">
            Continue
          </ButtonText>
        </Button>
      </View>
    </SafeAreaView>
  );
}