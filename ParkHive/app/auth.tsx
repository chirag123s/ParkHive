import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Alert, Image } from 'react-native';
import { router } from 'expo-router';
import { 
  ChevronLeft, 
  Car, 
  Eye, 
  EyeOff,
  Mail,
  Lock,
  User as UserIcon
} from 'lucide-react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';

export default function AuthScreen() {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('register');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password) {
      Alert.alert('Error', 'Please fill in all required fields');
      return false;
    }

    if (!formData.email.includes('@')) {
      Alert.alert('Error', 'Please enter a valid email address');
      return false;
    }

    if (authMode === 'register') {
      if (!formData.fullName) {
        Alert.alert('Error', 'Please enter your full name');
        return false;
      }

      if (formData.password.length < 6) {
        Alert.alert('Error', 'Password must be at least 6 characters long');
        return false;
      }

      if (formData.password !== formData.confirmPassword) {
        Alert.alert('Error', 'Passwords do not match');
        return false;
      }

      if (!agreeToTerms) {
        Alert.alert('Error', 'Please accept the terms and conditions');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    
    // Simulate authentication process
    setTimeout(() => {
      setIsLoading(false);
      const action = authMode === 'register' ? 'Registration' : 'Login';
      Alert.alert(
        `${action} Successful!`, 
        authMode === 'register' 
          ? `Welcome to ParkHive, ${formData.fullName}!`
          : `Welcome back, ${formData.email}!`,
        [
          {
            text: 'Continue',
            onPress: () => router.replace('/(tabs)'),
          },
        ]
      );
    }, 1500);
  };

  const handleSocialAuth = (provider: 'google' | 'apple') => {
    const action = authMode === 'register' ? 'Sign up' : 'Sign in';
    Alert.alert(
      `${provider === 'google' ? 'Google' : 'Apple'} ${action}`,
      `${action} with ${provider === 'google' ? 'Google' : 'Apple'}?`,
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
      router.replace('/permissions');
    }
  };

  const switchAuthMode = () => {
    setAuthMode(authMode === 'login' ? 'register' : 'login');
    // Reset form when switching modes
    setFormData({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    setAgreeToTerms(false);
    setRememberMe(false);
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
            <VStack space="lg" className="items-center text-center mb-8">
              {/* App Icon */}
              <View className="w-12 h-12 bg-amber-400 rounded-xl items-center justify-center mb-4">
                <Car size={28} color="#18181B" strokeWidth={2.5} />
              </View>

              <VStack space="xs" className="items-center">
                <Heading size="2xl" className="text-gray-900 font-semibold tracking-tight">
                  {authMode === 'register' ? 'Create Account' : 'Welcome Back'}
                </Heading>
                <Text className="text-gray-600 text-base">
                  {authMode === 'register' 
                    ? 'Join ParkHive to find parking easily' 
                    : 'Sign in to your ParkHive account'
                  }
                </Text>
              </VStack>
            </VStack>

            {/* Auth Mode Toggle */}
            <HStack className="bg-gray-100 rounded-lg p-1 mb-6">
              <Pressable 
                className={`flex-1 py-2 px-4 rounded-md ${authMode === 'register' ? 'bg-white shadow-sm' : ''}`}
                onPress={() => authMode !== 'register' && switchAuthMode()}
              >
                <Text className={`text-center font-medium ${authMode === 'register' ? 'text-gray-900' : 'text-gray-600'}`}>
                  Sign Up
                </Text>
              </Pressable>
              <Pressable 
                className={`flex-1 py-2 px-4 rounded-md ${authMode === 'login' ? 'bg-white shadow-sm' : ''}`}
                onPress={() => authMode !== 'login' && switchAuthMode()}
              >
                <Text className={`text-center font-medium ${authMode === 'login' ? 'text-gray-900' : 'text-gray-600'}`}>
                  Sign In
                </Text>
              </Pressable>
            </HStack>

            {/* Form */}
            <VStack space="md" className="w-full">
              {/* Full Name Input (Register only) */}
              {authMode === 'register' && (
                <Input size="lg" variant="outline" className="border-gray-300">
                  <InputSlot className="pl-4">
                    <InputIcon as={UserIcon} size={20} className="text-gray-500" />
                  </InputSlot>
                  <InputField
                    placeholder="Full name"
                    value={formData.fullName}
                    onChangeText={(value) => updateFormData('fullName', value)}
                    autoCapitalize="words"
                    autoComplete="name"
                    className="pl-2"
                  />
                </Input>
              )}

              {/* Email Input */}
              <Input size="lg" variant="outline" className="border-gray-300">
                <InputSlot className="pl-4">
                  <InputIcon as={Mail} size={20} className="text-gray-500" />
                </InputSlot>
                <InputField
                  placeholder="Email address"
                  value={formData.email}
                  onChangeText={(value) => updateFormData('email', value)}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  className="pl-2"
                />
              </Input>

              {/* Password Input */}
              <Input size="lg" variant="outline" className="border-gray-300">
                <InputSlot className="pl-4">
                  <InputIcon as={Lock} size={20} className="text-gray-500" />
                </InputSlot>
                <InputField
                  placeholder="Password"
                  value={formData.password}
                  onChangeText={(value) => updateFormData('password', value)}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoComplete={authMode === 'register' ? 'new-password' : 'password'}
                  className="pl-2 pr-12"
                />
                <InputSlot className="pr-4">
                  <Pressable onPress={() => setShowPassword(!showPassword)}>
                    <InputIcon 
                      as={showPassword ? EyeOff : Eye} 
                      size={20} 
                      className="text-gray-500" 
                    />
                  </Pressable>
                </InputSlot>
              </Input>

              {/* Confirm Password Input (Register only) */}
              {authMode === 'register' && (
                <Input size="lg" variant="outline" className="border-gray-300">
                  <InputSlot className="pl-4">
                    <InputIcon as={Lock} size={20} className="text-gray-500" />
                  </InputSlot>
                  <InputField
                    placeholder="Confirm password"
                    value={formData.confirmPassword}
                    onChangeText={(value) => updateFormData('confirmPassword', value)}
                    secureTextEntry={!showConfirmPassword}
                    autoCapitalize="none"
                    autoComplete="new-password"
                    className="pl-2 pr-12"
                  />
                  <InputSlot className="pr-4">
                    <Pressable onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
                      <InputIcon 
                        as={showConfirmPassword ? EyeOff : Eye} 
                        size={20} 
                        className="text-gray-500" 
                      />
                    </Pressable>
                  </InputSlot>
                </Input>
              )}

              {/* Options Row */}
              <HStack className="justify-between items-center">
                {authMode === 'login' ? (
                  <>
                    <Pressable 
                      className="flex-row items-center"
                      onPress={() => setRememberMe(!rememberMe)}
                    >
                      <View className={`w-4 h-4 border border-gray-300 rounded mr-2 ${rememberMe ? 'bg-gray-900' : 'bg-white'}`}>
                        {rememberMe && <Text className="text-white text-xs text-center">✓</Text>}
                      </View>
                      <Text className="text-gray-600 text-sm">Remember me</Text>
                    </Pressable>
                    <Pressable onPress={() => Alert.alert('Forgot Password', 'Password reset functionality coming soon!')}>
                      <Text className="text-gray-900 text-sm font-medium">
                        Forgot password?
                      </Text>
                    </Pressable>
                  </>
                ) : (
                  <Pressable 
                    className="flex-row items-center"
                    onPress={() => setAgreeToTerms(!agreeToTerms)}
                  >
                    <View className={`w-4 h-4 border border-gray-300 rounded mr-2 ${agreeToTerms ? 'bg-gray-900' : 'bg-white'}`}>
                      {agreeToTerms && <Text className="text-white text-xs text-center">✓</Text>}
                    </View>
                    <Text className="text-gray-600 text-sm">
                      I agree to the{' '}
                      <Text className="text-gray-900 font-medium">Terms & Conditions</Text>
                    </Text>
                  </Pressable>
                )}
              </HStack>

              {/* Submit Button */}
              <Button 
                size="lg" 
                className="w-full bg-gray-900 mt-2"
                onPress={handleSubmit}
                disabled={isLoading}
              >
                <ButtonText className="text-white font-medium">
                  {isLoading 
                    ? (authMode === 'register' ? 'Creating Account...' : 'Signing In...') 
                    : (authMode === 'register' ? 'Create Account' : 'Sign In')
                  }
                </ButtonText>
              </Button>
            </VStack>

            {/* OR Divider */}
            <HStack space="md" className="items-center my-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text className="text-xs text-gray-500 font-medium px-3">OR</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </HStack>

            {/* Social Auth Buttons */}
            <VStack space="sm" className="w-full">
              {/* Google */}
              <Button 
                size="lg" 
                variant="outline"
                className="w-full border-gray-300"
                onPress={() => handleSocialAuth('google')}
              >
                <HStack space="sm" className="items-center">
                  <Image 
                    source={{ uri: 'https://developers.google.com/identity/images/g-logo.png' }}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <ButtonText className="text-gray-900 font-medium">
                    {authMode === 'register' ? 'Sign up with Google' : 'Sign in with Google'}
                  </ButtonText>
                </HStack>
              </Button>

              {/* Apple */}
              <Button 
                size="lg" 
                variant="outline"
                className="w-full border-gray-300"
                onPress={() => handleSocialAuth('apple')}
              >
                <HStack space="sm" className="items-center">
                  <Image 
                    source={{ uri: 'https://developer.apple.com/assets/elements/icons/apple-pay/apple-pay.svg' }}
                    style={{ width: 20, height: 20 }}
                    resizeMode="contain"
                  />
                  <ButtonText className="text-gray-900 font-medium">
                    {authMode === 'register' ? 'Sign up with Apple' : 'Sign in with Apple'}
                  </ButtonText>
                </HStack>
              </Button>
            </VStack>
          </View>
        </VStack>
      </ScrollView>
    </SafeAreaView>
  );
}