import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Button, TextInput, ScrollView,} from 'react-native';
import { AsyncStorage } from "react-native";
import SearchableDropdown from 'react-native-searchable-dropdown';
import * as firebase from 'firebase';
import firestore from 'firebase/firestore';

export default class TechnicalClass extends React.Component{

constructor(){
super(); 
this.state ={
//workerType:'',
selectedItems:'',
selectedLocation:'',
}
}
    
items = [ 
  {id: 1,name: 'Sales men',},
  {id: 2,name: 'बिक्री प्रतिनिधि',},
  {id: 3,name: 'Marketing',},
  {id: 4,name: 'मार्केटिंग',},
  {id: 5,name: 'Marketing manager',},
  {id: 6,name: 'मार्केटिंग मयानेजर',},
  {id: 7,name: 'Graphics designer',},
  {id: 8,name: 'ग्राफिक डिजाइनर',},
{id: 9,name: 'Photographer',},
{id: 10,name: 'फोटोग्राफर',},
{id: 11,name: 'Teacher',},
{id: 12,name: 'शिक्षक',},
{id:13,name: 'Professor'},
 {id:13,name: 'प्रोफेसोर'},    
{id:15, name:'Accountaint'},
 {id:16, name:'अकाउण्टेन'}, 
{id:17, name:'Receptionist'},
 {id:18, name:'रिसेप्शनिस्ट'}, 
{id:19, name:'Electrical technician'},
 {id:20, name:'इलेक्ट्रिकल प्राविधिक'},    
{id:21, name:'Beautician'},
 {id:21, name:'ब्यूटीशियन'},    
]; 

locations = [
 {id: 1,name: 'Butwal',},
  {id: 2,name: 'Palpa',},
  {id: 3,name: 'Kathmandu',},
  {id: 4,name: 'Bhairahawa',},
  {id: 5,name: 'Taulihawa',},
  {id: 6,name: 'Rupandehi',},
  {id: 7,name: 'Sainamaina',},
  {id: 8,name: 'Tillotama',},   
];
   
search=()=>{ 
let err=false;
let worker=this.state.selectedItems.name;
let location=this.state.selectedLocation.name;

this.props.navigation.navigate('searchResult', {
worker:worker,location:location,
});
}

   
componentDidMount() {
 
}

render(){

return (
<React.Fragment>       
 <ScrollView keyboardShouldPersistTaps={true}> 

<View style={{padding:20}}>
<View style={{marginTop:40}}>
 <SearchableDropdown
            onItemSelect={(item) => { 
              //const items = this.state.selectedItems;
              //items.push(item)
            this.setState({ selectedItems: item });
            }}
            containerStyle={{ }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectedItems.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectedItems: items });
            }}
            itemStyle={{
              padding: 10, 
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: '#222' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={this.items}
            
            resetValue={false}
            textInputProps={
              {
                placeholder: "Worker Type",
                underlineColorAndroid: "transparent",
                style: {
                    padding: 10,
                    borderWidth: 1,
                   borderColor:'#74B0F7',
                    borderRadius:2,
                },
                //onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            } 
        />
</View>

<View style={{marginTop:15}}>
  <SearchableDropdown
            onItemSelect={(item) => {
              //const items = this.state.selectedLocation;
              //items.push(item)
              this.setState({ selectedLocation: item });
            }}
            containerStyle={{ }}
            onRemoveItem={(item, index) => {
              const items = this.state.selectedLocation.filter((sitem) => sitem.id !== item.id);
              this.setState({ selectedLocation: items });
            }}
            itemStyle={{
              padding: 10,
              marginTop: 2,
              backgroundColor: '#ddd',
              borderColor: '#bbb',
              borderWidth: 1,
              borderRadius: 5,
            }}
            itemTextStyle={{ color: 'black' }}
            itemsContainerStyle={{ maxHeight: 140 }}
            items={this.locations}
            
            resetValue={false}
            textInputProps={
              {
                placeholder:'Location',
                underlineColorAndroid: "transparent",
                style: {
                    padding: 10,
                    borderBottomWidth: 1,
                    borderColor:'#74B0F7',
                    borderRadius: 5,
               
                },
                //onTextChange: text => alert(text)
              }
            }
            listProps={
              {
                nestedScrollEnabled: true,
              }
            }
        />   
</View>

<View style={{alignItems:'center',marginTop:15}}>
<TouchableOpacity style={{backgroundColor:'#1AA3E9',padding:12,borderRadius:3,marginTop:10,width:150,}} onPress={()=>this.search()}>
<Text style={{color:'white',textAlign:'center'}}><Ionicons name="md-search" size={24} color="white" /> Search</Text>       
</TouchableOpacity>    
</View>     
   
</View>
</ScrollView>
</React.Fragment>

  );
}   
}

const styles = StyleSheet.create({

});