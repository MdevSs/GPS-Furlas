import { StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={styles.main}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    main:{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      },
    map: { flex: 1 },
});
