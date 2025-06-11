import React, { useState, useRef } from 'react';
import { View, StyleSheet, Alert, SafeAreaView } from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import { 
  Search, 
  Mic, 
  Plus, 
  Minus, 
  MapPin, 
  Navigation,
  Menu
} from 'lucide-react-native';
import { Button, ButtonText } from '@/components/ui/button';
import { Input, InputField, InputIcon, InputSlot } from '@/components/ui/input';
import { HStack } from '@/components/ui/hstack';
import { VStack } from '@/components/ui/vstack';
import { Text } from '@/components/ui/text';
import { Heading } from '@/components/ui/heading';
import { Pressable } from '@/components/ui/pressable';

// Mock parking spot data
const parkingSpots = [
  {
    id: '1',
    coordinate: { latitude: 37.78825, longitude: -122.4324 },
    title: 'Downtown Parking',
    description: '2 hours free',
    available: true,
    price: '$2/hour',
  },
  {
    id: '2',
    coordinate: { latitude: 37.7849, longitude: -122.4294 },
    title: 'Street Parking',
    description: 'No time limit',
    available: false,
    price: 'Free',
  },
  {
    id: '3',
    coordinate: { latitude: 37.7899, longitude: -122.4364 },
    title: 'Mall Parking',
    description: '3 hours max',
    available: true,
    price: '$1.50/hour',
  },
  {
    id: '4',
    coordinate: { latitude: 37.7829, longitude: -122.4254 },
    title: 'Garage Parking',
    description: 'Covered parking',
    available: false,
    price: '$3/hour',
  },
  {
    id: '5',
    coordinate: { latitude: 37.7869, longitude: -122.4334 },
    title: 'Meter Parking',
    description: '1 hour max',
    available: true,
    price: '$2.50/hour',
  },
];

export default function MapScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [region, setRegion] = useState<Region>({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const mapRef = useRef<MapView>(null);

  const handleZoomIn = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 0.7,
      longitudeDelta: region.longitudeDelta * 0.7,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 500);
  };

  const handleZoomOut = () => {
    const newRegion = {
      ...region,
      latitudeDelta: region.latitudeDelta * 1.4,
      longitudeDelta: region.longitudeDelta * 1.4,
    };
    setRegion(newRegion);
    mapRef.current?.animateToRegion(newRegion, 500);
  };

  const handleMyLocation = () => {
    // In a real app, you'd get user's current location
    const userLocation = {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
    setRegion(userLocation);
    mapRef.current?.animateToRegion(userLocation, 1000);
  };

  const handleReportSpot = () => {
    Alert.alert(
      'Report Parking Spot',
      'Would you like to report a new parking spot at this location?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Report', onPress: () => Alert.alert('Success', 'Thank you for reporting this parking spot!') },
      ]
    );
  };

  const handleMarkerPress = (spot: typeof parkingSpots[0]) => {
    Alert.alert(
      spot.title,
      `${spot.description}\nPrice: ${spot.price}\nStatus: ${spot.available ? 'Available' : 'Occupied'}`,
      [
        { text: 'Cancel', style: 'cancel' },
        ...(spot.available ? [{ text: 'Navigate', onPress: () => Alert.alert('Navigation', `Navigating to ${spot.title}`) }] : []),
      ]
    );
  };

  const handleVoiceSearch = () => {
    Alert.alert('Voice Search', 'Voice search functionality coming soon!');
  };

  const handleMenuPress = () => {
    Alert.alert('Menu', 'Menu functionality coming soon!');
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      Alert.alert('Search', `Searching for: ${searchQuery}`);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <HStack className="items-center justify-between p-4">
          <Pressable onPress={handleMenuPress} className="p-2">
            <Menu size={24} color="#111418" />
          </Pressable>
          
          <Heading size="xl" className="text-gray-900 font-bold flex-1 text-center">
            ParkHive
          </Heading>
          
          <View className="w-10" />
        </HStack>

        {/* Search Bar */}
        <View className="px-4 pb-3">
          <Input size="lg" variant="outline" className="bg-gray-100 border-0 rounded-lg">
            <InputSlot className="pl-3">
              <InputIcon as={Search} size={'lg'} className="text-gray-600" />
            </InputSlot>
            <InputField
              placeholder="Search address, place..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              onSubmitEditing={handleSearch}
              className="pl-2 pr-12 bg-transparent"
            />
            <InputSlot className="pr-3">
              <Pressable onPress={handleVoiceSearch}>
                <InputIcon as={Mic} size={'lg'} className="text-gray-600" />
              </Pressable>
            </InputSlot>
          </Input>
        </View>
      </View>

      {/* Map */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          style={styles.map}
          region={region}
          onRegionChangeComplete={setRegion}
          showsUserLocation={true}
          showsMyLocationButton={false}
          showsCompass={false}
          toolbarEnabled={false}
        >
          {parkingSpots.map((spot) => (
            <Marker
              key={spot.id}
              coordinate={spot.coordinate}
              title={spot.title}
              description={spot.description}
              onPress={() => handleMarkerPress(spot)}
            >
              <View style={[
                styles.markerContainer,
                { backgroundColor: spot.available ? '#4CAF50' : '#F44336' }
              ]}>
                <MapPin size={20} color="white" />
              </View>
            </Marker>
          ))}
        </MapView>

        {/* Map Controls */}
        <View style={styles.mapControls}>
          <VStack space="sm">
            {/* Zoom Controls */}
            <View style={styles.zoomControls}>
              <Pressable onPress={handleZoomIn} style={styles.zoomButton}>
                <Plus size={20} color="#111418" />
              </Pressable>
              <View style={styles.divider} />
              <Pressable onPress={handleZoomOut} style={styles.zoomButton}>
                <Minus size={20} color="#111418" />
              </Pressable>
            </View>

            {/* My Location Button */}
            <Pressable onPress={handleMyLocation} style={styles.locationButton}>
              <Navigation size={20} color="#111418" />
            </Pressable>
          </VStack>
        </View>

        {/* Report Spot FAB */}
        <Pressable onPress={handleReportSpot} style={styles.reportButton}>
          <MapPin size={24} color="white" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    zIndex: 1,
  },
  mapContainer: {
    flex: 1,
    position: 'relative',
  },
  map: {
    flex: 1,
  },
  mapControls: {
    position: 'absolute',
    bottom: 120,
    right: 16,
    zIndex: 2,
  },
  zoomControls: {
    backgroundColor: 'white',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    overflow: 'hidden',
  },
  zoomButton: {
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
  },
  locationButton: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 12,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  reportButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
    backgroundColor: '#0c7ff2',
    borderRadius: 28,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    zIndex: 3,
  },
  markerContainer: {
    borderRadius: 20,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});