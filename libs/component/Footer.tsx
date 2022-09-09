import React from "react";
import {
    View,
    ActivityIndicator,
    StyleSheet,
} from 'react-native';
const  Footer = (props: any) => {
    return (
      <View style={styles.footer}>
          {props.loading ? (
            <ActivityIndicator
              color="white"
              style={{marginLeft: 8}} />
          ) : null}
      </View>
    );
  };

  const styles = StyleSheet.create({
    container: {
      justifyContent: 'center',
      flex: 1,
    },
    footer: {
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    loadMoreBtn: {
      padding: 10,
      backgroundColor: '#800000',
      borderRadius: 4,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    btnText: {
      color: 'white',
      fontSize: 15,
      textAlign: 'center',
    },
  });

  export default Footer;