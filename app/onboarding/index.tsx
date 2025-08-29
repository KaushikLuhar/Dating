import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming,
  interpolate,
} from 'react-native-reanimated';
import PagerView from '@/components/ui/WebPagerView';
import { Heart, Users, MessageCircle, Shield, ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const onboardingData = [
  {
    icon: Heart,
    title: 'Find Your Perfect Match',
    description: 'Discover meaningful connections with people who share your interests and values.',
    color: '#FF6B6B',
  },
  {
    icon: Users,
    title: 'Smart Matching',
    description: 'Our advanced algorithm helps you find compatible matches based on your preferences.',
    color: '#4ECDC4',
  },
  {
    icon: MessageCircle,
    title: 'Start Conversations',
    description: 'Break the ice with fun conversation starters and meaningful chats.',
    color: '#45B7D1',
  },
  {
    icon: Shield,
    title: 'Safe & Secure',
    description: 'Your safety is our priority. Verified profiles and secure messaging.',
    color: '#10B981',
  },
];

export default function OnboardingScreen() {
  const { theme } = useTheme();
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(0);
  const pagerRef = useRef<PagerView>(null);
  const progressWidth = useSharedValue(0);

  const animatedProgressStyle = useAnimatedStyle(() => ({
    width: `${progressWidth.value}%`,
  }));

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    progressWidth.value = withTiming(((page + 1) / onboardingData.length) * 100);
  };

  const nextPage = () => {
    if (currentPage < onboardingData.length - 1) {
      pagerRef.current?.setPage(currentPage + 1);
    } else {
      router.replace('/auth');
    }
  };

  const skipOnboarding = () => {
    router.replace('/auth');
  };

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
      paddingTop: 16,
    },
    skipButton: {
      padding: 8,
    },
    skipText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: theme.colors.textSecondary,
    },
    progressContainer: {
      paddingHorizontal: 24,
      marginTop: 20,
    },
    progressBar: {
      height: 4,
      backgroundColor: theme.colors.border,
      borderRadius: 2,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 2,
    },
    pager: {
      flex: 1,
      marginTop: 40,
    },
    page: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 32,
    },
    iconContainer: {
      width: 120,
      height: 120,
      borderRadius: 60,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 40,
    },
    title: {
      fontSize: 28,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 16,
    },
    description: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 24,
      paddingHorizontal: 16,
    },
    footer: {
      paddingHorizontal: 24,
      paddingBottom: 40,
    },
    buttonContainer: {
      marginTop: 20,
    },
  });

  const renderPage = (item: typeof onboardingData[0], index: number) => {
    const IconComponent = item.icon;
    
    return (
      <View key={index} style={styles.page}>
        <LinearGradient
          colors={[item.color, `${item.color}80`]}
          style={styles.iconContainer}
        >
          <IconComponent color="#FFFFFF" size={60} strokeWidth={2} />
        </LinearGradient>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={{ width: 40 }} />
        <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[animatedProgressStyle]}>
            <LinearGradient
              colors={theme.colors.gradient}
              style={{ height: '100%', borderRadius: 2 }}
            />
          </Animated.View>
        </View>
      </View>

      <PagerView
        ref={pagerRef}
        style={styles.pager}
        initialPage={0}
        onPageSelected={(e) => handlePageChange(e.nativeEvent.position)}
      >
        {onboardingData.map((item, index) => renderPage(item, index))}
      </PagerView>

      <View style={styles.footer}>
        <Button
          title={currentPage === onboardingData.length - 1 ? "Get Started" : "Continue"}
          onPress={nextPage}
          size="large"
        />
      </View>
    </SafeAreaView>
  );
}