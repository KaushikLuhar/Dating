import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="phone-register" />
      <Stack.Screen name="email-register" />
      <Stack.Screen name="password-recovery" />
    </Stack>
  );
}