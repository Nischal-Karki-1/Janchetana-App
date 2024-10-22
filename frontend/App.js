import React from 'react';
import 'react-native-gesture-handler'; 
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView, StatusBar, View, StyleSheet, Platform } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';  
import { enableScreens } from 'react-native-screens';  
import { SafeAreaProvider } from 'react-native-safe-area-context';  
import Map from './component/Map';
import DistrictDetails from './component/DistrictDetails';


enableScreens();  

const Stack = createStackNavigator();

export default function App() {
  return (
   
    <GestureHandlerRootView style={styles.container}>
      <SafeAreaProvider> 
        <StatusBar 
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent={true}
        />
        <SafeAreaView style={styles.safeArea}>
          <View style={styles.content}>
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Map">
                <Stack.Screen 
                  name="Map" 
                  component={Map} 
                  options={{ headerShown: false }} 
                />
                <Stack.Screen 
                  name="DistrictDetails" 
                  component={DistrictDetails} 
                  options={{ title: "उम्मेदवार विवरण"}} 
                />
              </Stack.Navigator>
            </NavigationContainer>
          </View>
        </SafeAreaView>
      </SafeAreaProvider> 
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
