import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PenTool, Shuffle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface BioStepProps {
  data: any;
  updateData: (data: any) => void;
}

const bioPrompts = [
  "I'm passionate about...",
  "My ideal weekend involves...",
  "I'm looking for someone who...",
  "You'll find me...",
  "My friends would describe me as...",
  "I believe in...",
];

export function BioStep({ data, updateData }: BioStepProps) {
  const { theme } = useTheme();
  
  const [bio, setBio] = useState(data.bio || '');
  const [currentPrompt, setCurrentPrompt] = useState(0);

  const handleBioChange = (bioText: string) => {
    if (bioText.length <= 500) {
      setBio(bioText);
      updateData({ bio: bioText });
    }
  };

  const usePrompt = () => {
    setBio(bioPrompts[currentPrompt] + ' ');
    updateData({ bio: bioPrompts[currentPrompt] + ' ' });
  };

  const nextPrompt = () => {
    setCurrentPrompt((prev) => (prev + 1) % bioPrompts.length);
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
    bioInput: {
      height: SCREEN_WIDTH < 375 ? 100 : 120,
      textAlignVertical: 'top',
    },
    characterCount: {
      fontSize: SCREEN_WIDTH < 375 ? 11 : 12,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      textAlign: 'right',
      marginTop: 8,
    },
    promptsSection: {
      marginTop: 24,
    },
    promptsTitle: {
      fontSize: SCREEN_WIDTH < 375 ? 15 : 16,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
      marginBottom: 16,
    },
    promptContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: SCREEN_WIDTH < 375 ? 12 : 16,
      marginBottom: 12,
    },
    promptText: {
      flex: 1,
      fontSize: SCREEN_WIDTH < 375 ? 13 : 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.text,
      lineHeight: 18,
    },
    promptButtons: {
      flexDirection: 'row',
      gap: SCREEN_WIDTH < 375 ? 6 : 8,
    },
    promptButton: {
      padding: SCREEN_WIDTH < 375 ? 6 : 8,
      borderRadius: 8,
      backgroundColor: theme.colors.card,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tell us about yourself</Text>
      <Text style={styles.subtitle}>
        Write a bio that captures your personality
      </Text>

      <Card>
        <Input
          label="Bio"
          value={bio}
          onChangeText={handleBioChange}
          placeholder="Tell potential matches about yourself..."
          multiline
          numberOfLines={6}
          style={styles.bioInput}
          leftIcon={<PenTool color={theme.colors.textSecondary} size={20} />}
        />
        
        <Text style={styles.characterCount}>
          {bio.length}/500 characters
        </Text>

        <View style={styles.promptsSection}>
          <Text style={styles.promptsTitle}>Need inspiration? Try this prompt:</Text>
          
          <View style={styles.promptContainer}>
            <Text style={styles.promptText}>{bioPrompts[currentPrompt]}</Text>
            
            <View style={styles.promptButtons}>
              <TouchableOpacity style={styles.promptButton} onPress={usePrompt}>
                <Text style={{ color: theme.colors.primary, fontSize: 12 }}>Use</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.promptButton} onPress={nextPrompt}>
                <Shuffle color={theme.colors.textSecondary} size={16} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Card>
    </View>
  );
}