import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Dimensions } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ComponentType<any>;
}

export function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
  icon: Icon,
}: ButtonProps) {
  const { theme } = useTheme();

  const getButtonStyle = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    const sizeStyles = {
      small: { 
        paddingHorizontal: SCREEN_WIDTH < 375 ? 12 : 16, 
        paddingVertical: SCREEN_WIDTH < 375 ? 6 : 8, 
        minHeight: SCREEN_WIDTH < 375 ? 32 : 36 
      },
      medium: { 
        paddingHorizontal: SCREEN_WIDTH < 375 ? 20 : 24, 
        paddingVertical: SCREEN_WIDTH < 375 ? 10 : 12, 
        minHeight: SCREEN_WIDTH < 375 ? 44 : 48 
      },
      large: { 
        paddingHorizontal: SCREEN_WIDTH < 375 ? 28 : 32, 
        paddingVertical: SCREEN_WIDTH < 375 ? 14 : 16, 
        minHeight: SCREEN_WIDTH < 375 ? 52 : 56 
      },
    };

    const variantStyles = {
      primary: {
        backgroundColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
        shadowColor: theme.colors.secondary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
      },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 2,
        borderColor: theme.colors.primary,
      },
      ghost: {
        backgroundColor: 'transparent',
      },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
      opacity: disabled ? 0.5 : 1,
    };
  };

  const getTextStyle = (): TextStyle => {
    const baseStyle: TextStyle = {
      fontFamily: 'Inter-Medium',
      fontWeight: '500',
    };

    const sizeStyles = {
      small: { fontSize: SCREEN_WIDTH < 375 ? 13 : 14 },
      medium: { fontSize: SCREEN_WIDTH < 375 ? 15 : 16 },
      large: { fontSize: SCREEN_WIDTH < 375 ? 16 : 18 },
    };

    const variantStyles = {
      primary: { color: '#FFFFFF' },
      secondary: { color: '#FFFFFF' },
      outline: { color: theme.colors.primary },
      ghost: { color: theme.colors.text },
    };

    return {
      ...baseStyle,
      ...sizeStyles[size],
      ...variantStyles[variant],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      {Icon && <Icon size={20} color={variant === 'primary' || variant === 'secondary' ? '#FFFFFF' : theme.colors.primary} style={{ marginRight: 8 }} />}
      <Text style={[getTextStyle(), textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
}