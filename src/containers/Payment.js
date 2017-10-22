import React, { Component } from 'react'
import { View, AsyncStorage, Dimensions, StyleSheet, Image } from 'react-native'
import { Container, Content, Form, Item, Input, Button, Text, Toast, Spinner, Icon } from 'native-base'
import { connect } from 'react-redux'

import { isWorking, isDoneWorking, transactionStarted, transactionFail } from '../actions'
import { getIsWorking } from '../reducers'
import Colors from '../assets/literals/colors'
import styles from '../assets/styles/common.js'
import { paymentApiCharge, paymentApiVerify } from '../utils'

import PaymentStep1 from '../components/PaymentStep1'
import PaymentStep2 from '../components/PaymentStep2'

const SCREEN = Dimensions.get('window');

class Payment extends Component {
  
  constructor(props) {
    super(props)
    this.state = {
      phone: '',
      phoneError: false,
      otp: '',
      otpError: false,
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
    const isReady = this.props.isReady
    if(!this.state.phone.length || this.state.phone.length !== 11) {
      this.setState({ phoneError: true })
    } else this.setState({ phoneError: false })
    if(!this.state.phoneError) {
      if(isReady) {
        isWorking()
        return paymentApiCharge({ phone: this.state.phone, amount: this.props.store.services.savedService.amount })
          .then(transaction => {
          transactionStarted(transaction)
          isDoneWorking()
          console.log('handlePayment->transaction', transaction)
        }).catch(error => {
          transactionFail(error)
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

  handleConfirmation() {
    const isReady = this.props.isReady
    if(!this.state.otp.length || this.state.otp.length !== 6) {
      this.setState({ otpError: true })
    } else this.setState({ otpError: false })
    if(!this.state.otpError) {
      if(isReady) {
        isWorking()
        return paymentApiVerify({ authValue: this.state.otp, transactionId: this.props.store.payment.transaction.id })
          .then(transaction => {
          transactionVerified(transaction)
          isDoneWorking()
          console.log('handlePayment->transaction', transaction)
        }).catch(error => {
          transactionFail(error)
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
          {this.props.store.payment.step === 1 &&
            <PaymentStep1
              style={styles}
              isReady={this.props.isReady}
              updateSate={(obj) => this.setState(obj)}
              handlePayment={() => this.handlePayment}
              phoneError={this.state.phoneError} />}
          {this.props.store.payment.step === 2 &&
            <PaymentStep2
              style={styles}
              isReady={this.props.isReady}
              updateSate={(obj) => this.setState(obj)}
              handlePayment={() => this.handlePayment}
              otpError={this.state.otpError} />}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isReady: () => getIsWorking(state),
  store: state
})

const mapDispatchToProps = (dispatch) => ({
  isWorking: () => dispatch(isWorking()),
  isDoneWorking: () => dispatch(isDoneWorking()),
  transactionStarted: transaction => dispatch(loginSuccess(transaction)),
  transactionFail: transaction => dispatch(transactionFail(error))
})

export default connect(mapStateToProps, mapDispatchToProps)(Payment)