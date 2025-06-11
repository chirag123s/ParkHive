import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { 
  ChevronLeft, 
  Car, 
  Eye, 
  EyeOff,
  Mail,
  Lock
} from 'lucide-react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }

    if (!email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return;
    }

    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Login Successful!', 
        `Welcome back! Email: ${email}`,
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    }, 1500);
  };

  const handleSocialLogin = (provider: 'google' | 'apple') => {
    Alert.alert(
      `${provider === 'google' ? 'Google' : 'Apple'} Login`,
      `Continue with ${provider === 'google' ? 'Google' : 'Apple'} login?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => {
            setTimeout(() => {
              router.replace('/(tabs)');
            }, 1000);
          }
        },
      ]
    );
  };

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace('/splash');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        <VStack space="lg" className="px-4 py-6">
          {/* Header */}
          <View className="w-full max-w-md mx-auto">
            <HStack className="items-center justify-start mb-10">
              <Pressable 
                className="w-10 h-10 items-center justify-center rounded-lg"
                onPress={handleBack}
              >
                <ChevronLeft size={24} color="#18181B" />
              </Pressable>
            </HStack>

            {/* Logo & Title Section */}
            <VStack space="lg" className="items-center text-center mb-10">
              {/* App Icon */}
              <View className="w-12 h-12 bg-amber-400 rounded-xl items-center justify-center mb-4">
                <Car size={28} color="#18181B" strokeWidth={2.5} />
              </View>

              <VStack space="xs" className="items-center">
                <Heading size="2xl" className="text-gray-900 font-semibold tracking-tight">
                  Welcome to ParkHive
                </Heading>
                <Text className="text-gray-600 text-base">
                  Enter your details to log in.
                </Text>
              </VStack>
            </VStack>

            {/* Login Form */}
            <VStack space="md" className="w-full">
              {/* Email Input */}
              <VStack space="xs">
                <Input size="lg" variant="outline" className="border-gray-300">
                  <InputSlot className="pl-4">
                    <InputIcon as={Mail} size='xl' className="text-gray-500" />
                  </InputSlot>
                  <InputField
                    placeholder="Email address"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoComplete="email"
                    className="pl-2"
                  />
                </Input>
              </VStack>

              {/* Password Input */}
              <VStack space="xs">
                <Input size="lg" variant="outline" className="border-gray-300">
                  <InputSlot className="pl-4">
                    <InputIcon as={Lock} size='xl' className="text-gray-500" />
                  </InputSlot>
                  <InputField
                    placeholder="Password"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    autoCapitalize="none"
                    autoComplete="password"
                    className="pl-2 pr-12"
                  />
                  <InputSlot className="pr-4">
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                      <InputIcon 
                        as={showPassword ? EyeOff : Eye} 
                        size='xl' 
                        className="text-gray-500" 
                      />
                    </Pressable>
                  </InputSlot>
                </Input>
              </VStack>

              {/* Forgot Password Link */}
              <HStack className="justify-end">
                <Pressable onPress={() => Alert.alert('Forgot Password', 'Password reset functionality coming soon!')}>
                  <Text className="text-gray-900 text-sm font-medium">
                    Forgot password?
                  </Text>
                </Pressable>
              </HStack>

              {/* Login Button */}
              <Button 
                size="lg" 
                className="w-full bg-gray-900 mt-2"
                onPress={handleLogin}
                disabled={isLoading}
              >
                <ButtonText className="text-white font-medium">
                  {isLoading ? 'Logging in...' : 'Log In'}
                </ButtonText>
              </Button>
            </VStack>

            {/* OR Divider */}
            <HStack space="md" className="items-center my-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="text-xs text-gray-500 font-medium px-3">OR</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </HStack>

            {/* Social Login Buttons */}
            <VStack space="sm" className="w-full">
              {/* Google Login */}
              <Button 
                size="lg" 
                variant="outline"
                className="w-full border-gray-300"
                onPress={() => handleSocialLogin('google')}
              >
                <HStack space="sm" className="items-center">
                  <Image 
                    source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <ButtonText className="text-gray-900 font-medium">
                    Continue with Google
                  </ButtonText>
                </HStack>
              </Button>

              {/* Apple Login */}
              <Button 
                size="lg" 
                variant="outline"
                className="w-full border-gray-300"
                onPress={() => handleSocialLogin('apple')}
              >
                <HStack space="sm" className="items-center">
                  <Image 
                    source={{ uri: 'https://developer.apple.com/assets/elements/icons/apple-pay/apple-pay.svg' }}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <ButtonText className="text-gray-900 font-medium">
                    Continue with Apple
                  </ButtonText>
                </HStack>
              </Button>
            </VStack>
          </View>
        </VStack>
      </ScrollView>

      {/* Footer */}
      <View className="w-full max-w-md mx-auto px-4 py-6">
        <HStack className="justify-center">
          <Text className="text-gray-600 text-sm">
            Don't have an account?{' '}
          </Text>
          <Pressable onPress={() => Alert.alert('Sign Up', 'Sign up functionality coming soon!')}>
            <Text className="text-gray-900 text-sm font-medium">
              Sign up
            </Text>
          </Pressable>
        </HStack>
      </View>
    </SafeAreaView>
  );
}