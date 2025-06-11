import React from 'react';
import { ScrollView, StyleSheet, Alert } from 'react-native';
import { router } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Avatar, AvatarFallbackText } from '@/components/ui/avatar';
import { Badge, BadgeText } from '@/components/ui/badge';
import { View } from '@/components/Themed';
import { 
  MapPin, 
  Camera, 
  Bell, 
  Star, 
  Award, 
  Settings,
  ChevronRight,
  Car,
  LogOut
} from 'lucide-react-native';

export default function ProfileScreen() {
  const profileStats = [
    { label: 'Spots Found', value: '24', icon: MapPin, color: '#10B981' },
    { label: 'Photos Shared', value: '12', icon: Camera, color: '#F59E0B' },
    { label: 'Points Earned', value: '340', icon: Star, color: '#8B5CF6' },
  ];

  const menuItems = [
    { title: 'Parking History', icon: Car, onPress: () => {} },
    { title: 'Notifications', icon: Bell, onPress: () => {} },
    { title: 'App Permissions', icon: Settings, onPress: () => router.push('/permissions') },
    { title: 'Account Settings', icon: Settings, onPress: () => {} },
  ];

  const handleLogout = () => {
    Alert.alert(
      'Log Out',
      'Are you sure you want to log out?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Log Out', 
          style: 'destructive',
          onPress: () => {
            router.replace('/splash');
          }
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView className="flex-1 px-5 py-6">
        <VStack space="lg">
          {/* Profile Header */}
          <Card size="lg" variant="elevated" className="bg-white">
            <VStack space="md" className="items-center">
              <Avatar size="xl" className="bg-blue-500">
                <AvatarFallbackText className="text-white font-semibold">
                  JD
                </AvatarFallbackText>
              </Avatar>
              
              <VStack space="xs" className="items-center">
                <Heading size="xl" className="text-gray-900">
                  John Doe
                </Heading>
                <Text className="text-gray-600">
                  john.doe@example.com
                </Text>
                <Badge action="success" className="mt-2">
                  <BadgeText>Scout Level</BadgeText>
                </Badge>
              </VStack>
            </VStack>
          </Card>

          {/* Stats */}
          <VStack space="md">
            <Heading size="lg" className="text-gray-900 px-2">
              Your Activity
            </Heading>
            
            <HStack space="md" className="justify-between">
              {profileStats.map((stat, index) => (
                <Card key={index} size="md" variant="elevated" className="bg-white flex-1">
                  <VStack space="sm" className="items-center">
                    <View 
                      className="w-10 h-10 rounded-full items-center justify-center"
                      style={{ backgroundColor: `${stat.color}20` }}
                    >
                      <stat.icon size={20} color={stat.color} />
                    </View>
                    <Text className="text-2xl font-bold text-gray-900">
                      {stat.value}
                    </Text>
                    <Text className="text-xs text-gray-600 text-center">
                      {stat.label}
                    </Text>
                  </VStack>
                </Card>
              ))}
            </HStack>
          </VStack>

          {/* Achievements */}
          <Card size="lg" variant="elevated" className="bg-gradient-to-r from-purple-50 to-blue-50">
            <HStack space="md" className="items-center">
              <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center">
                <Award size={24} color="#8B5CF6" />
              </View>
              <VStack space="xs" className="flex-1">
                <Heading size="md" className="text-gray-900">
                  Recent Achievement
                </Heading>
                <Text className="text-gray-600 text-sm">
                  First Photo Shared - You uploaded your first parking spot photo!
                </Text>
              </VStack>
            </HStack>
          </Card>

          {/* Menu Items */}
          <VStack space="md">
            <Heading size="lg" className="text-gray-900 px-2">
              Settings
            </Heading>
            
            <VStack space="xs">
              {menuItems.map((item, index) => (
                <Card 
                  key={index} 
                  size="md" 
                  variant="elevated" 
                  className="bg-white"
                >
                  <Button
                    variant="link"
                    action="default"
                    size="lg"
                    className="w-full justify-start p-0"
                    onPress={item.onPress}
                  >
                    <HStack space="md" className="items-center w-full">
                      <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
                        <item.icon size={18} color="#6B7280" />
                      </View>
                      <Text className="text-gray-900 font-medium flex-1 text-left">
                        {item.title}
                      </Text>
                      <ChevronRight size={18} color="#9CA3AF" />
                    </HStack>
                  </Button>
                </Card>
              ))}
            </VStack>
          </VStack>

          {/* Quick Actions */}
          <VStack space="sm">
            <Button 
              size="lg" 
              className="w-full bg-blue-500 rounded-xl"
              onPress={() => router.push('/permissions')}
            >
              <ButtonText className="text-white font-semibold">
                Review Permissions
              </ButtonText>
            </Button>

            <Button 
              size="lg" 
              variant="outline"
              className="w-full border-red-300 rounded-xl"
              onPress={handleLogout}
            >
              <HStack space="sm" className="items-center">
                <LogOut size={18} color="#DC2626" />
                <ButtonText className="text-red-600 font-semibold">
                  Log Out
                </ButtonText>
              </HStack>
            </Button>
          </VStack>
        </VStack>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9FB',
  },
});