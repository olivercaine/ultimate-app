import { StyleSheet, Text, View } from "react-native";
import { add } from '@ultimate/math'
import { StatusBar } from "expo-status-bar";


export function Home() {
  return (
    <View style={styles.container}>
      <Text>Hello World!</Text>
      <Text>1.0.0</Text>
      <Text>App: mobile</Text>
      <StatusBar style="auto" />
      <p>{add(1,2)}</p>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
