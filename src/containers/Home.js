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
      user: '',
    }
  }

  componentDidMount() {
    if(!auth.isLoggedIn) {
      this.props.navigation.navigate('Login')
    } else {
      initData().then()
      this.setState({ user: storage.get('user') })
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Button block success onPress={() => this.props.navigation.navigate('StartPayment')}>
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