import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Login() {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
  
    const Logar = async (e) => {
        // console.log(login);
        // console.log(password);
       const dados = new FormData()
        dados.append("login", login);
        dados.append("password", password);
        const res = await fetch('http://192.168.15.157/api.php', {
          "method": "POST",
          "body": JSON.stringify({
            "type": 'login',
            "login": login,
            "password": password 
          })
        })
        .then( resposta => {
          return resposta.json()
        })
        .then( json => {
          console.log(json);
  
          if(json.data == true){
            router.push('/map')
          }
          
        })
        .catch(e => {
        console.log(e)
        });
        
  
    } 
  return (
    
    <View
      style={styles.main}
    >
      <View style={styles.modal}>
        <AntDesign name="enviroment" style={{fontSize: 60, width: '100%', textAlign: 'center',}}/>
        <Text style={styles.title}> Login </Text>
        <View style={styles.inputcont}>
          <TextInput placeholder="Login" style={styles.input} onChangeText={(e) => setLogin(e)}/>
        </View>
        <View style={styles.inputcont}>
          <TextInput placeholder="Password" style={styles.input} onChangeText={(e) => setPassword(e)}/>
        </View>
        <Text style={styles.span}>Não tem uma conta? Faça o seu Cadastro aqui.</Text>
        <Pressable style={styles.btn} onPress={Logar}> 
          <Text style={styles.btnText}>Login</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    main:{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#BDF'
      },
    modal: {
      display: 'flex',
      justifyContent: 'flex-start',
      backgroundColor: "#FAFAFA",
      padding: 50,
      paddingTop: 50,
      borderRadius: 12,
      gap: 20,
      width: '90%',
      height: '95%',
      marginTop: 12
    },
    inputcont: {
      display: "flex",
      gap: 5
    },
    title: {
      fontSize: 32,
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 10
    },
    input: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 6,
      fontSize: 18
    },
    btn: {
      width: '100%',
      backgroundColor: "#00AACC",
      padding: 15,
      borderRadius: 12,
      marginTop: 10
    },
    btnText: {
      textAlign: 'center',
      color: "#FAFAFA",
      fontSize: 20
    },
    span: {
        width: '100%',
      color: "#00AACC",
      alignSelf: 'center',
      textAlign: 'right'
    }
});
