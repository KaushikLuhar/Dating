import React from 'react';
import { View, StyleSheet, ViewStyle, Dimensions } from 'react-native';
import { useTheme } from '@/contexts/ThemeContext';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  padding?: number;
}

export function Card({ children, style, padding = 24 }: CardProps) {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: SCREEN_WIDTH < 375 ? 12 : 16,
      padding,
      shadowColor: theme.colors.text,
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: SCREEN_WIDTH < 375 ? 8 : 12,
      elevation: 4,
      borderWidth: 1,
      borderColor: theme.colors.border,
    },
  });

  return <View style={[styles.card, style]}>{children}</View>;
}