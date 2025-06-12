import React, { useEffect } from 'react';
import { SafeAreaView, Animated, Easing, View } from 'react-native';
import { router } from 'expo-router';
import { VStack } from '@/components/ui/vstack';
import { Heading } from '@/components/ui/heading';
import { Text } from '@/components/ui/text';
import { Car } from 'lucide-react-native';

export default function SplashScreen() {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.ease,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 800,
        easing: Easing.bezier(0.68, -0.55, 0.265, 1.55),
        useNativeDriver: true,
      }),
    ]).start();

    // Navigate to permissions after 2.5 seconds
    const timer = setTimeout(() => {
      router.replace('/permissions');
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
      <VStack space="xl" className="flex-1 items-center justify-center px-8">
        <Animated.View
          style={{
            opacity: fadeAnim,
            transform: [{ scale: scaleAnim }],
          }}
          className="items-center"
        >
          {/* Logo */}
          <VStack space="lg" className="items-center mb-8">
            <View className="w-20 h-20 bg-amber-400 rounded-2xl items-center justify-center shadow-lg">
              <Car size={40} color="#18181B" strokeWidth={2.5} />
            </View>
          </VStack>

          {/* App Name */}
          <VStack space="sm" className="items-center">
            <Heading size="4xl" className="text-gray-900 font-bold tracking-tight">
              ParkHive
            </Heading>
            <Text className="text-gray-600 text-lg text-center">
              Smart parking made simple
            </Text>
          </VStack>
        </Animated.View>

        {/* Loading indicator */}
        <Animated.View 
          style={{ opacity: fadeAnim }}
          className="absolute bottom-20"
        >
          <VStack space="md" className="items-center">
            <View className="w-8 h-1 bg-gray-200 rounded-full overflow-hidden">
              <Animated.View 
                className="h-full bg-amber-400 rounded-full"
                style={{
                  width: 32,
                  transform: [{
                    translateX: fadeAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [-32, 0],
                    })
                  }]
                }}
              />
            </View>
            <Text className="text-gray-500 text-sm">
              Loading...
            </Text>
          </VStack>
        </Animated.View>
      </VStack>
  );
}