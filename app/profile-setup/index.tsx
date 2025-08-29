import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import PagerView from '@/components/ui/WebPagerView';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { useTheme } from '@/contexts/ThemeContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/Button';
import { BasicInfoStep } from '@/components/profile-setup/BasicInfoStep';
import { LocationStep } from '@/components/profile-setup/LocationStep';
import { PhotoStep } from '@/components/profile-setup/PhotoStep';
import { BioStep } from '@/components/profile-setup/BioStep';
import { InterestsStep } from '@/components/profile-setup/InterestsStep';
import { PreferencesStep } from '@/components/profile-setup/PreferencesStep';

const steps = [
  { title: 'Basic Info', component: BasicInfoStep },
  { title: 'Location', component: LocationStep },
  { title: 'Photos', component: PhotoStep },
  { title: 'About You', component: BioStep },
  { title: 'Interests', component: InterestsStep },
  { title: 'Preferences', component: PreferencesStep },
];

export default function ProfileSetupScreen() {
  const { theme } = useTheme();
  const { updateUser } = useAuth();
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({});

  const updateProfileData = (data: any) => {
    setProfileData(prev => ({ ...prev, ...data }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      completeSetup();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const completeSetup = async () => {
    try {
      await updateUser({ 
        ...profileData, 
        isProfileComplete: true 
      });
      router.replace('/(app)');
    } catch (error) {
      console.error('Failed to complete profile setup:', error);
    }
  };

  const CurrentStepComponent = steps[currentStep].component;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 16,
    },
    headerLeft: {
      flexDirection: 'row',
      alignItems: 'center',
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
    stepCounter: {
      fontSize: 16,
      fontFamily: 'Inter-Medium',
      color: theme.colors.textSecondary,
    },
    progressContainer: {
      paddingHorizontal: 24,
      marginBottom: 20,
    },
    progressBar: {
      height: 6,
      backgroundColor: theme.colors.border,
      borderRadius: 3,
      overflow: 'hidden',
    },
    progressFill: {
      height: '100%',
      borderRadius: 3,
    },
    content: {
      flex: 1,
      paddingHorizontal: 24,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 20,
      gap: 16,
    },
    backButtonFooter: {
      flex: 1,
    },
    nextButtonFooter: {
      flex: 2,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {currentStep > 0 && (
            <TouchableOpacity 
              style={styles.backButton}
              onPress={prevStep}
            >
              <ArrowLeft color={theme.colors.text} size={24} />
            </TouchableOpacity>
          )}
          <Text style={styles.headerTitle}>{steps[currentStep].title}</Text>
        </View>
        <Text style={styles.stepCounter}>
          {currentStep + 1} of {steps.length}
        </Text>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { 
                width: `${((currentStep + 1) / steps.length) * 100}%`,
                backgroundColor: theme.colors.primary 
              }
            ]} 
          />
        </View>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <CurrentStepComponent 
          data={profileData}
          updateData={updateProfileData}
        />
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 0 && (
          <Button
            title="Back"
            onPress={prevStep}
            variant="ghost"
            size="large"
            style={styles.backButtonFooter}
          />
        )}
        <Button
          title={currentStep === steps.length - 1 ? "Complete" : "Continue"}
          onPress={nextStep}
          size="large"
          style={styles.nextButtonFooter}
        />
      </View>
    </SafeAreaView>
  );
}