import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, Dimensions } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  noMargin?: boolean;
}

export function Input({
  label,
  error,
  leftIcon,
  rightIcon,
  style,
  noMargin = false,
  ...props
}: InputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    container: {
      marginBottom: noMargin ? 0 : 16,
    },
    label: {
      fontSize: SCREEN_WIDTH < 375 ? 13 : 14,
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: error 
        ? theme.colors.error 
        : isFocused 
          ? theme.colors.primary 
          : theme.colors.border,
      paddingHorizontal: SCREEN_WIDTH < 375 ? 12 : 16,
      minHeight: SCREEN_WIDTH < 375 ? 48 : 52,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isFocused ? 0.1 : 0,
      shadowRadius: 4,
      elevation: isFocused ? 2 : 0,
    },
    input: {
      flex: 1,
      fontSize: SCREEN_WIDTH < 375 ? 15 : 16,
      fontFamily: 'Inter-Regular',
      color: theme.colors.text,
      paddingVertical: 12,
      marginLeft: leftIcon ? (SCREEN_WIDTH < 375 ? 8 : 12) : 0,
      marginRight: rightIcon ? (SCREEN_WIDTH < 375 ? 8 : 12) : 0,
    },
    error: {
      fontSize: SCREEN_WIDTH < 375 ? 11 : 12,
      fontFamily: 'Inter-Regular',
      color: theme.colors.error,
      marginTop: 4,
    },
  });

  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <View style={styles.inputContainer}>
        {leftIcon}
        <TextInput
          style={[styles.input, style]}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholderTextColor={theme.colors.textSecondary}
          {...props}
        />
        {rightIcon}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}