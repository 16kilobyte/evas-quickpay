import React, { Component } from 'react'
import { View, AsyncStorage, Dimensions, StyleSheet, Image } from 'react-native'
import { Container, Content, Form, Item, Input, Button, Text, Toast, Spinner, Icon } from 'native-base'
import { connect } from 'react-redux'

import { isWorking, isDoneWorking, loginSuccess, loginFail } from '../actions'
import { getIsWorking } from '../reducers'
import Colors from '../assets/literals/colors'
import styles from '../assets/styles/common.js'
import { paymentApiCharge } from '../utils'

import PaymentStep1 from '../components/PaymentStep1'
import PaymentStep2 from '../components/PaymentStep1'

const SCREEN = Dimensions.get('window');

class Payment extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      phoneError: false,
      step: 1,
    }
  }

  async componentDidMount() {
    // let { email, password } = this.state
    // try {
    //   let user = await AsyncStorage.getItem('user')
    //   if(user === null) {
    //     this.props.navigation.navigate('Login')
    //   }
    // } catch(e) {
    //   console.log('Payment', e)
    // }
  }

  handlePayment() {
    const { navigate } = this.props.navigation
    const isReady = this.props.isReady
    if(!phone.length || phone.length !== 11) {
      this.setState({ phoneError: true })
    } else this.setState({ phoneError: false })
    if(!this.state.phoneError) {
      if(isReady) {
        isWorking()
        return paymentApiCharge({ phone: this.state.phone, amount: this.props.store.savedService.amount }).then((authUser, token) => {
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
          {this.state.step === 1 &&
            <PaymentStep1
              style={styles}
              isReady={this.props.isReady}
              updateSate={(obj) => this.setState(obj)}
              handlePayment={() => this.handlePayment}
              phoneError={this.state.phoneError} />}
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
  // loginSuccess: (user, token) => dispatch(loginSuccess(user, token)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Payment)