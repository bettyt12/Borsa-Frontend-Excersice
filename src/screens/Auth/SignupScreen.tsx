// import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserRequest } from '../../redux/actions/UserActions';
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';

const SignupScreen: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
	const [profilePic, setProfilePic] = useState('hgfuj');
  const [isBuyer, setIsBuyer] = useState(false);

  // const loading = useSelector((state: any) => state.user.loading);
  // const error = useSelector((state: any) => state.user.error);

  const dispatch = useDispatch();

  const handleSignup = () => {
		console.log("hii");
		
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
      {/* {error && <Text style={styles.error}>"{error}"</Text>} */}
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
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
			 {/* <View style={styles.checkboxContainer}>
        <CheckBox
          value={isBuyer}
          onValueChange={setIsBuyer}
        />
        <Text style={styles.checkboxLabel}>I am a Buyer</Text>
      </View> */}
      <TouchableOpacity
        style={styles.button}
        onPress={handleSignup}
        // disabled={loading}
      >
        <Text style={styles.buttonText}>
					{/* {loading ? 'Signing Up...' : 'Sign Up'} */}
					Sign up</Text>
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
  button: {
    backgroundColor: 'blue',
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
});

export default SignupScreen;