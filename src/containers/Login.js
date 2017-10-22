import React, { Component } from 'react'
import { View, AsyncStorage, Dimensions, StyleSheet, Image } from 'react-native'
import { Container, Content, Form, Item, Input, Button, Text, Toast, Spinner, Icon } from 'native-base'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import { connect } from 'react-redux'

import { isWorking, isDoneWorking, loginSuccess, loginFail } from '../actions'
import { getIsWorking } from '../reducers'
import Colors from '../assets/literals/colors'
import styles from '../assets/styles/common.js'
import { loginApi } from '../utils'

const SCREEN = Dimensions.get('window');

class Login extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emailError: false,
      passwordError: false,
    }
  }

  async componentDidMount() {
    let { email, password } = this.state
    try {
      let user = await AsyncStorage.getItem('user')
      console.log('Login->mounted', user)
      if(user !== null) {
        this.props.navigation.navigate('Menu')
      }
    } catch(e) {
      console.log('Login', e)
    }
  }

  handleLogin() {
    let { email, password } = this.state, unAuthUser = { email, password }
    const { navigate } = this.props.navigation
    const isReady = this.props.isReady
    if(!email.length) {
      this.setState({ emailError: true })
    } else this.setState({ emailError: false })
    if(!password.length) {
      this.setState({ passwordError: true })
    } else this.setState({ passwordError: false })
    if(email.length && password.length) {
      if(isReady) {
        isWorking()
        return loginApi(unAuthUser).then((authUser, token) => {
          loginSuccess(authUser, token)
          AsyncStorage.setItem('user', JSON.stringify(authUser))
          isDoneWorking()
          navigate('Menu')
          console.log('authUser', authUser)
        }).catch(error => {
          loginFail(error)
          isDoneWorking()
          Toast.show({
            text: error.message || error,
            type: 'danger',
            duration: 5000,
          })
        })
      } else {
        console.log('handleLogin', 'App is busy')
      }
    }
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={[styles.container]}>
            <Image source={require('../assets/images/displayLogo.png')} height={64} />
            {!this.props.isReady && <Spinner color={Colors.primaryColor} />}
            <Form>
              <Item style={[styles.item]} error={this.state.emailError}>
                <Input placeholder="Email" onChangeText={email => this.setState({ email })} keyboardType="email-address" />
              </Item>
              <Item style={[styles.item]} error={this.state.passwordError}>
                <Input placeholder="Password" onChangeText={password => this.setState({ password })} secureTextEntry />
              </Item>
              <Button
                block
                iconRight
                onPress={() => this.handleLogin()}
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

const mapStateToProps = (state) => ({
  isReady: () => getIsWorking(state)
})

const mapDispatchToProps = (dispatch) => ({
  isWorking: () => dispatch(isWorking()),
  isDoneWorking: () => dispatch(isDoneWorking()),
  loginSuccess: (user, token) => dispatch(loginSuccess(user, token)),
  loginFail: (error) => dispatch(loginFail(error)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)