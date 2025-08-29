import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '@/contexts/ThemeContext';
import { Card } from '@/components/ui/Card';

const mockConversations = [
  { 
    id: '1', 
    name: 'Emma', 
    age: 26, 
    image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'That sounds like a great plan!', 
    time: '2m ago',
    unread: true 
  },
  { 
    id: '2', 
    name: 'Sophia', 
    age: 24, 
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'I love that restaurant too', 
    time: '1h ago',
    unread: false 
  },
];

export default function MessagesScreen() {
  const { theme } = useTheme();

  const renderConversation = ({ item }: any) => (
    <TouchableOpacity>
      <Card style={{ marginBottom: 12 }} padding={16}>
        <View style={styles.conversationItem}>
          <Image source={{ uri: item.image }} style={styles.avatar} />
          <View style={styles.conversationInfo}>
            <Text style={styles.conversationName}>{item.name}, {item.age}</Text>
            <Text style={[styles.lastMessage, item.unread && styles.unreadMessage]}>
              {item.lastMessage}
            </Text>
          </View>
          <View style={styles.conversationMeta}>
            <Text style={styles.conversationTime}>{item.time}</Text>
            {item.unread && <View style={styles.unreadDot} />}
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
    conversationItem: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatar: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 16,
    },
    conversationInfo: {
      flex: 1,
    },
    conversationName: {
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
    unreadMessage: {
      fontFamily: 'Inter-Medium',
      color: theme.colors.text,
    },
    conversationMeta: {
      alignItems: 'flex-end',
    },
    conversationTime: {
      fontSize: 12,
      fontFamily: 'Inter-Regular',
      color: theme.colors.textSecondary,
      marginBottom: 8,
    },
    unreadDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <Text style={styles.subtitle}>{mockConversations.filter(c => c.unread).length} new messages</Text>
      </View>

      <FlatList
        data={mockConversations}
        renderItem={renderConversation}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}