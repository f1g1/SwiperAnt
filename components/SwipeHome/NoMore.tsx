import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Text } from 'react-native-paper'

export default function NoMore() {
    return (
        <View>

<Text style={styles.text}>
    NO MORE rents avalaible at the moment, come later
</Text>

        </View>
    )
}



const styles = StyleSheet.create({
    text: {
      height: 400,
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'red',
      color:"black"
    },
    
  });
