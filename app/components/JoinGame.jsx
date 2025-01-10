import { router } from "expo-router";
import { View, Text, TextInput, Button, Dimensions, StyleSheet } from "react-native";

function JoinGame(){
  return (
      <View style={spacing.container}>
        {/* Top Section */}
        <View style={spacing.topSection}>
          <Text style={styles.text}>Join Game</Text>
        </View>
  
        {/* Middle Section */}
        <View style={spacing.middleSection}>
              <TextInput style={styles.input} placeholder="Username">
              </TextInput>
              <TextInput style={styles.input} placeholder="Game Code">
              </TextInput>
              <Button
                  title="Join Game"
                  onPress={() => router.push('/Description')}
              />
        </View>
  
        {/* Bottom Section */}
        <View style={spacing.bottomSection}>
        </View>
      </View>
    );
  };
  const width = Dimensions.get('window').width
  
  const styles = StyleSheet.create({
      input: {
        height: 50,
        width: width/1.5,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 15,
        marginBottom: 10,
        backgroundColor: '#fff',
        color: '#000',
        fontSize: 16,
      },
      text: {
        fontSize: 36,
        fontWeight: 'bold',
      }
    });
  
    const spacing = StyleSheet.create({
        container: {
            width: width,
            flex: 2,
            backgroundColor: '#f8f8f8',
          },
        topSection: {
            flex: 2,
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            backgroundColor: '#aacccb',
        },
        middleSection: {
            flex: 6,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#add8e6',
        },
        bottomSection: {
            flex: 0.1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#90ee90',
        }
    });
export default JoinGame;