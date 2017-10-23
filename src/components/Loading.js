import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Container, Header, Content, Spinner as NativeSpinner } from 'native-base'
import Spinner from 'react-native-loading-spinner-overlay'
import { Constants } from 'expo'

import  Colors from '../assets/literals/colors'

const Screen = Dimensions.get('screen')

export default Loading = () => (
  <View style={[styles.container]}>
    <NativeSpinner color={Colors.primaryColor} size={100} />
  </View>
)

export const CustomSpinner = ({ visible }) => (
  <Spinner visible={visible} color={Colors.primaryColor} animation="fade" overlayColor="rgba(255,255,255,0.25)" />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    height: Screen.height,
  },
})
