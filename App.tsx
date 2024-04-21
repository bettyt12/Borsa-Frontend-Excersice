import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

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
     <NavigationContainer>
  <Stack.Navigator>
    {/* <Stack.Screen name='Home' component={HomeScreen} /> */}
    <Stack.Screen name="Home">
          {(props) => <HomeScreen {...props} />} 
        </Stack.Screen>
    <Stack.Screen name='Details' component={DetailsScreen} />
  </Stack.Navigator>
    </NavigationContainer>
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
