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
    console.log(this.state);
    login(this.state).then(response => {
      console.log(response);
      storage.set('user', response);
      this.props.navigation.navigate('Home')
    }).catch(e => {
      Toast.show({
        text: 'Wrong login credentials',
        position: 'bottom',
        buttonText: 'Okay'
      });
    });
  }

  updateEmail(email) {
    this.setState({ email })
    console.log('updateEmail', this.state)
  }

  updatePassword(password) {
    this.setState({ password })
    console.log('updatePassword', this.state)
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Email" onChangeText={email => this.updateEmail(email)} />
            </Item>
            <Item>
              <Input placeholder="Password" onChangeText={password => this.updatePassword(password)} />
            </Item>
            <Button block success onPress={() => this.login()}>
              <Text>Login</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}