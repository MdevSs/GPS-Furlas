import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Index() {
  return (
    
    <View
      style={styles.main}
    >
      <View style={styles.modal}>
        <AntDesign name="enviroment" style={{fontSize: 40, width: '100%', textAlign: 'center', height: 32, paddingTop: 8,}}/>
        <Text style={styles.title}> Login </Text>
        <View style={styles.inputcont}>
          <TextInput placeholder="Login" style={styles.input}/>
        </View>
        <View style={styles.inputcont}>
          <TextInput placeholder="Password" style={styles.input}/>
        </View>
        <Text style={styles.span}>Não tem uma conta? Faça o seu Cadastro.</Text>
        <Pressable style={styles.btn}> 
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
      paddingTop: 100,
      borderRadius: 12,
      gap: 20,
      width: '90%',
      height: '95%'
    },
    inputcont: {
      display: "flex",
      gap: 5
    },
    title: {
      fontSize: 24,
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold'
    },
    input: {
      padding: 10,
      borderWidth: 1,
      borderColor: '#CCC',
      borderRadius: 6,
    },
    btn: {
      width: '100%',
      backgroundColor: "#00AACC",
      padding: 15,
      borderRadius: 12
    },
    btnText: {
      textAlign: 'center',
      color: "#FAFAFA"
    },
    span: {
      color: "#00AACC",
      alignSelf: 'flex-end'
    }
});
