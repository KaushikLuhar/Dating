import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withDelay,
  runOnJS
} from 'react-native-reanimated';
import { Heart } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';

export default function SplashScreen() {
  const { theme } = useTheme();
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const textOpacity = useSharedValue(0);

  useEffect(() => {
    startAnimations();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        if (isAuthenticated && user) {
          if (!user.isVerified) {
            router.replace('/verification');
          } else if (!user.isProfileComplete) {
            router.replace('/profile-setup');
          } else {
            router.replace('/(app)');
          }
        } else {
          router.replace('/onboarding');
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isLoading, isAuthenticated, user]);

  const startAnimations = () => {
    logoScale.value = withTiming(1, { duration: 800 });
    logoOpacity.value = withTiming(1, { duration: 800 });
    textOpacity.value = withDelay(400, withTiming(1, { duration: 600 }));
  };

  const logoAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: logoScale.value }],
    opacity: logoOpacity.value,
  }));

  const textAnimatedStyle = useAnimatedStyle(() => ({
    opacity: textOpacity.value,
  }));

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    logoContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    appName: {
      fontSize: 32,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      marginBottom: 8,
    },
    tagline: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: 40,
    },
    version: {
      position: 'absolute',
      bottom: 60,
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
    },
    copyright: {
      position: 'absolute',
      bottom: 40,
      fontSize: 10,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
    },
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[logoAnimatedStyle]}>
        <LinearGradient
          colors={theme.colors.gradient}
          style={styles.logoContainer}
        >
          <Heart color="#FFFFFF" size={60} strokeWidth={2} />
        </LinearGradient>
      </Animated.View>

      <Animated.View style={textAnimatedStyle}>
        <Text style={styles.appName}>LoveConnect</Text>
        <Text style={styles.tagline}>Find your perfect match</Text>
      </Animated.View>

      <Text style={styles.version}>Version 1.0.0</Text>
      <Text style={styles.copyright}>© 2025 LoveConnect. All rights reserved.</Text>
    </View>
  );
}