import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast } from 'native-base';

import login from '../api/login';
import * as storage from '../utils/storage'
import * as auth from '../utils/auth'

export default class Login extends Component {
  
  static navigationOptions = {
    navigationOptions: ({navigation}) => ({
      title: `${navigation.state.params.name}'s Profile'`,
    })
  };

  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: ''
    }
  }

  componentDidMount() {
    if(auth.isLoggedIn) {
      this.props.navigation.navigate('Home')
    }
  }

  login() {
    login(this.state).then(response => {
      storage.set('user', response);
      this.props.navigation.navigate('Home')
    }).catch(e => {
      Toast.show({
        text: 'Wrong login credentials',
        position: 'bottom',
        buttonText: 'Retry'
      })
      console.error('Login failed with the error', e)
    })
  }

  updateEmail(email) {
    this.setState({ email })
  }

  updatePassword(password) {
    this.setState({ password })
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Email" onChange={email => this.updateEmail(email)} />
            </Item>
            <Item>
              <Input placeholder="Password" />
            </Item>
            <Button block success>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}