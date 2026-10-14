import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import ChatScreen from './src/screens/ChatScreen';
import HistoryScreen from './src/screens/HistoryScreen';
import HomeScreen from './src/screens/HomeScreen';
import OnboardingScreen from './src/screens/OnboardingScreen';
import PrivacyPolicyScreen from './src/screens/PrivacyPolicyScreen';
import SettingsScreen from './src/screens/SettingsScreen';
import { hasSeenOnboarding } from './src/storage';
import { navigationTheme, colors } from './src/theme';

const Stack = createNativeStackNavigator();

function LoadingScreen() {
  return (
    <View style={styles.loading}>
      <View style={styles.loadingMark}><ActivityIndicator color={colors.background} /></View>
    </View>
  );
}

function MainNavigator() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <StatusBar style="light" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: colors.surface },
          headerTintColor: colors.text,
          headerTitleStyle: { fontWeight: '800' },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Chat" component={ChatScreen} options={{ title: 'Chat' }} />
        <Stack.Screen name="History" component={HistoryScreen} options={{ title: 'Histórico' }} />
        <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configurações' }} />
        <Stack.Screen name="Privacy" component={PrivacyPolicyScreen} options={{ title: 'Privacidade' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  const [booting, setBooting] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    hasSeenOnboarding().then((seen) => {
      setShowOnboarding(!seen);
      setBooting(false);
    });
  }, []);

  if (booting) return <LoadingScreen />;
  if (showOnboarding) return <OnboardingScreen onComplete={() => setShowOnboarding(false)} />;
  return <MainNavigator />;
}

const styles = StyleSheet.create({
  loading: { flex: 1, backgroundColor: colors.background, alignItems: 'center', justifyContent: 'center' },
  loadingMark: { width: 54, height: 54, borderRadius: 18, backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center' },
});
