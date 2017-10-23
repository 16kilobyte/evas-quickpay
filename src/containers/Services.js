import React, { Component } from 'react'
import { View, AsyncStorage, Dimensions, StyleSheet, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast, Picker, Icon, Spinner } from 'native-base'
import { connect } from 'react-redux'

import TaxPayer from '../components/TaxPayer'
import Insurance from '../components/Insurance'
import Vehicle from '../components/Vehicle'
import Colors from '../assets/literals/colors'

import { isWorking, isDoneWorking, transactionStarted, transactionFail, saveService } from '../actions'
import { getIsWorking } from '../reducers'
import styles from '../assets/styles/common.js'
import { paymentApiCharge, paymentApiVerify } from '../utils'

class Services extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      fullNameError: false,
      phone: '',
      phoneError: false,
      vehicleNumber: '',
      vehicleNumberError: false,
      serviceType: '',
      bundle: {},
      serviceId: null,
      vehicleType: null,
      vehicleCategory: null,
      amount: 0,
      visibility: false,
      wait: false,
      paymentGateway: 'PIE.NG',
    }
  }
  
  updateState(newState = {}) {
    console.log(newState)
    this.setState(newState, this.updateAmount)
  }

  updateAmount() {
    this.setState({ wait: true })
    let { bundle } = this.props.navigation.state.params
    if(this.state.serviceType === 'taxPayer' && this.state.serviceId) {
      let costObj = bundle.taxPayerServiceCosts.find((service, key) => {
        return (service['csid'] === this.state.serviceId)
      })
      if(costObj) {
        this.setState({ amount: costObj.cost/100 })
        this.setState({ wait: false })
      } else {
        this.setState({ amount: 0 })
        Toast.show({
          text: 'Invalid service combination',
          duration: 5000,
          type: 'danger',
        })
      }
    }
    
    if(this.state.serviceType === 'vehicle' && this.state.serviceId
    && this.state.vehicleType && this.state.vehicleCategory) {
      let { vehicleType, vehicleCategory, serviceId } = this.state
      let costObj = bundle.vehicleServiceCosts.find((service, key) => {
        return (service['sid'] === this.state.serviceId
                  && service['cid'] === this.state.vehicleCategory
                  && service['tid'] === this.state.vehicleType)
      })
      if(costObj) {
        this.setState({ amount: costObj.cost/100 })
        this.setState({ wait: false })
      } else {
        this.setState({ amount: 0 })
        Toast.show({
          text: 'Invalid service combination',
          duration: 5000,
          type: 'danger',
        })
      }
    }
  }
  
  _next() {
    if(!this.state.wait) {
      if(!this.state.fullName) this.setState({ fullNameError: true })
      else this.setState({ fullNameError: false })
      if(!this.state.phone) this.setState({ phoneError: true })
      else this.setState({ phoneError: false })
      if(!this.state.vehicleNumber) this.setState({ vehicleNumberError: true })
      else this.setState({ vehicleNumberError: false })
      if(!this.state.fullNameError && !this.state.phoneError && !this.state.vehicleNumberError) {
        let { fullName, phone, vehicleNumber, vehicleCategory, amount, paymentGateway, vehicleType, serviceType, serviceId } = this.state
        this.props.saveService({ fullName, phone, vehicleNumber, vehicleCategory, amount, paymentGateway, vehicleType, serviceType, serviceId })
        this.props.navigation.navigate('Payment')
      }
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    const { bundle, user } = params;
    return (
      <Container>
        <Content>
          <View style={[styles.container]}>
            <Image source={require('../assets/images/displayLogoSm.png')} style={{ alignSelf: 'center' }} />
            <Form>
              <Item style={[styles.item]} error={this.state.fullNameError}>
                <Input placeholder="First name" onChangeText={fullName => this.updateState({ fullName })} />
              </Item>
              <Item style={[styles.item]} error={this.state.phoneError}>
                <Input placeholder="Phone" onChangeText={phone => this.updateState({ phone })} keyboardType="phone-pad" />
              </Item>
              <Item style={[styles.item]} error={this.state.vehicleNumberError}>
                <Input placeholder="Vehicle Number" onChangeText={vehicleNumber => this.updateState({ vehicleNumber })} />
              </Item>
              <View style={{ padding: 10 }}>
                <Picker
                  onValueChange={serviceType => this.updateState({ serviceType })}
                  iosHeader="Service Type"
                  mode="dialog"
                  placeholder="Service Type"
                  selectedValue={this.state.serviceType}
                  styles={[styles.picker]}>
                  <Item label="Select Service Type" value="" />
                  <Item label="Tax Payer Services" key="taxPayer" value="taxPayer" />
                  <Item label="Vehicle Services" key="vehicle"  value="vehicle" />
                </Picker>
                { this.state.serviceType === 'taxPayer' &&
                  <TaxPayer
                    state={this.state}
                    updateState={(key, val) => this.updateState(key, val)}
                    taxPayerServices={bundle.taxPayerServices} /> }
                { this.state.serviceType === 'vehicle' &&
                  <Vehicle
                    state={this.state}
                    updateState={(key, val) => this.updateState(key, val)}
                    vehicleTypes={bundle.vehicleTypes}
                    vehicleCategories={bundle.vehicleCategories}
                    vehicleServices={bundle.vehicleServices} /> }
              </View>
              <Button iconRight block onPress={() => this._next()} style={[styles.primaryBtn, styles.btn]}>
                {this.state.wait && <Spinner color="#fff" />}
                <Text>Pay ₦{this.state.amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</Text>
                <Icon name="ios-card" />
              </Button>
            </Form>
          </View>
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state
})

const mapDispatchToProps = (dispatch) => ({
  saveService: (insurance) => dispatch(saveService(insurance))
})

export default connect(mapStateToProps, mapDispatchToProps)(Services)