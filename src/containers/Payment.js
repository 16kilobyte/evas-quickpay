import React, { Component } from 'react'
import { View, AsyncStorage, Dimensions, StyleSheet, Image } from 'react-native'
import { Container, Content, Form, Item, Input, Button, Text, Toast, Spinner, Icon } from 'native-base'
import { connect } from 'react-redux'

import { isWorking, isDoneWorking, transactionStarted, transactionFail, transactionVerified, quickPaymentMade } from '../actions'
import { getIsWorking } from '../reducers'
import Colors from '../assets/literals/colors'
import styles from '../assets/styles/common.js'
import { paymentApiCharge, paymentApiVerify, submitQuickPayment } from '../utils'

import PaymentStep1 from '../components/PaymentStep1'
import PaymentStep2 from '../components/PaymentStep2'

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

  handlePayment() {
    const { isReady, isWorking, isDoneWorking, transactionStarted, transactionFail, navigation, store } = this.props
    const { phone, phoneError } = this.state
    if(!phone.length || phone.length !== 11) {
      this.setState({ phoneError: true })
    } else this.setState({ phoneError: false })
    if(!phoneError) {
      if(isReady) {
        console.log(phone)
        isWorking()
        return paymentApiCharge({ phone: phone, amount: this.props.store.services.savedService.amount })
        .then(transaction => {
          console.log(transaction)
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
        console.log('handlePayment', 'App is busy')
      }
    }
  }

  handleConfirmation() {
    const { isReady, isWorking, isDoneWorking, quickPaymentMade, navigation, store } = this.props
    const { otp, otpError } = this.state
    if(!otp.length || otp.length !== 6) {
      this.setState({ otpError: true })
    } else this.setState({ otpError: false })
    if(!otpError) {
      if(isReady) {
        isWorking()
        return paymentApiVerify({ authValue: otp, transactionId: store.payment.transaction.id })
          .then(transaction => {
          transactionVerified(transaction)
          Toast.show({
            text: 'Payment Success',
            type: 'success'
          })
          const quickObj = {...store.services.savedService, registrationCenter: store.app.user.registrationCenter, transactionReference: transaction.id}
          submitQuickPayment(quickObj).then(response => {
            quickPaymentMade(response)
            navigation.navigate('Menu')
          }).catch(error => {
            transactionFail(error)
            Toast.show({
              text: error.message || error,
              type: 'danger',
            })
          })
          console.log('handleConfirmation->transaction', transaction)
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
        console.log('handleConfirmation', 'App is busy')
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
              updateSate={obj => this.setState(obj)}
              handlePayment={() => this.handlePayment()}
              phoneError={this.state.phoneError} />}
          {this.props.store.payment.step === 2 &&
            <PaymentStep2
              style={styles}
              isReady={this.props.isReady}
              updateSate={obj => this.setState(obj)}
              handleConfirmation={() => this.handleConfirmation()}
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
  transactionStarted: transaction => dispatch(transactionStarted(transaction)),
  transactionVerified: transaction => dispatch(transactionVerified(transaction)),
  transactionFail: error => dispatch(transactionFail(error)),
  quickPaymentMade: quickObj => dispatch(quickPaymentMade(quickObj))
})

export default connect(mapStateToProps, mapDispatchToProps)(Payment)