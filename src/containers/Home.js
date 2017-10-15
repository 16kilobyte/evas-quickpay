import React, { Component } from 'react';
import { AsyncStorage } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast } from 'native-base';

import login from '../api/login';
import initData from '../api/initData';
import * as storage from '../utils/storage'
import * as auth from '../utils/auth'

export default class Home extends Component {
  
  static navigationOptions = {
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}'s Profile'`,
    })
  };

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      bundle: {}
    }
  }

  async componentDidMount() {
    const { navigation } = this.props;
    try {
      let user = await AsyncStorage.getItem('user');
      if(user !== null) {
        user = JSON.parse(user)
        console.log('user', user);
        this.setState({ user });
        let bundle = await AsyncStorage.getItem('bundle');
        if(bundle !== null) {
          bundle = JSON.parse(bundle)
          console.log('bundle', bundle);
          this.setState({ bundle });
        } else {
          initData().then(response => {
            console.log('init', response);
            if(response && response.status && response.status === 'success') {
              AsyncStorage.setItem('bundle', JSON.stringify(response.configurations))
              this.setState({ bundle: response.configurations })
            } else {
              Toast.show({
                message: 'An error occurred during server interaction. Please, restart the app',
                position: 'bottom',
                type: 'danger',
                buttonText: 'Okay',
                onClose: () => (
                  navigation.navigate('Login')
                )
              })
            }
          })
        }
      } else {
        console.log('Not logged in')
        navigation.navigate('Login');
      }
    } catch(e) {
      console.log(`${e} in src/container/Home`);
      Toast.show({
        message: 'An unexpected error occured. Please, restart the app',
        position: 'bottom',
        buttonText: 'Login',
        type: 'danger',
        onClose: () => {
          this.props.navigation.navigate('Login')
        }
      });
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    console.log(auth.getBundleFromStore())
    return (
      <Container>
        <Header />
        <Content>
          <Button block success onPress={() => this.props.navigation.navigate('StartPayment', { bundle: this.state.bundle, user: this.state.user })}>
            <Text>Start Payment</Text>
          </Button>
          <Button block danger onPress={() => this.props.navigation.navigate('UpdateStore')}>
            <Text>Update</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}