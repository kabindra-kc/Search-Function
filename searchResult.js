import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, ScrollView, FlatList, ActivityIndicator} from 'react-native';
import { AsyncStorage } from "react-native";
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

export default class searchResult extends React.Component{
    
constructor(props){   
    super(props);
    
   this.state = {  
isLoading:false,
pointer:'',data:[],
worker:this.props.route.params.worker,
location:this.props.route.params.location,
  };
  } 

search = async () =>{ 
let resultObject=[];var lastVisible;
let location=this.state.location;
var db = firebase.firestore(); 
    
var query =db.collection("parttime_workers").where("skill", "array-contains", this.state.worker).limit(8);
await query.get().then(function(querySnapshot){
lastVisible = querySnapshot.docs[querySnapshot.docs.length-1]; 
  
querySnapshot.forEach(function(doc){
if(doc.data().location.includes(location)){
resultObject.push({
"id":doc.data().mobile,
"fullname":doc.data().fullname, 
"skill":JSON.stringify(doc.data().skill),
"location":doc.data().location
});  
}
});     
});
    
this.setState({data:resultObject,pointer:lastVisible}); 
//alert(this.state.userId);   
}

loadMore = async()=>{
var lastVisible;
let location=this.state.location;
let resultObject=[];  
    
var db = firebase.firestore(); 
var next = db.collection('parttime_workers').where("skill", "array-contains", this.state.worker).startAt(this.state.pointer).limit(8);
    
await next.get().then(function(querySnapshot){
lastVisible = querySnapshot.docs[querySnapshot.docs.length-1];     
querySnapshot.forEach(function(doc){
if(doc.data().location.includes(location)){
resultObject.push({
"id":doc.data().mobile,
"fullname":doc.data().fullname, 
"skill":JSON.stringify(doc.data().skill),
"location":doc.data().location
});    
}   
});        
});
this.setState(state=>({data:this.state.data.concat(resultObject), pointer:lastVisible, isLoading:false,}));
//alert(this.state.userId);   
}

componentDidMount() {     
this.search();
} 

renderData = ({ item }) => {
return(
<TouchableOpacity style={{padding:20,borderBottomWidth:1,borderColor:'#dddddd',}} onPress={()=>this.flatlistItemClicked( item.id)}>
<Text style={{fontWeight:'bold'}}>{item.fullname}</Text>
<Text>{item.location}</Text> 
<Text>{item.skill}</Text>
</TouchableOpacity>
);
}

footerList = () => {
return(
<View>
<ActivityIndicator animating={this.state.isLoading} size={"large"}/>
</View>
);
}

flatlistItemClicked = ( id ) => {      
this.props.navigation.navigate('wokerDetails', {id:id,});   
}   
    
render(){        
return(    
<View style={{flex:1}}>  
<FlatList
style={{flex:1,}}
data={this.state.data}    
renderItem={this.renderData}    
keyExtractor={(item, id) => id.toString()}
onEndReached={this.loadMore}
ListFooterComponent={this.footerList}
/>
</View>
);
}  
  
}


