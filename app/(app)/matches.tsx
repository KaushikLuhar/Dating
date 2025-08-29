import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MessageCircle } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';

const mockMatches = [
  { id: '1', name: 'Emma', age: 26, image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400', lastMessage: 'Hey! How was your day?', time: '2m ago' },
  { id: '2', name: 'Sophia', age: 24, image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400', lastMessage: 'That sounds amazing!', time: '1h ago' },
  { id: '3', name: 'Mia', age: 29, image: 'https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=400', lastMessage: 'Coffee sounds great ☕', time: '3h ago' },
];

export default function MatchesScreen() {
  const { theme } = useTheme();

  const renderMatch = ({ item }: any) => (
    <TouchableOpacity>
      <Card style={{ marginBottom: 12 }} padding={16}>
        <View style={styles.matchItem}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          <View style={styles.matchInfo}>
            <Text style={styles.matchName}>{item.name}, {item.age}</Text>
            <Text style={styles.lastMessage}>{item.lastMessage}</Text>
          </View>
          <View style={styles.matchMeta}>
            <Text style={styles.matchTime}>{item.time}</Text>
            <MessageCircle color={theme.colors.primary} size={20} />
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      paddingHorizontal: 24,
      paddingVertical: 20,
    },
    title: {
      fontSize: 28,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
    },
    list: {
      paddingHorizontal: 24,
    },
    matchItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 16,
    },
    matchInfo: {
      flex: 1,
    },
    matchName: {
      fontSize: 18,
      fontFamily: 'Inter-SemiBold',
      color: theme.colors.text,
      marginBottom: 4,
    },
    lastMessage: {
      fontSize: 14,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
    },
    matchMeta: {
      alignItems: 'flex-end',
    },
    matchTime: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Your Matches</Text>
        <Text style={styles.subtitle}>{mockMatches.length} new matches</Text>
      </View>

      <FlatList
        data={mockMatches}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}