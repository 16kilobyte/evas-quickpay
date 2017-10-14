import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Root, Container, Header, Content, Spinner } from 'native-base';
import Expo, { Constants } from 'expo';
import { StackNavigator } from 'react-navigation';

import Login from './src/containers/Login'
import Home from './src/containers/Home'
import StartPayment from './src/containers/StartPayment'
import UpdateStore from './src/containers/UpdateStore'

import Loading from './src/components/Loading'

const MainApp = StackNavigator({
  Login: { screen: Login },
  Home: { screen: Home },
  StartPayment: { screen: StartPayment },
  UpdateStore: { screen: UpdateStore },
}, { headerMode: 'none' });

export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ready: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({ ready: true })
  }

  render() {
    if(this.state.ready) return <Root><MainApp /></Root>;
    return <View style={styles.container}><Loading /></View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
  },
});
