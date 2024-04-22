import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SignupScreen from './src/screens/Auth/SignupScreen';
import { Provider } from 'react-redux';
import store from './src/redux/store/ConfigureStore';
import LoginScreen from './src/screens/Auth/LoginScreen';

// export default function App() {
//   // render(){
//     return (
//       <View style={styles.container}>
//         <Text>Open up App.tsx to start working on your app!</Text>
//         <StatusBar style="auto" />
//       </View>
//     );
//   // } 
// }

function HomeScreen({navigation}:any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Button title='details'
      onPress={() => navigation.navigate('Details')}
      />

    </View>
  );
}

function DetailsScreen({navigation}:any) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
     <NavigationContainer>
  <Stack.Navigator screenOptions={{headerShown:false}}>
    <Stack.Screen name='SignUp' component={SignupScreen} />
    <Stack.Screen name='Login' component={LoginScreen} />
    {/* <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />} 
        </Stack.Screen>
    <Stack.Screen name='Details' component={DetailsScreen} /> */}
  </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );



}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
