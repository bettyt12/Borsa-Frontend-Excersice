import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { editProfileRequest } from '../redux/actions/UserActions';
import Toast from 'react-native-toast-message';
import { Image } from 'react-native';

const EditProfileScreen: React.FC = ({navigation}:any) => {
  const userData = useSelector((state: any) => state.users.userData);
  const loading = useSelector((state: any) => state.users.loading);
  const error = useSelector((state: any) => state.users.error);
 
  const [updateAttempted, setUpdateAttempted] = useState(false);
  // Initialize state variables with default user data
  const [id, setId] = useState(userData._id || '');
  const [firstName, setFirstName] = useState(userData.firstName || '');
  const [lastName, setLastName] = useState(userData.lastName || '');
  const [email, setEmail] = useState(userData.email || '');
  const [userName, setUserName] = useState(userData.userName || '');
  const [address, setAddress] = useState(userData.address || '');


  const dispatch = useDispatch();

  useEffect(() => {
    if (updateAttempted && !loading && !error) {
      Toast.show({
        type: 'success',
        text1: 'Profile updated successfully!',
        visibilityTime: 2000,
        autoHide: true,
      });
      setUpdateAttempted(false)
      navigation.navigate('Home');
    }
  }, [loading, error, navigation, updateAttempted]);
   
    // Function to handle profile update 
 const handleUpdateProfile = () => {
  setUpdateAttempted(true)
  const userData = {
    id,
    firstName,
    lastName,
    email,
    address,
    userName
  };
  dispatch(editProfileRequest(id,userData));
};

const isValidURL = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) { 
    return false;
  }
};
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      {error && <Text style={styles.error}>{error}</Text>}
      <Image
        style={styles.avatar}
        source={ isValidURL(userData.profilePic)
            ? { uri: userData.profilePic } // Use profilePic if it's a non-empty and valid URL
            : require('../../assets/Images/defaultPic.jpg') // Use default pic otherwise
        }
      />
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
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
   <TouchableOpacity style={styles.button} onPress={handleUpdateProfile}>
   {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>Update Profile</Text> }
      </TouchableOpacity>
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
  error: {
    color: 'red',
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
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 35,
    marginRight: 10,
    marginBottom:20
  },
});

export default EditProfileScreen;
