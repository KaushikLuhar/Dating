import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';

export default function VerificationScreen() {
  const { theme } = useTheme();
  const { user, verifyOTP, resendOTP } = useAuth();
  const router = useRouter();

  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef<any[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleCodeChange = (value: string, index: number) => {
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to next input if value is entered
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-verify when all digits are entered
    if (newCode.every(digit => digit !== '') && newCode.length === 6) {
      handleVerification(newCode.join(''));
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    // Move to previous input on backspace if current input is empty
    if (e.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleVerification = async (verificationCode: string) => {
    setIsLoading(true);
    try {
      const success = await verifyOTP(verificationCode);
      if (success) {
        router.replace('/profile-setup');
      } else {
        Alert.alert('Invalid Code', 'The verification code is incorrect. Please try again.');
        setCode(['', '', '', '', '', '']);
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    if (!canResend) return;

    setIsLoading(true);
    try {
      const success = await resendOTP();
      if (success) {
        setTimer(60);
        setCanResend(false);
        Alert.alert('Code Sent', 'A new verification code has been sent.');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to resend code. Please try again.');
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
      justifyContent: 'center',
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
    phoneNumber: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
      textAlign: 'center',
      marginBottom: 32,
    },
    codeContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginBottom: 32,
      paddingHorizontal: 12,
    },
    codeInput: {
      width: 45,
      height: 55,
      borderRadius: 12,
      backgroundColor: theme.colors.surface,
      borderWidth: 2,
      borderColor: theme.colors.border,
      fontSize: 20,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
      textAlign: 'center',
      paddingHorizontal: 8,
    },
    codeInputFocused: {
      borderColor: theme.colors.primary,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 2,
    },
    resendContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 24,
    },
    resendText: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
    },
    resendButton: {
      padding: 8,
    },
    resendButtonText: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: canResend ? theme.colors.primary : theme.colors.textSecondary,
    },
    timer: {
      fontSize: 14,
      fontFamily: 'Inter-Medium',
      color: theme.colors.primary,
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
        <Text style={styles.headerTitle}>Verification</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We've sent a 6-digit code to
        </Text>
        <Text style={styles.phoneNumber}>
          {user?.phoneNumber || user?.email}
        </Text>

        <Card>
          <View style={styles.codeContainer}>
            {code.map((digit, index) => (
              <TextInput
                key={index}
                ref={(ref) => (inputRefs.current[index] = ref)}
                style={[
                  styles.codeInput,
                  digit && styles.codeInputFocused,
                ]}
                onChangeText={(value) => handleCodeChange(value, index)}
                onKeyPress={(e) => handleKeyPress(e, index)}
                value={digit}
                maxLength={1}
                keyboardType="number-pad"
                autoFocus={index === 0}
                placeholderTextColor={theme.colors.textSecondary}
                selectTextOnFocus={true}
              />
            ))}
          </View>

          <Button
            title="Verify"
            onPress={() => handleVerification(code.join(''))}
            disabled={isLoading || code.some(digit => !digit)}
            size="large"
          />

          <View style={styles.resendContainer}>
            <Text style={styles.resendText}>Didn't receive the code? </Text>
            {canResend ? (
              <TouchableOpacity style={styles.resendButton} onPress={handleResend}>
                <Text style={styles.resendButtonText}>Resend</Text>
              </TouchableOpacity>
            ) : (
              <Text style={styles.timer}>Resend in {timer}s</Text>
            )}
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}