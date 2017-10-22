import React, { Component } from 'react'
import { View, StyleSheet, Image, Dimensions, AsyncStorage } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast, Icon } from 'native-base'

import { getConfigurations } from '../utils'
import Colors from '../assets/literals/colors'
import styles from '../assets/styles/common.js'

const SCREEN = Dimensions.get('window');

export default class Menu extends Component {

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
        this.setState({ user });
        let bundle = await AsyncStorage.getItem('bundle');
        if(bundle !== null) {
          bundle = JSON.parse(bundle)
          this.setState({ bundle });
        } else {
          getConfigurations().then(response => {
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
        navigation.navigate('Login')
      }
    } catch(e) {
      console.log(`${e} in src/container/Menu`);
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
    return (
      <Container>
        <Content>
          <View style={[styles.container]}>
            <Image source={require('../assets/images/displayLogo.png')} height={64} />
            {this.state.working && <Spinner color={Colors.primaryColor} />}
            <Button
              block
              iconRight
              onPress={() => this.props.navigation.navigate('Insurance', { bundle: this.state.bundle, user: this.state.user })}
              style={[styles.primaryBtn, styles.btn]}>
              <Text>Insurance</Text>
              <Icon name="ios-pulse" />
            </Button>
            <Button
              block
              iconRight
              onPress={() => this.props.navigation.navigate('Services', { bundle: this.state.bundle, user: this.state.user })}
              style={[styles.primaryBtn, styles.btn]}>
              <Text>Start Payment</Text>
              <Icon name="ios-card" />
            </Button>
            <Button block success iconRight onPress={() => this.props.navigation.navigate('UpdateStore')} style={[styles.btn]}>
              <Text>Update Database</Text>
              <Icon name="ios-settings" />
            </Button>
          </View>
        </Content>
      </Container>
    );
  }
}