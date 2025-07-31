import { AntDesign } from "@expo/vector-icons";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

export default function Cadastro() {
  return (
    
    <View
      style={styles.main}
    >
      <View style={styles.modal}>
        <AntDesign name="enviroment" style={{fontSize: 60, width: '100%', textAlign: 'center',}}/>
        <Text style={styles.title}> Cadastro </Text>
        <View style={styles.inputcont}>
          <TextInput placeholder="Cadastro" style={styles.input}/>
        </View>
        <View style={styles.inputcont}>
          <TextInput placeholder="Password" style={styles.input}/>
        </View>
        <Text style={styles.span}>Já tem uma conta? Então Faça o Login aqui.</Text>
        <Pressable style={styles.btn}> 
          <Text style={styles.btnText}>Cadastrar</Text>
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
