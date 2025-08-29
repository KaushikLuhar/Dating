import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft, Phone } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { PhoneInput } from '@/components/ui/PhoneInput';
import { Card } from '@/components/ui/Card';

export default function PhoneRegisterScreen() {
  const { theme } = useTheme();
  const { register } = useAuth();
  const router = useRouter();

  const [countryCode, setCountryCode] = useState('+1');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState('');

  const validatePhone = () => {
    const phoneRegex = /^\d{10}$/;
    if (!phoneNumber.trim()) {
      setError('Phone number is required');
      return false;
    }
    if (!phoneRegex.test(phoneNumber.replace(/\D/g, ''))) {
      setError('Please enter a valid 10-digit phone number');
      return false;
    }
    if (!agreed) {
      setError('Please accept the terms and conditions');
      return false;
    }
    setError('');
    return true;
  };

  const handleRegister = async () => {
    if (!validatePhone()) return;

    setIsLoading(true);
    try {
      const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      const success = await register({ phoneNumber: fullPhoneNumber });
      
      if (success) {
        router.replace('/verification');
      } else {
        Alert.alert('Registration Failed', 'Unable to register. Please try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    backButton: {
      padding: 8,
      marginRight: 16,
    },
    headerTitle: {
      fontSize: 20,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
    },
    title: {
      fontSize: 28,
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
      marginBottom: 40,
    },
    phoneContainer: {
      flexDirection: 'row',
      gap: 12,
      marginBottom: 16,
      width: '100%',
      alignItems: 'stretch',
    },
    countryCode: {
      width: 40,
      minWidth: 40,
      maxWidth: 40,
    },
    phoneInput: {
      flex: 1,
      minWidth: 0,
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginVertical: 24,
      gap: 12,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.colors.border,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 2,
    },
    checkboxChecked: {
      backgroundColor: theme.colors.primary,
      borderColor: theme.colors.primary,
    },
    checkboxText: {
      flex: 1,
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      lineHeight: 20,
    },
    termsLink: {
      color: theme.colors.primary,
    },
    errorText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.error,
      textAlign: 'center',
      marginBottom: 16,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.replace('/auth')}
        >
          <ArrowLeft color={theme.colors.text} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Phone Registration</Text>
      </View>

      <ScrollView 
        style={styles.content}
        contentContainerStyle={{ justifyContent: 'center' }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Enter Your Phone</Text>
        <Text style={styles.subtitle}>
          We'll send you a verification code to confirm your number
        </Text>

        <Card>
          <View style={styles.phoneContainer}>
            <PhoneInput
              style={styles.countryCode}
              value={countryCode}
              onChangeText={setCountryCode}
              placeholder="+1"
              keyboardType="phone-pad"
              maxLength={4}
            />
            <PhoneInput
              style={styles.phoneInput}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              placeholder="(555) 123-4567"
              keyboardType="phone-pad"
              leftIcon={<Phone color={theme.colors.textSecondary} size={20} />}
              maxLength={15}
            />
          </View>

          <View style={styles.checkboxContainer}>
            <TouchableOpacity 
              style={[styles.checkbox, agreed && styles.checkboxChecked]}
              onPress={() => setAgreed(!agreed)}
            >
              {agreed && <Text style={{ color: '#FFFFFF', fontSize: 12 }}>✓</Text>}
            </TouchableOpacity>
            <Text style={styles.checkboxText}>
              I agree to the{' '}
              <Text style={styles.termsLink}>Terms of Service</Text>
              {' '}and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            title="Continue"
            onPress={handleRegister}
            disabled={isLoading}
            size="large"
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
}