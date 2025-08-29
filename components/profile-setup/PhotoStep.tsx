import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from 'react-native';
import { Camera, Plus, X } from 'lucide-react-native';
import * as ImagePicker from 'expo-image-picker';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

interface PhotoStepProps {
  data: any;
  updateData: (data: any) => void;
}

export function PhotoStep({ data, updateData }: PhotoStepProps) {
  const { theme } = useTheme();
  
  const [photos, setPhotos] = useState<string[]>(data.photos || []);

  const pickImage = async () => {
    if (photos.length >= 6) {
      Alert.alert('Photo Limit', 'You can upload up to 6 photos');
      return;
    }

    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permission Required', 'Please grant permission to access your photos');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      const newPhotos = [...photos, result.assets[0].uri];
      setPhotos(newPhotos);
      updateData({ photos: newPhotos });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    setPhotos(newPhotos);
    updateData({ photos: newPhotos });
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
    photosGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 24,
    },
    photoSlot: {
      width: '48%',
      aspectRatio: 3/4,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      borderWidth: 2,
      borderColor: theme.colors.border,
      borderStyle: 'dashed',
      justifyContent: 'center',
      alignItems: 'center',
    },
    photoSlotFilled: {
      borderStyle: 'solid',
      padding: 0,
      overflow: 'hidden',
    },
    photo: {
      width: '100%',
      height: '100%',
      borderRadius: 10,
    },
    photoOverlay: {
      position: 'absolute',
      top: 8,
      right: 8,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      borderRadius: 12,
      padding: 4,
    },
    addPhotoText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: theme.colors.textSecondary,
      marginTop: 8,
    },
    tips: {
      backgroundColor: theme.colors.surface,
      borderRadius: 12,
      padding: 16,
    },
    tipsTitle: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
      marginBottom: 12,
    },
    tip: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      marginBottom: 8,
      lineHeight: 20,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Your Photos</Text>
      <Text style={styles.subtitle}>
        Upload 2-6 photos to show your personality
      </Text>

      <Card>
        <View style={styles.photosGrid}>
          {Array.from({ length: 6 }).map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.photoSlot,
                photos[index] && styles.photoSlotFilled,
              ]}
              onPress={photos[index] ? undefined : pickImage}
            >
              {photos[index] ? (
                <>
                  <Image source={{ uri: photos[index] }} style={styles.photo} />
                  <TouchableOpacity
                    style={styles.photoOverlay}
                    onPress={() => removePhoto(index)}
                  >
                    <X color="#FFFFFF" size={16} />
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Plus color={theme.colors.textSecondary} size={24} />
                  <Text style={styles.addPhotoText}>
                    {index === 0 ? 'Add Photo' : 'Optional'}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.tips}>
          <Text style={styles.tipsTitle}>Photo Tips</Text>
          <Text style={styles.tip}>• Use recent photos that clearly show your face</Text>
          <Text style={styles.tip}>• Include a variety of photos - close-ups and full body</Text>
          <Text style={styles.tip}>• Show your interests and hobbies</Text>
          <Text style={styles.tip}>• Avoid group photos as your main picture</Text>
        </View>
      </Card>
    </View>
  );
}