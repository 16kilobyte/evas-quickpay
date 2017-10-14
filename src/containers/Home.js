import React, { Component } from 'react';
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

  componentDidMount() {
    auth.getUserFromStore().then(user => {
      console.log(user)
      auth.getBundleFromStore().then(bundle => {
        console.log(bundle)
      }).catch(e => {
        initData().then(bundle => {
          if(bundle && bundle.status && bundle.status === 'success') {
            storage.set('bundle', bundle.configuration)
            this.setState({ bundle: bundle.configuration })
            console.log(bundle)
          } else {
            Toast.show({
              message: 'An error occurred during server interaction. Please, restart the app',
              position: 'bottom',
              type: 'danger',
              buttonText: 'Okay',
              onClose: () => (
                this.props.navigation.navigate('Login')
              )
            })
          }
        })
      })
    }).catch(e => {
      Toast.show({
        message: 'Sorry, you are not logged in',
        position: 'bottom',
        buttonText: 'Login',
        type: 'danger',
        onClose: () => {
          this.props.navigation.navigate('Login')
        }
      });
      this.props.navigation.navigate('Login')
    });
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