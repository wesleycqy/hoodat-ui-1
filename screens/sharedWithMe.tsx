import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/Entypo";




class sharedWithMe extends React.Component{
  

  render() {
    

    return (
      <View style={styles.container}>
        <Text style = {{marginTop:200}}>Shared With Me Screen</Text>
        <Button title="Next" onPress={() => this.props.navigation.navigate("Test Screen")}></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
  },

  
});

export default sharedWithMe;