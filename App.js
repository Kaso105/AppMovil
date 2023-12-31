import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,Button,
  PermissionsAndroid, useColorScheme
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

function Section({children, title}){
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>

    
  );
}

function App() {
  const Stack = createNativeStackNavigator();
  const isDarkMode = useColorScheme() === 'dark';
  const [location, setLocation] = useState(false);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Geolocation Permission',
          message: 'Can we access your location?',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      console.log('granted', granted);
      if (granted === 'granted') {
        console.log('You can use Geolocation');
        return true;
      } else {
        console.log('You cannot use Geolocation');
        return false;
      }
    } catch (err) {
      return false;
    }
   };
   const getLocation = () => {
    const result = requestLocationPermission();
    result.then(res => {
      console.log('res is:', res);
      if (res) {
        Geolocation.getCurrentPosition(
          position => {
            console.log(position);
            setLocation(position.coords);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
            setLocation(false);
          },
          {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
        );
      }
    });
    console.log(location, 'holaa');
  };

  useEffect(() => {
    if (location) {
      console.log(`Latitude: ${location.latitude}, Longitude: ${location.longitude}`);
    }
  }, [location]);
  return (
    
    <>
    {/* <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name="Login" component={LoginScreen} />
        {/* Agrega aquí otras pantallas según sea necesario }
      </Stack.Navigator>
    </NavigationContainer> */}
    <View style={style1.container}>
      <Text>Welcome!</Text>
      <View style={styles.buttonContainer}>
    <Button title="Get Location" onPress={getLocation} />
    </View>
      <Text>Latitude: {location ? location.latitude : null}</Text>
      <Text>Longitude: {location ? location.longitude : null}</Text>
      
      <View style={styles.buttonContainer}>
        <Button title="Send Location" />
      </View>
    </View>
    
      </>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

const style1 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
    width: '40%',
  },
});


export default App;