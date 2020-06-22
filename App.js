import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StyleSheet,
        Text, View,Image, TouchableOpacity, TextInput, Alert} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {decode, encode} from 'base-64'


if (!global.btoa) { global.btoa = encode }
if (!global.atob) { global.atob = decode }
        

import firebase from "firebase/app";
import 'firebase/auth';


var firebaseConfig = {
  apiKey: "AIzaSyBcaFlxdC7sljI3WXL3-2HJEyRcRdQV7rQ",
  authDomain: "apputilesescolare.firebaseapp.com",
  databaseURL: "https://apputilesescolare.firebaseio.com",
  projectId: "apputilesescolare",
  storageBucket: "apputilesescolare.appspot.com",
  messagingSenderId: "469429937078",
  appId: "1:469429937078:web:bf509f2e5e7bdf2c9d9717"
};

let fire ;
if(!firebase.apps.length){
   fire  =  firebase.initializeApp(firebaseConfig);
}
 fire = firebase.app();




const Stack = createStackNavigator();

function Home({ navigation }){
  return(
    <View style={styles.container}>
       <Button
        title="login"
        onPress={() =>
        navigation.navigate('Login', { name: 'Juan' }) }
        />
     </View>
    
  );
} 

function Login({navigation}){
   const [correo , setCorreo]= React.useState('');
   const [password , setPassword]= React.useState('');

const registrarse =  async () =>{
  let Correo = correo;
  let Password = password;
await fire.auth().createUserWithEmailAndPassword(Correo, Password)
     .catch(function(error) {
    // Handle Errors here.
       var errorCode = error.code;
       var errorMessage = error.message;
   
  });
  setCorreo('')
  setPassword('')
} 

  return(
    <View style={styles.container}>

      <Image source={require('./assets/logo.png') }  style={styles.imagen} /> 
      
      <TextInput  style={styles.textInput} placeholder="Correo"
              onChangeText={correo => setCorreo(correo)} value={correo} />

       <TextInput style={styles.textInput} placeholder="Password"
              onChangeText={password => setPassword(password)}  value={password} />

       <TouchableOpacity style={styles.buttonIniciarSesion}
        onPress={() => navigation.navigate('Perfil', { name: '' }) }  >
             <Text style={styles.ButtonTexto}>Iniciar Sesion</Text>
       </TouchableOpacity>  

       <TouchableOpacity style={styles.buttonRegistrarse}
        onPress={() => registrarse()}  >
             <Text style={styles.ButtonTexto}>Registrase</Text>
       </TouchableOpacity>    

    </View>
  ); } //fin del componente Login

function Perfil(){
  return(
    <View style={styles.perfilContainer}>
      <Text style={{fontSize:29,color:'green'}}>Perfil</Text>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{title:''}} />

        <Stack.Screen name="Perfil" component={Perfil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 3,
    backgroundColor: '#fff',  
    justifyContent: 'center',
  },

  perfilContainer: {
    flex: 1,
    backgroundColor: '#C2B3DC',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonIniciarSesion:{
    
    backgroundColor:'#0E7CBF',
    padding:14,
    marginHorizontal:15,
    marginTop:10,
    marginBottom:12,
    borderRadius:24
  },
   buttonRegistrarse:{
    backgroundColor:'#0EBF7F',
    padding:14,
    marginHorizontal:15,
    borderRadius:24
  },
  ButtonTexto:{
    alignSelf:'center',
    color:'white',
    fontSize:19,
    fontWeight:'bold' 
  },
  
  textInput:{
    height: 50,
    fontSize:22,
    margin:10,
    borderWidth: 2,
    borderLeftColor:'#fff',
    borderRightColor:'#fff',
    borderStartColor:'#fff',
    borderTopColor:'#fff',
    borderBottomColor:'#3CF569',
    marginHorizontal:20,  
  },
  imagen:{
    width:220,
    height:120,
    marginBottom:13,
    alignSelf:'center',
    borderRadius:25
  }

});
