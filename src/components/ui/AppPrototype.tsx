"use client";
import React, { useState } from 'react';
import { PhoneFrame } from '@/components/ui/PhoneFrame';
import { BottomTabBar, TabType } from '@/components/ui/BottomTabBar';
import { AnimatePresence, motion } from 'framer-motion';

// Screens
import { SplashScreen } from '@/components/screens/SplashScreen';
import { OnboardingScreen } from '@/components/screens/OnboardingScreen';
import { LoginScreen } from '@/components/screens/LoginScreen';
import { HomeScreen } from '@/components/screens/HomeScreen';
import { DestinationSearchScreen } from '@/components/screens/DestinationSearchScreen';
import { VehicleSelectionScreen } from '@/components/screens/VehicleSelectionScreen';
import { DriverMatchingScreen } from '@/components/screens/DriverMatchingScreen';
import { LiveTrackingScreen } from '@/components/screens/LiveTrackingScreen';
import { RideCompletionScreen } from '@/components/screens/RideCompletionScreen';
import { PaymentScreen } from '@/components/screens/PaymentScreen';
import { SafetyCenterScreen } from '@/components/screens/SafetyCenterScreen';
import { StudentPassScreen } from '@/components/screens/StudentPassScreen';
import { RideHistoryScreen } from '@/components/screens/RideHistoryScreen';
import { WalletScreen } from '@/components/screens/WalletScreen';
import { ProfileScreen } from '@/components/screens/ProfileScreen';
import { NotificationsScreen } from '@/components/screens/NotificationsScreen';
import { HelpSupportScreen } from '@/components/screens/HelpSupportScreen';
import { AppSettingsScreen } from '@/components/screens/AppSettingsScreen';
import { ScheduleRideScreen } from '@/components/screens/ScheduleRideScreen';
import { PromoReferralScreen } from '@/components/screens/PromoReferralScreen';
import { SavedLocationsScreen } from '@/components/screens/SavedLocationsScreen';
import { NightRideScreen } from '@/components/screens/NightRideScreen';
import { CampusPoolScreen } from '@/components/screens/CampusPoolScreen';

export type ScreenType =
  | 'splash' | 'onboarding' | 'login'
  | 'home' | 'search' | 'vehicle' | 'driverMatching' | 'tracking' | 'completion' | 'payment'
  | 'safety' | 'pass' | 'schedule' | 'savedLocations'
  | 'rides' | 'wallet' | 'profile'
  | 'notifications' | 'help' | 'settings' | 'promo'
  | 'nightRide' | 'campusPool';

const SHOW_TAB_BAR: ScreenType[] = ['home', 'rides', 'wallet', 'profile'];

const screenToTab: Partial<Record<ScreenType, TabType>> = {
  home: 'home',
  search: 'home',
  vehicle: 'home',
  driverMatching: 'home',
  tracking: 'home',
  completion: 'home',
  payment: 'home',
  schedule: 'home',
  savedLocations: 'home',
  rides: 'rides',
  wallet: 'wallet',
  profile: 'profile',
  notifications: 'profile',
  help: 'profile',
  settings: 'profile',
  promo: 'profile',
  safety: 'home',
  pass: 'home',
  nightRide: 'home',
  campusPool: 'home',
};

interface AppPrototypeProps {
  initialScreen?: ScreenType;
  currentScreen?: ScreenType;
  onScreenChange?: (screen: ScreenType) => void;
  isFullScreen?: boolean;
}

