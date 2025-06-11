import React from 'react';
import { StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { View } from '@/components/Themed';
import { MapPin, Settings, User } from 'lucide-react-native';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <VStack space="lg" className="items-center px-6">
        {/* Header */}
        <VStack space="sm" className="items-center mb-6">
          <Heading size="3xl" className="text-gray-900 font-bold text-center">
            ParkHive
          </Heading>
          <Text className="text-gray-600 text-center">
            Smart parking made simple
          </Text>
        </VStack>

        {/* Quick Actions */}
        <VStack space="md" className="w-full max-w-sm">
          <Card size="lg" variant="elevated" className="bg-white">
            <VStack space="md" className="items-center">
              <View className="w-12 h-12 bg-blue-100 rounded-full items-center justify-center">
                <MapPin size={24} color="#007AFF" />
              </View>
              <VStack space="xs" className="items-center">
                <Heading size="lg" className="text-gray-900">
                  Find Parking
                </Heading>
                <Text className="text-gray-600 text-center text-sm">
                  Discover available parking spots nearby
                </Text>
              </VStack>
              <Button size="md" className="w-full bg-blue-500">
                <ButtonText className="text-white">
                  Search Spots
                </ButtonText>
              </Button>
            </VStack>
          </Card>

          <Card size="lg" variant="elevated" className="bg-white">
            <VStack space="md" className="items-center">
              <View className="w-12 h-12 bg-green-100 rounded-full items-center justify-center">
                <Settings size={24} color="#10B981" />
              </View>
              <VStack space="xs" className="items-center">
                <Heading size="lg" className="text-gray-900">
                  Permissions Setup
                </Heading>
                <Text className="text-gray-600 text-center text-sm">
                  Configure app permissions for the best experience
                </Text>
              </VStack>
              <Button 
                size="md" 
                className="w-full bg-green-500"
                onPress={() => router.push('/permissions')}
              >
                <ButtonText className="text-white">
                  Configure Permissions
                </ButtonText>
              </Button>
            </VStack>
          </Card>

          <Card size="lg" variant="elevated" className="bg-white">
            <VStack space="md" className="items-center">
              <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center">
                <User size={24} color="#8B5CF6" />
              </View>
              <VStack space="xs" className="items-center">
                <Heading size="lg" className="text-gray-900">
                  Profile
                </Heading>
                <Text className="text-gray-600 text-center text-sm">
                  Manage your account and preferences
                </Text>
              </VStack>
              <Button size="md" className="w-full bg-purple-500">
                <ButtonText className="text-white">
                  View Profile
                </ButtonText>
              </Button>
            </VStack>
          </Card>
        </VStack>
      </VStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingVertical: 20,
  },
});