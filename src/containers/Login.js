import React, { Component } from 'react';
import { View, AsyncStorage, Dimensions, StyleSheet, Image } from 'react-native';
import { Container, Content, Form, Item, Input, Button, Text, Toast, Spinner, Icon } from 'native-base';
import KeyboardSpacer from 'react-native-keyboard-spacer';

import login from '../api/login';
import * as storage from '../utils/storage';
import * as auth from '../utils/auth';
import Colors from '../assets/literals/colors';
import styles from '../assets/styles/common.js';

const SCREEN = Dimensions.get('window');

export default class Login extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      working: false
    }
  }

  async componentDidMount() {
    try {
      let user = await AsyncStorage.getItem('user');
      if(user !== null) {
        this.props.navigation.navigate('Home');
      }
    } catch(e) {
      console.log('Login', e);
    }
  }

  login() {
    if(!this.state.working){
      console.log(this.state);
      this.setState({ working: true })
      login(this.state).then(response => {
        console.log(response);
        AsyncStorage.setItem('user', JSON.stringify(response));
        this.props.navigation.navigate('Home')
      }).catch(e => {
        this.setState({ working: false })
        Toast.show({
          text: 'Wrong login credentials',
          position: 'bottom',
          buttonText: 'Okay',
          type: 'danger',
          duration: 5000
        });
      });
    }
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
        <Content>
          <View style={[styles.container]}>
            <Image source={require('../assets/images/displayLogo.png')} height={64} />
            {this.state.working && <Spinner color={Colors.primaryColor} />}
            <Form>
              <Item style={[styles.item]}>
                <Input placeholder="Email" onChangeText={email => this.updateEmail(email)} />
              </Item>
              <Item style={[styles.item]}>
                <Input placeholder="Password" onChangeText={password => this.updatePassword(password)} />
              </Item>
              <Button
                block
                iconRight
                onPress={() => this.login()}
                style={[styles.primaryBtn, styles.btn]}>
                <Text>Login</Text>
                <Icon name="ios-arrow-forward" />
              </Button>
            </Form>
            <KeyboardSpacer />
          </View>
        </Content>
      </Container>
    );
  }
}