export function AppPrototype({
  initialScreen = 'splash',
  currentScreen: externalScreen,
  onScreenChange,
  isFullScreen = false,
}: AppPrototypeProps) {
  const [internalScreen, setInternalScreen] = useState<ScreenType>(initialScreen);
  const currentScreen = externalScreen !== undefined ? externalScreen : internalScreen;

  const nav = (screen: ScreenType) => {
    setInternalScreen(screen);
    onScreenChange?.(screen);
  };

  const showTabBar = SHOW_TAB_BAR.includes(currentScreen);
  const activeTab = (screenToTab[currentScreen] ?? 'home') as TabType;

  const handleTabChange = (tab: TabType) => {
    const tabScreenMap: Record<TabType, ScreenType> = {
      home: 'home',
      rides: 'rides',
      wallet: 'wallet',
      profile: 'profile',
    };
    nav(tabScreenMap[tab]);
  };

  const content = (
    <div className="absolute inset-0 overflow-hidden bg-brand-dark shadow-[0_0_100px_rgba(0,0,0,0.8)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          initial={{ opacity: 0, scale: 0.92, y: 15, rotateX: 5 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, scale: 1.05, y: -15, rotateX: -5 }}
          transition={{ 
            type: "spring",
            stiffness: 260,
            damping: 20,
            mass: 1
          }}
          className="absolute inset-0 origin-center overflow-hidden"
          style={{ perspective: '1000px' }}
        >
          {currentScreen === 'splash' && <SplashScreen onComplete={() => nav('onboarding')} />}
          {currentScreen === 'onboarding' && <OnboardingScreen onComplete={() => nav('login')} />}
          {currentScreen === 'login' && <LoginScreen onComplete={() => nav('home')} />}
          {currentScreen === 'home' && <HomeScreen onComplete={() => nav('search')} onNavigate={(s) => nav(s as ScreenType)} />}
          {currentScreen === 'search' && <DestinationSearchScreen onBack={() => nav('home')} onSelect={() => nav('vehicle')} />}
          {currentScreen === 'vehicle' && <VehicleSelectionScreen onBack={() => nav('search')} onComplete={() => nav('driverMatching')} />}
          {currentScreen === 'driverMatching' && <DriverMatchingScreen onBack={() => nav('vehicle')} onComplete={() => nav('tracking')} />}
          {currentScreen === 'tracking' && <LiveTrackingScreen onBack={() => nav('home')} onComplete={() => nav('completion')} />}
          {currentScreen === 'completion' && <RideCompletionScreen onComplete={() => nav('payment')} />}
          {currentScreen === 'payment' && <PaymentScreen onBack={() => nav('completion')} onComplete={() => nav('home')} />}
          {currentScreen === 'safety' && <SafetyCenterScreen onBack={() => nav('home')} />}
          {currentScreen === 'pass' && <StudentPassScreen onBack={() => nav('home')} />}
          {currentScreen === 'schedule' && <ScheduleRideScreen onBack={() => nav('home')} onComplete={() => nav('home')} />}
          {currentScreen === 'savedLocations' && <SavedLocationsScreen onBack={() => nav('home')} />}
          {currentScreen === 'rides' && <RideHistoryScreen onBack={() => nav('home')} />}
          {currentScreen === 'wallet' && <WalletScreen onBack={() => nav('home')} />}
          {currentScreen === 'profile' && (
            <ProfileScreen
              onBack={() => nav('home')}
              onNavigate={(s) => nav(s as ScreenType)}
            />
          )}
          {currentScreen === 'notifications' && <NotificationsScreen onBack={() => nav('profile')} />}
          {currentScreen === 'help' && <HelpSupportScreen onBack={() => nav('profile')} />}
          {currentScreen === 'settings' && <AppSettingsScreen onBack={() => nav('profile')} />}
          {currentScreen === 'promo' && <PromoReferralScreen onBack={() => nav('profile')} />}
          {currentScreen === 'nightRide' && <NightRideScreen onBack={() => nav('home')} onComplete={() => nav('tracking')} />}
          {currentScreen === 'campusPool' && <CampusPoolScreen onBack={() => nav('home')} onComplete={() => nav('vehicle')} />}
        </motion.div>
      </AnimatePresence>

      {/* Bottom Tab Bar */}
      <AnimatePresence>
        {showTabBar && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="absolute bottom-0 left-0 right-0 z-[60]"
          >
            <BottomTabBar activeTab={activeTab} onTabChange={handleTabChange} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  if (isFullScreen) {
    return (
      <div className="w-full h-[100dvh] bg-brand-dark overflow-hidden relative mx-auto max-w-md shadow-2xl">
        {content}
      </div>
    );
  }

  return (
    <PhoneFrame>
      {content}
    </PhoneFrame>
  );
}
