import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Heart, X, Settings, Sun, Moon } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function DiscoverScreen() {
  const { theme, toggleTheme, isDark } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    logo: {
      fontSize: 24,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
    },
    headerButtons: {
      flexDirection: 'row',
      gap: 12,
    },
    headerButton: {
      padding: 8,
      borderRadius: 8,
      backgroundColor: theme.colors.surface,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
      justifyContent: 'center',
    },
    cardContainer: {
      width: SCREEN_WIDTH - 48,
      height: SCREEN_WIDTH * 1.4,
      borderRadius: 20,
      overflow: 'hidden',
      alignSelf: 'center',
      marginBottom: 40,
    },
    profileCard: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    cardOverlay: {
      padding: 24,
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    profileName: {
      fontSize: 28,
      fontFamily: 'Inter-SemiBold',
      color: '#FFFFFF',
      marginBottom: 4,
    },
    profileAge: {
      fontSize: 20,
      fontFamily: 'Inter-Medium',
      color: '#FFFFFF',
      opacity: 0.9,
    },
    profileBio: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: '#FFFFFF',
      marginTop: 12,
      opacity: 0.9,
      lineHeight: 22,
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 32,
    },
    actionButton: {
      width: 64,
      height: 64,
      borderRadius: 32,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 4,
    },
    passButton: {
      backgroundColor: '#FFFFFF',
    },
    likeButton: {
      width: 72,
      height: 72,
      borderRadius: 36,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>LoveConnect</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.headerButton} onPress={toggleTheme}>
            {isDark ? 
              <Sun color={theme.colors.text} size={20} /> :
              <Moon color={theme.colors.text} size={20} />
            }
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Settings color={theme.colors.text} size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.cardContainer}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(0,0,0,0.7)']}
            style={styles.profileCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
          >
            <View style={styles.cardOverlay}>
              <Text style={styles.profileName}>Sarah, 28</Text>
              <Text style={styles.profileBio}>
                Love hiking, coffee, and good conversations. Looking for someone genuine to share adventures with.
              </Text>
            </View>
          </LinearGradient>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity style={[styles.actionButton, styles.passButton]}>
            <X color="#FF6B6B" size={28} strokeWidth={3} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <LinearGradient
              colors={theme.colors.gradient}
              style={[styles.actionButton, styles.likeButton]}
            >
              <Heart color="#FFFFFF" size={32} strokeWidth={3} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}