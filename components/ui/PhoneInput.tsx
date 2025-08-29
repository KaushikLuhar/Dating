import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps, Dimensions } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface PhoneInputProps extends TextInputProps {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export function PhoneInput({
  leftIcon,
  rightIcon,
  style,
  ...props
}: PhoneInputProps) {
  const { theme } = useTheme();
  const [isFocused, setIsFocused] = useState(false);

  const styles = StyleSheet.create({
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.colors.card,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: isFocused ? theme.colors.primary : theme.colors.border,
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
      minWidth: 0,
      textAlignVertical: 'center',
    },
  });

  return (
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
  );
}
