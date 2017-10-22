import React, { Component } from 'react'
import { View, AsyncStorage, Dimensions, StyleSheet, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast, Picker, Icon, List, ListItem } from 'native-base'
import PiePayment from 'pie-react-native/index'

import TaxPayer from '../components/TaxPayer'
import Insurance from '../components/Insurance'
import Vehicle from '../components/Vehicle'
import Colors from '../assets/literals/colors'

const SCREEN = Dimensions.get('window')

export default class StartPayment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      phone: '',
      vehicleNumber: '',
      serviceType: 'taxPayer',
      bundle: {},
      serviceId: null,
      vehicleType: null,
      vehicleCategory: null,
      amount: 0,
      visibility: false,
      paymentGateway: 'PIE.NG',
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state
    if(!params.user || !params.bundle) {
      this.props.navigation.navigate('Login')
    } else {
      this.setState({ bundle: params.bundle, user: params.user })
    }
  }

  updateState(newState = {}) {
    this.setState(newState, this.updateAmount)
  }

  updateAmount() {
    let { bundle } = this.props.navigation.state.params
    if(this.state.serviceType === 'taxPayer' && this.state.serviceId) {
      let costObj = bundle.taxPayerServiceCosts.find((service, key) => {
        return (service['csid'] === this.state.serviceId)
      })
      if(costObj) {
        this.setState({ amount: costObj.cost/100 })
      } else {
        this.setState({ amount: 0 })
      }
    }
    
    if(this.state.serviceType === 'vehicle' && this.state.serviceId
    && this.state.vehicleType && this.state.vehicleCategory) {
      let { vehicleType, vehicleCategory, serviceId } = this.state
      console.log('state', { vehicleType, vehicleCategory, serviceId })
      let costObj = bundle.vehicleServiceCosts.find((service, key) => {
        return (service['sid'] === this.state.serviceId
                  && service['cid'] === this.state.vehicleCategory
                  && service['tid'] === this.state.vehicleType)
      })
      console.log('vehicle', costObj)
      if(costObj) {
        this.setState({ amount: costObj.cost/100 })
      } else {
        this.setState({ amount: 0 })
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
        this.props.saveInsurance({ fullName, phone, vehicleNumber, vehicleCategory, amount, paymentGateway, vehicleType, serviceType, serviceId })
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
              <Item style={[styles.item]}>
                <Input placeholder="First name" onChangeText={name => this.updateState({ fullName })} />
              </Item>
              <Item style={[styles.item]}>
                <Input placeholder="Phone" onChangeText={phone => this.updateState({ phone })} />
              </Item>
              <Item style={[styles.item]}>
                <Input placeholder="Vehicle Number" onChangeText={vehicleNumber => this.updateState({ vehicleNumber })} />
              </Item>
              <View style={{ padding: 10 }}>
                <Picker
                  onSelectedItemsChange={serviceType => this.updateState({ serviceType })}
                  iosHeader="Service Type"
                  mode="dialog"
                  placeholder="Service Type"
                  selectedValue={this.state.serviceType}
                  styles={[styles.picker]}>
                  <Item label="Service type" value="" />
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: SCREEN.height,
    justifyContent: 'center',
    padding: 8
  },
  item: {
    marginVertical: 8
  },
  picker: {
    margin: 20,
  },
  primaryBtn: {
    backgroundColor: Colors.primaryColor,
  },
  btn: {
    margin: 12,
    borderRadius: 4,
  }
});