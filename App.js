import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons'; 
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, Image, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { AsyncStorage } from "react-native";   

import searchPage from "./pages/searchPage";
import searchResult from "./pages/searchResult"; 
import wokerDetails from "./pages/wokerDetails";

console.disableYellowBox = true; // to disable the yellow error box during testing
 
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

//initilizing the fire base app
const firebaseConfig = {  
  apiKey: "AIzaSyBdxBpmK8zROI0ILDtpx7Eh_YEYXpe2D1Y",
  authDomain: "mob-app-54eb7.firebaseapp.com",
  databaseURL: "https://mob-app-54eb7.firebaseio.com",
  projectId: "mob-app-54eb7",
  storageBucket: "mob-app-54eb7.appspot.com",
  messagingSenderId: "552285783962",
  appId: "1:552285783962:web:8ddb61b727fb7648bc5c23",
  measurementId: "G-P599XD9M42"
};

firebase.initializeApp(firebaseConfig);

const Stack=createStackNavigator();

function MainStackNavigator(){
return(
<Stack.Navigator
screenOptions={{
        headerStyle: {
          backgroundColor: 'white',
        },
        
    headerRight: () => (
            <TouchableOpacity
             onPress={()=>profileShow()}    
style={{padding:5,}}>
            <AntDesign name="user" size={24} color="#4269C8"/>   
            </TouchableOpacity>
          ),
     headerTitle: props => <LogoTitle {...props} />
      }}     
> 
    
        <Stack.Screen name="Search" component={searchPage} />
        <Stack.Screen name="searchResult" component={searchResult}/>
        <Stack.Screen name="wokerDetails" component={wokerDetails}/>
        
</Stack.Navigator>    
);
        
}


function LogoTitle() {
  return (
<View style={{flexDirection:'row',alignItems:'center',}}>
    <Image
      style={{ width: 50, height: 50 }}
      source={require('./assets/asklogo.png')}
    />
<Text style={{marginLeft:5,fontSize:15,color:'#4269C8',fontWeight:'bold'}}>COMPANY</Text>
</View>
  );
}

export default class askcompany extends React.Component{ 
constructor(props){ 
    super(props);
    this.state = { 
        
  };
  }
           
render(){
  return (
<NavigationContainer>
<MainStackNavigator />           
</NavigationContainer>
  );
}

componentDidMount() {
     
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


    
