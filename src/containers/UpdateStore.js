import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast } from 'native-base';

import login from '../api/login';
import * as storage from '../utils/storage'
import * as auth from '../utils/auth'

export default class UpdateStore extends Component {
  
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
    if(!auth.isLoggedIn) {
      this.props.navigation.navigate('Login')
    }
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Button block success>
              <Text>Update Store</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}