import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Platform } from 'react-native';

// Conditional import for Slider
const Slider = Platform.OS === 'web' 
  ? require('@/components/ui/WebSlider').WebSlider
  : require('@react-native-community/slider').default;
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';

interface PreferencesStepProps {
  data: any;
  updateData: (data: any) => void;
}

export function PreferencesStep({ data, updateData }: PreferencesStepProps) {
  const { theme } = useTheme();
  
  const [ageRange, setAgeRange] = useState<[number, number]>(
    data.preferences?.ageRange || [22, 35]
  );
  const [maxDistance, setMaxDistance] = useState(
    data.preferences?.maxDistance || 50
  );

  const handleAgeChange = (value: number, isMin: boolean) => {
    const newRange: [number, number] = isMin 
      ? [value, Math.max(value + 1, ageRange[1])]
      : [Math.min(ageRange[0], value - 1), value];
    
    setAgeRange(newRange);
    updateData({ 
      preferences: { 
        ...data.preferences, 
        ageRange: newRange 
      } 
    });
  };

  const handleDistanceChange = (value: number) => {
    setMaxDistance(value);
    updateData({ 
      preferences: { 
        ...data.preferences, 
        maxDistance: value 
      } 
    });
  };

  const styles = StyleSheet.create({
    container: {
      paddingVertical: 20,
    },
    title: {
      fontSize: 24,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      marginBottom: 8,
      textAlign: 'center',
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 32,
    },
    preferenceSection: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
      marginBottom: 16,
    },
    rangeContainer: {
      marginBottom: 16,
    },
    rangeLabel: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 12,
    },
    rangeText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
    },
    rangeValue: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
    },
    slider: {
      height: 40,
    },
    distanceText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
      textAlign: 'center',
      marginTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Set Your Preferences</Text>
      <Text style={styles.subtitle}>
        Help us find your ideal matches
      </Text>

      <Card>
        <View style={styles.preferenceSection}>
          <Text style={styles.sectionTitle}>Age Range</Text>
          
          <View style={styles.rangeContainer}>
            <View style={styles.rangeLabel}>
              <Text style={styles.rangeText}>Minimum Age</Text>
              <Text style={styles.rangeValue}>{ageRange[0]}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={18}
              maximumValue={65}
              value={ageRange[0]}
              onValueChange={(value) => handleAgeChange(Math.round(value), true)}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.border}
              thumbStyle={{ backgroundColor: theme.colors.primary }}
            />
          </View>

          <View style={styles.rangeContainer}>
            <View style={styles.rangeLabel}>
              <Text style={styles.rangeText}>Maximum Age</Text>
              <Text style={styles.rangeValue}>{ageRange[1]}</Text>
            </View>
            <Slider
              style={styles.slider}
              minimumValue={18}
              maximumValue={65}
              value={ageRange[1]}
              onValueChange={(value) => handleAgeChange(Math.round(value), false)}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.border}
              thumbStyle={{ backgroundColor: theme.colors.primary }}
            />
          </View>
        </View>

        <View style={styles.preferenceSection}>
          <Text style={styles.sectionTitle}>Maximum Distance</Text>
          
          <Slider
            style={styles.slider}
            minimumValue={1}
            maximumValue={100}
            value={maxDistance}
            onValueChange={(value) => handleDistanceChange(Math.round(value))}
            minimumTrackTintColor={theme.colors.secondary}
            maximumTrackTintColor={theme.colors.border}
            thumbStyle={{ backgroundColor: theme.colors.secondary }}
          />
          <Text style={styles.distanceText}>
            {maxDistance} miles away
          </Text>
        </View>
      </Card>
    </View>
  );
}