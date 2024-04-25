// components/SplashScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, Image } from 'react-native';
import { useSelector } from 'react-redux';

const SplashScreen: React.FC = ({ navigation }: any) => {
  const userData = useSelector((state: any) => state.users.userData);

  useEffect(() => {
    // Simulate loading for 2 seconds
    setTimeout(() => {
      if (userData) {
        navigation.replace('Home');
      } else {
        navigation.replace('Login');
      }
    }, 2000);
  }, [userData, navigation]);

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/Images/borsa.webp')} style={styles.logo} />
      <Text style={styles.title}>Borsa App</Text>
      <Text style={styles.subtitle}>Democratizing Shipment!</Text>
      <ActivityIndicator size="large" color="#FFFFFF" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5B3393', // Purple background color
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    marginBottom: 20,
  },
});

export default SplashScreen;
