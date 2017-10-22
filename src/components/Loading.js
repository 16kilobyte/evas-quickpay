import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Container, Header, Content, Spinner } from 'native-base'
import { Constants } from 'expo'

import  Colors from '../assets/literals/colors'

const Screen = Dimensions.get('screen')

export default Loading = () => (
  <View style={[styles.container]}>
    <Spinner color={Colors.primaryColor} size={100} />
  </View>
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
