import React, { Component } from 'react'
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast, Icon, Spinner } from 'native-base'
import { View, Image, StyleSheet, AsyncStorage } from 'react-native'

import styles from '../assets/styles/common.js'
import Colors from '../assets/literals/colors'

export default class UpdateStore extends Component {

  constructor(props) {
    super(props)
    this.state = {
      working: false,
      error: {}
    }
  }

  componentDidMount() {
    // AsyncStorage
  }

  syncStore() {
    this.setState({ working: true })
    try {
      initData().then(response => {
        if(response && response.status && response.status === 'success') {
          AsyncStorage.setItem('bundle', JSON.stringify(response.configurations));
          Toast.show({
            type: 'success',
            text: 'Sync completed',
            buttonText: 'Okay',
            duration: 5000,
            onClose: () => {
              this.props.navigation.navigate('Home')
            }
          });
          this.setState({ working: false });
        } else {
          Toast.show({
            type: 'danger',
            text: 'Could not sync with server. Please, try again',
            buttonText: 'Okay',
            duration: 5000,
            onClose: () => {
              this.props.navigation.navigate('Home')
            }
          });
        }
      })
    } catch(e) {
      this.setState({ working: false, error: e });
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={[styles.container]}>
            <Image source={require('../assets/images/displayLogo.png')} height={64} />
            {this.state.working && <Spinner color={Colors.primaryColor} />}
            <Form>
              <Button block iconRight onPress={() => this.syncStore()} style={[styles.primaryBtn, styles.btn]}>
                <Text>Sync Store</Text>
                <Icon name="ios-sync-outline" />
              </Button>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}