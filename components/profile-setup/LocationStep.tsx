import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Dimensions } from 'react-native';
import { MapPin, Navigation } from 'lucide-react-native';
import { Platform } from 'react-native';

// Conditional import for Location
const Location = Platform.OS === 'web' 
  ? require('@/components/ui/WebLocation').Location
  : require('expo-location');
import { useTheme } from '@/contexts/ThemeContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface LocationStepProps {
  data: any;
  updateData: (data: any) => void;
}

export function LocationStep({ data, updateData }: LocationStepProps) {
  const { theme } = useTheme();
  
  const [city, setCity] = useState(data.city || '');
  const [state, setState] = useState(data.state || '');
  const [isGettingLocation, setIsGettingLocation] = useState(false);

  const getCurrentLocation = async () => {
    setIsGettingLocation(true);
    
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'Permission Required',
          'Location permission is needed to find matches near you.'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const reverseGeocode = await Location.reverseGeocodeAsync({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });

      if (reverseGeocode.length > 0) {
        const address = reverseGeocode[0];
        setCity(address.city || '');
        setState(address.region || '');
        
        updateData({
          location: {
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            city: address.city,
            state: address.region,
          }
        });
      }
    } catch (error) {
      Alert.alert('Error', 'Unable to get your location. Please enter manually.');
    } finally {
      setIsGettingLocation(false);
    }
  };

  const handleCityChange = (cityText: string) => {
    setCity(cityText);
    updateData({ city: cityText });
  };

  const handleStateChange = (stateText: string) => {
    setState(stateText);
    updateData({ state: stateText });
  };

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 20,
    },
    title: {
      fontSize: SCREEN_WIDTH < 375 ? 22 : 24,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      marginBottom: 8,
      textAlign: 'center',
      paddingHorizontal: 16,
    },
    subtitle: {
      fontSize: SCREEN_WIDTH < 375 ? 14 : 16,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 32,
      lineHeight: 22,
      paddingHorizontal: 16,
    },
    locationButton: {
      marginBottom: 24,
    },
    divider: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 24,
    },
    dividerLine: {
      flex: 1,
      height: 1,
      backgroundColor: theme.colors.border,
    },
    dividerText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      paddingHorizontal: 16,
    },
    inputRow: {
      flexDirection: 'row',
      gap: 12,
      alignItems: 'flex-start',
    },
    inputHalf: {
      flex: 1,
      minWidth: 0,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Where are you located?</Text>
      <Text style={styles.subtitle}>
        This helps us find matches near you
      </Text>

      <Card>
        <Button
          title={isGettingLocation ? "Getting location..." : "Use Current Location"}
          onPress={getCurrentLocation}
          disabled={isGettingLocation}
          variant="outline"
          style={styles.locationButton}
        />

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <View style={styles.inputRow}>
          <Input
            label="City"
            value={city}
            onChangeText={handleCityChange}
            placeholder="Enter your city"
            leftIcon={<MapPin color={theme.colors.textSecondary} size={20} />}
            style={styles.inputHalf}
          />
          <Input
            label="State"
            value={state}
            onChangeText={handleStateChange}
            placeholder="State"
            style={styles.inputHalf}
          />
        </View>
      </Card>
    </View>
  );
}