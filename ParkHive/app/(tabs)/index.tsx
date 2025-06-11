import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { View } from '@/components/Themed';
import { 
  MapPin, 
  Search, 
  Navigation, 
  Star,
  Clock,
  TrendingUp,
  LogIn,
  Settings as SettingsIcon
} from 'lucide-react-native';

export default function HomeScreen() {
  const quickActions = [
    {
      title: 'Find Parking',
      description: 'Search for available spots nearby',
      icon: MapPin,
      color: '#0c7ff2',
      action: () => router.push('/map'),
    },
    {
      title: 'Report Spot',
      description: 'Help others by reporting parking',
      icon: Navigation,
      color: '#4CAF50',
      action: () => router.push('/report'),
    },
  ];

  const recentActivity = [
    { location: 'Downtown Plaza', time: '2 hours ago', type: 'Found parking' },
    { location: 'Main Street', time: '1 day ago', type: 'Reported spot' },
    { location: 'Shopping Center', time: '3 days ago', type: 'Found parking' },
  ];

  const stats = [
    { label: 'Spots Found', value: '24', icon: MapPin },
    { label: 'Points Earned', value: '340', icon: Star },
    { label: 'Time Saved', value: '5.2h', icon: Clock },
  ];

  return (
    <View style={styles.container}>
      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          {/* Welcome Section */}
          <VStack space="sm" className="items-center">
            <Heading size="2xl" className="text-gray-900 font-bold text-center">
              Welcome back!
            </Heading>
            <Text className="text-gray-600 text-center">
              Find parking spots or help others in your community
            </Text>
          </VStack>

          {/* Quick Actions */}
          <VStack space="md">
            <Heading size="lg" className="text-gray-900">
              Quick Actions
            </Heading>
            
            <VStack space="md">
              {quickActions.map((action, index) => (
                <Card key={index} size="lg" variant="elevated" className="bg-white">
                  <Button
                    variant="link"
                    action="default"
                    size="lg"
                    className="w-full justify-start p-0"
                    onPress={action.action}
                  >
                    <HStack space="md" className="items-center w-full p-2">
                      <View 
                        className="w-12 h-12 rounded-xl items-center justify-center"
                        style={{ backgroundColor: `${action.color}15` }}
                      >
                        <action.icon size={24} color={action.color} />
                      </View>
                      <VStack space="xs" className="flex-1">
                        <Text className="text-gray-900 font-semibold text-lg">
                          {action.title}
                        </Text>
                        <Text className="text-gray-600 text-sm">
                          {action.description}
                        </Text>
                      </VStack>
                    </HStack>
                  </Button>
                </Card>
              ))}
            </VStack>
          </VStack>

          {/* Stats Overview */}
          <VStack space="md">
            <Heading size="lg" className="text-gray-900">
              Your Activity
            </Heading>
            
            <HStack space="md" className="justify-between">
              {stats.map((stat, index) => (
                <Card key={index} size="md" variant="elevated" className="bg-white flex-1">
                  <VStack space="sm" className="items-center">
                    <View className="w-10 h-10 bg-blue-100 rounded-full items-center justify-center">
                      <stat.icon size={20} color="#0c7ff2" />
                    </View>
                    <Text className="text-xl font-bold text-gray-900">
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

          {/* Recent Activity */}
          <VStack space="md">
            <HStack className="items-center justify-between">
              <Heading size="lg" className="text-gray-900">
                Recent Activity
              </Heading>
              <Button size="sm" variant="link" action="default">
                <ButtonText className="text-blue-600">View All</ButtonText>
              </Button>
            </HStack>
            
            <Card size="md" variant="elevated" className="bg-white">
              <VStack space="md">
                {recentActivity.map((activity, index) => (
                  <HStack key={index} space="md" className="items-center">
                    <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center">
                      <MapPin size={16} color="#4CAF50" />
                    </View>
                    <VStack space="xs" className="flex-1">
                      <Text className="text-gray-900 font-medium">
                        {activity.type}
                      </Text>
                      <Text className="text-gray-600 text-sm">
                        {activity.location} • {activity.time}
                      </Text>
                    </VStack>
                  </HStack>
                ))}
              </VStack>
            </Card>
          </VStack>

          {/* Trending Spots */}
          <VStack space="md">
            <HStack className="items-center">
              <TrendingUp size={20} color="#F59E0B" />
              <Heading size="lg" className="text-gray-900 ml-2">
                Trending Spots
              </Heading>
            </HStack>
            
            <Card size="md" variant="elevated" className="bg-amber-50 border border-amber-200">
              <VStack space="sm">
                <Text className="text-amber-800 font-semibold">
                  🔥 Downtown Plaza
                </Text>
                <Text className="text-amber-700 text-sm">
                  High availability reported by 12 users in the last hour
                </Text>
                <Button 
                  size="sm" 
                  className="bg-amber-600 mt-2"
                  onPress={() => router.push('/map')}
                >
                  <ButtonText className="text-white">View on Map</ButtonText>
                </Button>
              </VStack>
            </Card>
          </VStack>

          {/* Development Testing (Hidden in production) */}
          <Card size="md" variant="outline" className="bg-gray-50 border-2 border-dashed border-gray-300">
            <VStack space="md">
              <HStack className="items-center">
                <SettingsIcon size={18} color="#6B7280" />
                <Text className="text-gray-700 font-medium ml-2">
                  Development Testing
                </Text>
              </HStack>
              
              <HStack space="sm">
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1 border-gray-300"
                  onPress={() => router.push('/splash')}
                >
                  <ButtonText className="text-gray-700 text-xs">
                    🚀 App Flow
                  </ButtonText>
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="flex-1 border-gray-300"
                  onPress={() => router.push('/auth')}
                >
                  <LogIn size={14} color="#6B7280" />
                  <ButtonText className="text-gray-700 text-xs ml-1">
                    Auth
                  </ButtonText>
                </Button>
              </HStack>
            </VStack>
          </Card>
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