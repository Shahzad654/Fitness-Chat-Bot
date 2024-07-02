import React from 'react';
import {
  ImageBackground,
  Platform,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from "react-native";
import Welcome from '../assets/Welcome2.jpg'
import { Button } from 'react-native-paper';

const Splash = ({navigation}) => {
    return (
      <ImageBackground source={Welcome} style={styles.background}>
        <View
          style={{
            paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
            flex: 1,
          }}
        >
          <View style={styles.overlay}>
            <Text style={{color:'white', marginTop:400, marginLeft:120, fontSize:40, fontWeight:'bold'}}>Fit-Bot</Text>
            <Button 
                style={styles.button} 
                labelStyle={{color:'white'}} 
                onPress={()=>{
                    navigation.navigate('chat')
                }}
            >
                Get Started
                </Button>
          </View>
        </View>
      </ImageBackground>
    );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  button:{
    backgroundColor:'gray',
    marginLeft:80,
    marginRight:80,
    marginTop:220,
  }
});

export default Splash;
