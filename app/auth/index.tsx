import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { Heart, Phone, Mail, Chrome } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function AuthChoiceScreen() {
  const { theme } = useTheme();
  const router = useRouter();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    scrollContainer: {
      flexGrow: 1,
      paddingHorizontal: 24,
    },
    header: {
      alignItems: 'center',
      marginBottom: 48,
    },
    logoContainer: {
      width: 80,
      height: 80,
      borderRadius: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 24,
    },
    title: {
      fontSize: 32,
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
    },
    authOptions: {
      gap: 16,
      marginBottom: 32,
    },
    authButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 16,
      padding: 18,
      borderWidth: 1,
      borderColor: theme.colors.border,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 2,
    },
    authButtonText: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
      marginLeft: 12,
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
    footer: {
      alignItems: 'center',
      marginTop: 32,
    },
    loginLink: {
      marginTop: 16,
    },
    loginText: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      textAlign: 'center',
    },
    loginHighlight: {
      color: theme.colors.primary,
      fontFamily: 'Inter-Medium',
    },
    legalText: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      textAlign: 'center',
      lineHeight: 18,
      marginTop: 24,
      paddingHorizontal: 32,
    },
    legalLink: {
      color: theme.colors.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={[styles.scrollContainer, { justifyContent: 'center' }]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <LinearGradient
            colors={theme.colors.gradient}
            style={styles.logoContainer}
          >
            <Heart color="#FFFFFF" size={40} strokeWidth={2} />
          </LinearGradient>
          <Text style={styles.title}>Welcome to LoveConnect</Text>
          <Text style={styles.subtitle}>
            Join millions finding meaningful connections
          </Text>
        </View>

        <Card padding={0} style={styles.authOptions}>
          <TouchableOpacity 
            style={styles.authButton}
            onPress={() => router.push('/auth/phone-register')}
          >
            <Phone color={theme.colors.primary} size={24} />
            <Text style={styles.authButtonText}>Continue with Phone</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.authButton}
            onPress={() => router.push('/auth/email-register')}
          >
            <Mail color={theme.colors.secondary} size={24} />
            <Text style={styles.authButtonText}>Continue with Email</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.authButton}>
            <Chrome color="#4285F4" size={24} />
            <Text style={styles.authButtonText}>Continue with Google</Text>
          </TouchableOpacity>
        </Card>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <Button
          title="Sign In"
          onPress={() => router.push('/auth/login')}
          variant="outline"
          size="large"
        />

        <TouchableOpacity style={styles.loginLink}>
          <Text style={styles.loginText}>
            Already have an account?{' '}
            <Text style={styles.loginHighlight}>Log In</Text>
          </Text>
        </TouchableOpacity>

        <Text style={styles.legalText}>
          By continuing, you agree to our{' '}
          <Text style={styles.legalLink}>Terms of Service</Text> and{' '}
          <Text style={styles.legalLink}>Privacy Policy</Text>. 
          Must be 18+ to join.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}