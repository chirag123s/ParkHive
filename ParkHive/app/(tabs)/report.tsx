import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Alert, Image } from 'react-native';
import { 
  MapPin, 
  Camera, 
  Clock, 
  DollarSign, 
  Car,
  CheckCircle,
  XCircle,
  Info
} from 'lucide-react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heading } from '@/components/ui/heading';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { Pressable } from '@/components/ui/pressable';

export default function ReportScreen() {
  const [formData, setFormData] = useState({
    location: '',
    spotType: '',
    timeLimit: '',
    price: '',
    description: '',
    isAvailable: true,
  });
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const spotTypes = [
    { id: 'street', label: 'Street Parking', icon: Car },
    { id: 'garage', label: 'Parking Garage', icon: Car },
    { id: 'lot', label: 'Parking Lot', icon: Car },
    { id: 'meter', label: 'Meter Parking', icon: Car },
  ];

  const handleTakePhoto = () => {
    Alert.alert(
      'Add Photo',
      'Choose how to add a photo of the parking spot',
      [
        { text: 'Camera', onPress: () => simulatePhotoCapture('camera') },
        { text: 'Gallery', onPress: () => simulatePhotoCapture('gallery') },
        { text: 'Cancel', style: 'cancel' },
      ]
    );
  };

  const simulatePhotoCapture = (source: string) => {
    // Simulate photo capture/selection
    setSelectedPhoto('https://via.placeholder.com/300x200/4CAF50/FFFFFF?text=Parking+Spot');
    Alert.alert('Photo Added', `Photo captured from ${source}`);
  };

  const handleSubmitReport = async () => {
    if (!formData.location || !formData.spotType) {
      Alert.alert('Error', 'Please fill in the required fields (location and spot type)');
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      Alert.alert(
        'Report Submitted!',
        'Thank you for reporting this parking spot. It will be reviewed and added to the map.',
        [
          {
            text: 'OK',
            onPress: () => {
              // Reset form
              setFormData({
                location: '',
                spotType: '',
                timeLimit: '',
                price: '',
                description: '',
                isAvailable: true,
              });
              setSelectedPhoto(null);
            },
          },
        ]
      );
    }, 2000);
  };

  return (
    <View className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white border-b border-gray-200 px-4 py-4">
        <Heading size="xl" className="text-gray-900 font-bold text-center">
          Report Parking Spot
        </Heading>
        <Text className="text-gray-600 text-center mt-1">
          Help others find parking by reporting available spots
        </Text>
      </View>

      <ScrollView className="flex-1 px-4 py-6" showsVerticalScrollIndicator={false}>
        <VStack space="lg">
          {/* Location Input */}
          <Card size="md" variant="elevated" className="bg-white">
            <VStack space="md">
              <HStack className="items-center">
                <View className="w-8 h-8 bg-blue-100 rounded-lg items-center justify-center mr-3">
                  <MapPin size={18} color="#0c7ff2" />
                </View>
                <Text className="text-gray-900 font-semibold">Location *</Text>
              </HStack>
              
              <Input size="lg" variant="outline" className="border-gray-300">
                <InputField
                  placeholder="Enter street address or location name"
                  value={formData.location}
                  onChangeText={(value) => updateFormData('location', value)}
                />
              </Input>
              
              <Button size="sm" variant="outline" className="border-blue-300">
                <ButtonText className="text-blue-600">Use Current Location</ButtonText>
              </Button>
            </VStack>
          </Card>

          {/* Spot Type Selection */}
          <Card size="md" variant="elevated" className="bg-white">
            <VStack space="md">
              <HStack className="items-center">
                <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-3">
                  <Car size={18} color="#4CAF50" />
                </View>
                <Text className="text-gray-900 font-semibold">Spot Type *</Text>
              </HStack>
              
              <VStack space="sm">
                {spotTypes.map((type) => (
                  <Pressable
                    key={type.id}
                    onPress={() => updateFormData('spotType', type.id)}
                    className={`p-3 rounded-lg border-2 ${
                      formData.spotType === type.id 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <HStack className="items-center">
                      <type.icon 
                        size={20} 
                        color={formData.spotType === type.id ? '#0c7ff2' : '#6B7280'} 
                      />
                      <Text className={`ml-3 font-medium ${
                        formData.spotType === type.id ? 'text-blue-600' : 'text-gray-700'
                      }`}>
                        {type.label}
                      </Text>
                    </HStack>
                  </Pressable>
                ))}
              </VStack>
            </VStack>
          </Card>

          {/* Time & Price */}
          <HStack space="md">
            <Card size="md" variant="elevated" className="bg-white flex-1">
              <VStack space="md">
                <HStack className="items-center">
                  <View className="w-8 h-8 bg-amber-100 rounded-lg items-center justify-center mr-3">
                    <Clock size={18} color="#F59E0B" />
                  </View>
                  <Text className="text-gray-900 font-semibold">Time Limit</Text>
                </HStack>
                
                <Input size="md" variant="outline" className="border-gray-300">
                  <InputField
                    placeholder="e.g., 2 hours"
                    value={formData.timeLimit}
                    onChangeText={(value) => updateFormData('timeLimit', value)}
                  />
                </Input>
              </VStack>
            </Card>

            <Card size="md" variant="elevated" className="bg-white flex-1">
              <VStack space="md">
                <HStack className="items-center">
                  <View className="w-8 h-8 bg-green-100 rounded-lg items-center justify-center mr-3">
                    <DollarSign size={18} color="#10B981" />
                  </View>
                  <Text className="text-gray-900 font-semibold">Price</Text>
                </HStack>
                
                <Input size="md" variant="outline" className="border-gray-300">
                  <InputField
                    placeholder="Free or $2/hour"
                    value={formData.price}
                    onChangeText={(value) => updateFormData('price', value)}
                  />
                </Input>
              </VStack>
            </Card>
          </HStack>

          {/* Availability Status */}
          <Card size="md" variant="elevated" className="bg-white">
            <VStack space="md">
              <HStack className="items-center">
                <View className="w-8 h-8 bg-purple-100 rounded-lg items-center justify-center mr-3">
                  <Info size={18} color="#8B5CF6" />
                </View>
                <Text className="text-gray-900 font-semibold">Current Status</Text>
              </HStack>
              
              <HStack space="md">
                <Pressable
                  onPress={() => updateFormData('isAvailable', true)}
                  className={`flex-1 p-3 rounded-lg border-2 ${
                    formData.isAvailable 
                      ? 'border-green-500 bg-green-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <HStack className="items-center justify-center">
                    <CheckCircle 
                      size={20} 
                      color={formData.isAvailable ? '#10B981' : '#6B7280'} 
                    />
                    <Text className={`ml-2 font-medium ${
                      formData.isAvailable ? 'text-green-600' : 'text-gray-700'
                    }`}>
                      Available
                    </Text>
                  </HStack>
                </Pressable>

                <Pressable
                  onPress={() => updateFormData('isAvailable', false)}
                  className={`flex-1 p-3 rounded-lg border-2 ${
                    !formData.isAvailable 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <HStack className="items-center justify-center">
                    <XCircle 
                      size={20} 
                      color={!formData.isAvailable ? '#EF4444' : '#6B7280'} 
                    />
                    <Text className={`ml-2 font-medium ${
                      !formData.isAvailable ? 'text-red-600' : 'text-gray-700'
                    }`}>
                      Occupied
                    </Text>
                  </HStack>
                </Pressable>
              </HStack>
            </VStack>
          </Card>

          {/* Photo Upload */}
          <Card size="md" variant="elevated" className="bg-white">
            <VStack space="md">
              <HStack className="items-center">
                <View className="w-8 h-8 bg-indigo-100 rounded-lg items-center justify-center mr-3">
                  <Camera size={18} color="#6366F1" />
                </View>
                <Text className="text-gray-900 font-semibold">Add Photo</Text>
              </HStack>
              
              {selectedPhoto ? (
                <VStack space="sm">
                  <Image 
                    source={{ uri: selectedPhoto }}
                    style={{ width: '100%', height: 150, borderRadius: 8 }}
                    resizeMode="cover"
                  />
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="border-red-300"
                    onPress={() => setSelectedPhoto(null)}
                  >
                    <ButtonText className="text-red-600">Remove Photo</ButtonText>
                  </Button>
                </VStack>
              ) : (
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-indigo-300"
                  onPress={handleTakePhoto}
                >
                  <Camera size={20} color="#6366F1" />
                  <ButtonText className="text-indigo-600 ml-2">Take Photo</ButtonText>
                </Button>
              )}
            </VStack>
          </Card>

          {/* Description */}
          <Card size="md" variant="elevated" className="bg-white">
            <VStack space="md">
              <Text className="text-gray-900 font-semibold">Additional Notes</Text>
              
              <Input size="lg" variant="outline" className="border-gray-300">
                <InputField
                  placeholder="Any additional details about this parking spot..."
                  value={formData.description}
                  onChangeText={(value) => updateFormData('description', value)}
                  multiline={true}
                  numberOfLines={3}
                  style={{ minHeight: 80, textAlignVertical: 'top' }}
                />
              </Input>
            </VStack>
          </Card>

          {/* Submit Button */}
          <Button 
            size="lg" 
            className="w-full bg-blue-600 mt-4"
            onPress={handleSubmitReport}
            disabled={isSubmitting}
          >
            <ButtonText className="text-white font-semibold">
              {isSubmitting ? 'Submitting Report...' : 'Submit Report'}
            </ButtonText>
          </Button>

          {/* Info Card */}
          <Card size="md" variant="outline" className="bg-blue-50 border-blue-200">
            <HStack space="md" className="items-start">
              <Info size={20} color="#0c7ff2" />
              <VStack space="xs" className="flex-1">
                <Text className="text-blue-800 font-medium text-sm">
                  Help Build Our Community
                </Text>
                <Text className="text-blue-700 text-xs leading-relaxed">
                  Your reports help other drivers find parking and earn you points in the ParkHive rewards system.
                </Text>
              </VStack>
            </HStack>
          </Card>
        </VStack>
      </ScrollView>
    </View>
  );
}