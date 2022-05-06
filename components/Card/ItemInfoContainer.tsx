import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';


export const ItemInfoContainer = ({item}) => {

return <View style={styles.bigContainer}>
   <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Price:</Text>
  <Text style={[styles.fieldLabel,styles.bold]}>{item.price}</Text>
  </View>

  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Surface:</Text>
  <Text style={styles.fieldLabel}>{item.size}</Text>
  </View>

  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Rooms:</Text>
  <Text style={styles.fieldLabel}>{item.rooms}</Text>
  </View>

  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Type:</Text>
  <Text style={styles.fieldLabel}>{item.type}</Text>
  </View>

  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Level:</Text>
  <Text style={styles.fieldLabel}>{item.level}</Text>
  </View>
  
  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Location:</Text>
  <Text style={styles.fieldLabel}>{item.City}</Text>
  </View>

  <View style={styles.characteristic}>
  <Text style={styles.fieldLabel}>Neighborhood:</Text>
  <Text style={styles.fieldLabel}>{item.neighborhood}</Text>
  </View>

    </View>
    
}
export default ItemInfoContainer;
const styles = StyleSheet.create({
    bigContainer:{
        display:"flex",
        flex:1,
        backgroundColor:"rgba(1,1,1,0.2)"
    },
    characteristic:{
      display:"flex",
      justifyContent:"space-between",
      flexDirection:"row",
      borderBottomWidth:1,
      marginVertical:10
    },
    fieldLabel:{
      fontSize:20,
      marginHorizontal:30,
      color:"black",
      fontFamily: "Cochin"
    },
    bold:{
      fontWeight:"bold"
    }
  })
