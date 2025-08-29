import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, Calendar } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Input } from '@/components/ui/Input';
import { Card } from '@/components/ui/Card';

interface BasicInfoStepProps {
  data: any;
  updateData: (data: any) => void;
}

export function BasicInfoStep({ data, updateData }: BasicInfoStepProps) {
  const { theme } = useTheme();
  
  const [fullName, setFullName] = useState(data.fullName || '');
  const [selectedGender, setSelectedGender] = useState(data.gender || '');
  const [pronouns, setPronouns] = useState(data.pronouns || '');

  const genderOptions = [
    { label: 'Man', value: 'male' },
    { label: 'Woman', value: 'female' },
    { label: 'Non-binary', value: 'non-binary' },
    { label: 'Other', value: 'other' },
  ];

  const handleNameChange = (name: string) => {
    setFullName(name);
    updateData({ fullName: name });
  };

  const handleGenderSelect = (gender: string) => {
    setSelectedGender(gender);
    updateData({ gender });
  };

  const handlePronounsChange = (pronounsText: string) => {
    setPronouns(pronounsText);
    updateData({ pronouns: pronounsText });
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
    section: {
      marginBottom: 24,
    },
    sectionTitle: {
      fontSize: 18,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
      marginBottom: 16,
    },
    genderGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    genderOption: {
      flex: 1,
      minWidth: '45%',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
      borderWidth: 2,
      borderColor: theme.colors.border,
      alignItems: 'center',
    },
    genderOptionSelected: {
      borderColor: theme.colors.primary,
      backgroundColor: `${theme.colors.primary}10`,
    },
    genderText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
    },
    genderTextSelected: {
      color: theme.colors.primary,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Let's get to know you</Text>
      <Text style={styles.subtitle}>
        Tell us a bit about yourself to get started
      </Text>

      <Card>
        <View style={styles.section}>
          <Input
            label="Full Name"
            value={fullName}
            onChangeText={handleNameChange}
            placeholder="Enter your full name"
            leftIcon={<User color={theme.colors.textSecondary} size={20} />}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Gender</Text>
          <View style={styles.genderGrid}>
            {genderOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                style={[
                  styles.genderOption,
                  selectedGender === option.value && styles.genderOptionSelected,
                ]}
                onPress={() => handleGenderSelect(option.value)}
              >
                <Text 
                  style={[
                    styles.genderText,
                    selectedGender === option.value && styles.genderTextSelected,
                  ]}
                >
                  {option.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Input
            label="Pronouns (Optional)"
            value={pronouns}
            onChangeText={handlePronounsChange}
            placeholder="e.g., he/him, she/her, they/them"
          />
        </View>
      </Card>
    </View>
  );
}