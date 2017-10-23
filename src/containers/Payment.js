import React, { Component } from 'react'
import { View, AsyncStorage, Dimensions, StyleSheet, Image } from 'react-native'
import { Container, Content, Button, Text, Toast } from 'native-base'
import { connect } from 'react-redux'
import { CustomSpinner } from '../components/Loading'

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
    const { isWorking, isDoneWorking, transactionStarted, transactionFail, navigation, store } = this.props
    const { phone, phoneError } = this.state
    if(!phone.length || phone.length !== 11) {
      this.setState({ phoneError: true })
    } else this.setState({ phoneError: false })
    if(!phoneError) {
      if(!store.isWorking) {
        isWorking()
        return paymentApiCharge({ phone: phone, amount: store.services.savedService.amount, serviceType: store.services.savedService.serviceType})
        .then(transaction => {
          console.log(transaction)
          transactionStarted(transaction)
          isDoneWorking()
          Toast.show({
            text: 'Charge pending validation. Please enter the OTP sent to you',
            type: 'success',
            duration: 5000
          })
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
        Toast.show({
          text: 'App is busy',
          type: 'warning',
          duration: 3000
        })
        console.log('handlePayment', 'App is busy')
      }
    }
  }

  handleConfirmation() {
    const { isWorking, isDoneWorking, quickPaymentMade, navigation, store } = this.props
    const { otp, otpError } = this.state
    if(!otp.length || otp.length !== 6) {
      this.setState({ otpError: true })
    } else this.setState({ otpError: false })
    if(!otpError) {
      if(!store.isWorking) {
        isWorking()
        return paymentApiVerify({ authValue: otp, transactionId: store.payment.transaction.id, serviceType: store.services.savedService.serviceType })
          .then(transaction => {
          transactionVerified(transaction)
          Toast.show({
            text: 'Payment Successful',
            type: 'success'
          })
          const quickObj = {...store.services.savedService, registrationCenter: store.app.user['registration_center'], transactionReference: transaction.id}
          submitQuickPayment(quickObj).then(response => {
            quickPaymentMade(response)
            isDoneWorking()
            Toast.show({
              text: 'Payment Successful',
              type: 'success',
              position: "top"
            })
            setTimeout(() => {
              navigation.navigate('Menu')
            }, 5000);
          }).catch(error => {
            transactionFail(error)
            isDoneWorking()
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
        Toast.show({
          text: 'App is busy',
          type: 'warning',
          duration: 3000
        })
        console.log('handleConfirmation', 'App is busy')
      }
    }
  }

  render() {
    const { store, navigation } = this.props
    console.log('Payment->render', store)
    return (
      <Container>
        <Content>
          <CustomSpinner visible={store.isWorking} />
          {store.payment.step === 1 &&
            <PaymentStep1
              style={styles}
              isWorking={store.isWorking}
              updateSate={obj => this.setState(obj)}
              cancelPayment={() => navigation.goBack()}
              handlePayment={() => this.handlePayment()}
              amount={store.services.savedService.amount}
              phoneError={this.state.phoneError} />}
          {store.payment.step === 2 &&
            <PaymentStep2
              style={styles}
              isWorking={store.isWorking}
              updateSate={obj => this.setState(obj)}
              cancelPayment={() => navigation.goBack()}
              handleConfirmation={() => this.handleConfirmation()}
              amount={store.services.savedService.amount}
              otpError={this.state.otpError} />}
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  isReady: getIsWorking(state),
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