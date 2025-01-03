import { router } from "expo-router";
import { View, Text, Button, TextInput, StyleSheet } from "react-native";

function HostGame(){
  return (
    <View style={styles.container}>
      <Text>Host New Game</Text>
        <TextInput style={styles.input} placeholder="Username">
        </TextInput>
        <Button
            title="Go to Details"
            onPress={() => router.push('/Description')}
        />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    input: {
      height: 50,
      width: 200,
      borderColor: '#ddd',   // Light gray border
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 15,
      backgroundColor: '#fff',  // White background
      color: '#000',            // Black text color
      fontSize: 16,
    },
  });

export default HostGame;


//replace does not allow moving back a screen
//push just layers a screen ontop
