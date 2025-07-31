import { useRouter } from "expo-router";
import { Button, Pressable, StyleSheet, Text, View } from "react-native";

export default function Index() {
  const router = useRouter()
  const toLogin = () => {
    router.push('/login')
  }
  const toCad = () => {
    router.push('/cad')
  }
  const toMap = () => {
    router.push('/map')
  }
  return (
    <View
      style={styles.main}
    >
      <Pressable style={styles.Press} onPress={toCad}>
        <Text style={styles.textPress}>CADASTRO</Text>
      </Pressable>

      <Pressable style={{...styles.Press, backgroundColor: '#00AACC'}} onPress={toLogin}>
        <Text style={{...styles.textPress, color: '#FAFAFA'}}>LOGIN</Text>
      </Pressable>
      
      <Pressable style={styles.Press} onPress={toMap}>
        <Text style={styles.textPress}>Mapa (Debugg)</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
    main:{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        gap: 10,
      },
    Press: {
      padding: 20,
      backgroundColor: 'transparent',
      borderWidth: 2,
      borderColor: '#00AACC',
      width: '100%',
      borderRadius: 12,
    },
    textPress: {
      width: '100%',
      color: '#00AACC',
      textAlign: 'center',
      fontWeight: 'bold'
    },
});
