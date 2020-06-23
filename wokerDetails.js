import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { TextInput, StyleSheet, Text, View, TouchableOpacity, Button, ScrollView, Linking} from 'react-native';
import { AsyncStorage } from "react-native";          
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';


export default class viewWorker extends React.Component{
constructor(props){ 
    super(props);    
    this.state = {
id:this.props.route.params.id,     
fullname:'',location:'',mobile:'',skill:[],fbProfile:'',
  };
  }
 
getUserPreference = async () =>{       
//alert(this.state.id); 
let fullname1="";let location1="";let mobile1="";let skill1=[];let fbProfile1=""; 
let found=true; 
 
var db = firebase.firestore();        
await db.collection("parttime_workers").doc(this.state.id).get().then(function(doc){
 if (doc.exists) {
fullname1=doc.data().fullname;
location1=doc.data().location; 
mobile1=doc.data().mobile;
fbProfile1=doc.data().fbProfile;  
     
for(let i=0;i<doc.data().skill.length;i++){
skill1.push(doc.data().skill[i]);   
}
     
}else{
found=false;
}
});
    
    
if(found==true){
this.setState({fullname:fullname1,location:location1,mobile:mobile1,skill:skill1,fbProfile:fbProfile1,});   
}
} 

componentDidMount() {
this.getUserPreference();
}

render(){
return(
<React.Fragment>
<ScrollView style={{backgroundColor:'white'}}> 
    
<View style={{padding:10,borderBottomWidth:1,borderColor:'#dddddd'}}>
<Text><Ionicons name="md-person" size={20} color="black" /> {this.state.fullname}</Text>
<Text><Ionicons name="md-locate" size={20} color="black" /> {this.state.location}</Text>
<Text> <Ionicons name="md-phone-portrait" size={20} color="black"/>  {this.state.mobile}</Text>  
</View>
    
<View style={{marginTop:20,padding:5}}>
<Text>MY SKILLS</Text>

<View>
{this.state.skill.map((item, key)=>(
 <View style={{flexDirection:'row',borderTopWidth:1,borderColor:'#dddddd',padding:5,alignItems:'center'}}>
<Text key={key} style={{borderTopWidth:1,borderColor:'white',padding:5,color:'#68696B'}}> { item } </Text>
</View>
))}
</View>

</View> 

<View style={{marginTop:20,margin:5,}}>
<Text>LINKDED PROFILE</Text>
</View>
<View style={{borderWidth:1,borderColor:'#CECECE',margin:5,borderRadius:2,padding:10}}>
<TouchableOpacity onPress={ ()=>{ Linking.openURL(this.state.fbProfile)}} style={{padding:10,backgroundColor:'blue',margin:10,justifyContent:'center'}}>
<Text style={{color:"white",}}><Ionicons name="logo-facebook" size={24} color="white" /> View Facebook Profile</Text>    
</TouchableOpacity>

</View>
    
</ScrollView>
</React.Fragment>
);
} 
    
}