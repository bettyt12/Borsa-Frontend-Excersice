// import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Switch } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserRequest } from '../../redux/actions/UserActions';
import React, { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import Toast from 'react-native-toast-message';
import * as Location from 'expo-location';

const SignupScreen: React.FC = ({navigation}: any) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
	const [profilePic, setProfilePic] = useState('https://via.placeholder.com/150');
  const [isBuyer, setIsBuyer] = useState(false);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [errorLocation, setErrorLocation] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const loading = useSelector((state: any) => state.users.loading);
  const error = useSelector((state: any) => state.users.error);

  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.userData);
	
  const handleSignup = () => {
    const userData = {
      firstName,
      lastName,
      email,
      userName,
      password,
      address,
			profilePic,
			isBuyer,
    };
    dispatch(registerUserRequest(userData));
  };

	const isFormValid = () => {
    return (
      firstName.trim() !== '' ||
      lastName.trim() !== '' ||
      email.trim() !== '' ||
      userName.trim() !== '' ||
      password.trim() !== '' ||
      confirmPassword.trim() !== '' ||
      address.trim() !== ''
    );
  };
	const navigateToLogin = () => {
    navigation.navigate('Login'); 
  };

  useEffect(() => {
    if (userData) {
    Toast.show({
    type: "success",
    text1: 'User Registered Successfully!',
    visibilityTime: 2000,
    autoHide: true,
    topOffset: 50,
});
      navigation.navigate('Login'); 
    }
  }, [userData, navigation]);

  const getCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorLocation('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      let { coords } = location;
      let address = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
      if (address.length > 0) {
        setCity(address[0].city || '');
        setCountry(address[0].country || '');
        setAddress(`${address[0].city || ''}, ${address[0].country || ''}`);
      }
    } catch (error) {
      console.error('Error fetching location: ', error);
      setErrorLocation('Error fetching location. Please try again.');
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    getCurrentLocation();
  }, []);
	// const pickImage = async () => {
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });

	// 	if (!result.canceled && result?.uri) {
	// 		setProfilePic(result?.uri);
	// 	}
  // };
	
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      {error && <Text style={styles.error}>"{error}"</Text>}
			{/* <TouchableOpacity style={styles.button} onPress={pickImage}> */}
        {/* <Text style={styles.buttonText}>Select Profile Picture</Text>
      </TouchableOpacity>
      {profilePic ? <Image source={{ uri: profilePic }} style={{ width: 200, height: 200 }} /> : null} */}
      <TextInput
        style={styles.input}
        placeholder="First Name"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Last Name"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={userName}
        onChangeText={setUserName}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />
       {confirmPassword !== password && (
        <Text style={styles.error}>Passwords do not match</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
			   <View style={styles.checkboxContainer}>
        <Switch
          value={isBuyer}
          onValueChange={setIsBuyer}
					thumbColor="#714D90" 
          trackColor={{ false: '#eae1f5', true: '#714D90' }}
        />
        <Text style={styles.checkboxLabel}>I am a Buyer</Text>
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        disabled={loading || !isFormValid()}
				
      >
         {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>{'Sign Up'}</Text>}
      </TouchableOpacity>
			<View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity onPress={navigateToLogin}>
          <Text style={styles.loginLink}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#714D90',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
	checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
  },
	loginTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  loginText: {
    marginRight: 5,
  },
  loginLink: {
    color: '#714D90',
    textDecorationLine: 'underline',
  },
});

export default SignupScreen;