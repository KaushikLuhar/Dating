import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';

interface InterestsStepProps {
  data: any;
  updateData: (data: any) => void;
}

const interestCategories = [
  {
    name: 'Hobbies',
    interests: ['Reading', 'Gaming', 'Cooking', 'Gardening', 'Photography', 'Art', 'Music', 'Dancing'],
  },
  {
    name: 'Sports',
    interests: ['Football', 'Basketball', 'Tennis', 'Swimming', 'Yoga', 'Running', 'Hiking', 'Cycling'],
  },
  {
    name: 'Entertainment',
    interests: ['Movies', 'TV Shows', 'Theater', 'Concerts', 'Comedy', 'Museums', 'Books', 'Podcasts'],
  },
  {
    name: 'Food & Drink',
    interests: ['Coffee', 'Wine', 'Craft Beer', 'Fine Dining', 'Street Food', 'Vegetarian', 'Baking', 'BBQ'],
  },
];

export function InterestsStep({ data, updateData }: InterestsStepProps) {
  const { theme } = useTheme();
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>(data.interests || []);

  const toggleInterest = (interest: string) => {
    let newInterests;
    if (selectedInterests.includes(interest)) {
      newInterests = selectedInterests.filter(i => i !== interest);
    } else {
      if (selectedInterests.length >= 10) {
        return; // Max 10 interests
      }
      newInterests = [...selectedInterests, interest];
    }
    
    setSelectedInterests(newInterests);
    updateData({ interests: newInterests });
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
    counter: {
      fontSize: SCREEN_WIDTH < 375 ? 13 : 14,
      fontFamily: 'Inter-Medium',
      color: theme.colors.primary,
      textAlign: 'center',
      marginBottom: 24,
    },
    categoryContainer: {
      marginBottom: 24,
    },
    categoryTitle: {
      fontSize: SCREEN_WIDTH < 375 ? 16 : 18,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
      marginBottom: 12,
    },
    interestsGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: SCREEN_WIDTH < 375 ? 6 : 8,
    },
    interestChip: {
      paddingHorizontal: SCREEN_WIDTH < 375 ? 12 : 16,
      paddingVertical: SCREEN_WIDTH < 375 ? 6 : 8,
      borderRadius: 20,
      backgroundColor: theme.colors.surface,
      borderWidth: 1,
      borderColor: theme.colors.border,
      marginBottom: 4,
    },
    interestChipSelected: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    interestText: {
      fontSize: SCREEN_WIDTH < 375 ? 13 : 14,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
    },
    interestTextSelected: {
      color: '#FFFFFF',
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What are you into?</Text>
      <Text style={styles.subtitle}>
        Select up to 10 interests to help us find your perfect match
      </Text>
      
      <Text style={styles.counter}>
        {selectedInterests.length}/10 selected
      </Text>

      <Card>
        {interestCategories.map((category) => (
          <View key={category.name} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category.name}</Text>
            <View style={styles.interestsGrid}>
              {category.interests.map((interest) => (
                <TouchableOpacity
                  key={interest}
                  style={[
                    styles.interestChip,
                    selectedInterests.includes(interest) && styles.interestChipSelected,
                  ]}
                  onPress={() => toggleInterest(interest)}
                >
                  <Text 
                    style={[
                      styles.interestText,
                      selectedInterests.includes(interest) && styles.interestTextSelected,
                    ]}
                  >
                    {interest}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </Card>
    </View>
  );
}