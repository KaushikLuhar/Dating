import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

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
      paddingHorizontal: 16,
      minHeight: 52,
      shadowColor: theme.colors.primary,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: isFocused ? 0.1 : 0,
      shadowRadius: 4,
      elevation: isFocused ? 2 : 0,
    },
    input: {
      flex: 1,
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: theme.colors.text,
      paddingVertical: 12,
      marginLeft: leftIcon ? 12 : 0,
      marginRight: rightIcon ? 12 : 0,
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
