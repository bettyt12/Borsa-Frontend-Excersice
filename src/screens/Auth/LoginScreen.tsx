import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserRequest } from '../../redux/actions/UserActions';
import Toast from 'react-native-toast-message';

const LoginScreen: React.FC = ({navigation}: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
const [loginAttempt, setLoginAttempt] = useState(false)
  const loading = useSelector((state: any) => state.users.loading);
  const error = useSelector((state: any) => state.users.error);

  const dispatch = useDispatch();
  const userData = useSelector((state: any) => state.users.userData);

  useEffect(() => {
    if (userData && loginAttempt && !error && !loading) {
    Toast.show({
    type: "success",
    text1: 'User Logged in Successfully!'
  });
    setLoginAttempt(false)
      navigation.navigate('Home'); 
    }
  }, [userData, navigation,error,loading, loginAttempt]);

  const handleLogin = () => {
    setLoginAttempt(true)
    const userData = {
      email,
      password,
    };
    dispatch(loginUserRequest(userData));
  };

	const navigateToSignup = () => {
    navigation.navigate('SignUp'); 
  };

  const isFormValid = () => {
    return email.trim() !== '' || password.trim() !== '';
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
		
      {error && <Text style={styles.error}>{error}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={handleLogin}
        disabled={!isFormValid}
      >
      {loading ? <ActivityIndicator size="small" color="#FFFFFF" /> : <Text style={styles.buttonText}>{'Login'}</Text>}
      </TouchableOpacity>
			<View style={styles.loginTextContainer}>
        <Text style={styles.loginText}>Don't have an account?</Text>
        <TouchableOpacity onPress={navigateToSignup}>
          <Text style={styles.loginLink}>SignUp</Text>
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

export default LoginScreen;