import React, { Component } from 'react'
import { View, AsyncStorage, Dimensions, StyleSheet, Image } from 'react-native'
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast, Picker, Icon, Spinner } from 'native-base'
import { connect } from 'react-redux'

import TaxPayer from '../components/TaxPayer'
import Insurance from '../components/Insurance'
import Vehicle from '../components/Vehicle'
import Colors from '../assets/literals/colors'

import { saveInsurance } from '../actions'

const SCREEN = Dimensions.get('window')

class InsurancePayment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      fullNameError: false,
      phone: '',
      phoneError: false,
      vehicleNumber: '',
      vehicleNumberError: false,
      bundle: {},
      serviceId: null,
      vehicleType: null,
      vehicleCategory: null,
      amount: 0,
      visibility: false,
      paymentGateway: 'PIE.NG',
      wait: false
    }
  }

  componentDidMount() {
    const { params } = this.props.navigation.state;
    console.log(params);
    if(!params.user || !params.bundle) {
      this.props.navigation.navigate('Login');
    } else {
      this.setState({ bundle: params.bundle, user: params.user });
    }
  }

  updateState(newState = {}) {
    this.setState(newState, this.updateAmount);
  }

  updateAmount() {
    this.setState({ wait: true })
    let { bundle } = this.props.navigation.state.params
    if(this.state.serviceId && this.state.vehicleType && this.state.vehicleCategory) {
        let { vehicleType, vehicleCategory, serviceId } = this.state
        console.log('state', { vehicleType, vehicleCategory, serviceId })
      let costObj = bundle.insuranceServiceCosts.find((service, key) => {
        return (service['iid'] === this.state.serviceId
                  && service['cid'] === this.state.vehicleCategory
                  && service['tid'] === this.state.vehicleType)
      })
      if(costObj) {
        this.setState({ amount: costObj.cost/100 })
        this.setState({ wait: false })
      } else {
        this.setState({ amount: 0 })
        Toast.show({
          text: 'Invalid combination selected',
          type: 'warning',
          duration: 5000
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
        let { fullName, phone, vehicleNumber, vehicleCategory, amount, paymentGateway, vehicleType } = this.state
        this.props.saveInsurance({ fullName, phone, vehicleNumber, vehicleCategory, amount, paymentGateway, vehicleType, serviceType: 'insurance' })
        this.props.navigation.navigate('Payment')
      }
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    const { bundle, user } = params
    return (
      <Container>
        <Content>
          <View style={[styles.container]}>
            <Image source={require('../assets/images/displayLogoSm.png')} />
            <Form>
              <Item style={[styles.item]} error={this.state.fullNameError}>
                <Input placeholder="First name" onChangeText={name => this.updateState({ name })} />
              </Item>
              <Item style={[styles.item]} error={this.state.phoneError}>
                <Input placeholder="Phone" onChangeText={phone => this.updateState({ phone })} />
              </Item>
              <Item style={[styles.item]} error={this.state.vehicleNumberError}>
                <Input placeholder="Vehicle Number" onChangeText={vehicleNumber => this.updateState({ vehicleNumber })} />
              </Item>
              <View style={{ padding: 10 }}>
                <Insurance
                  state={this.state}
                  updateState={(key, val) => this.updateState(key, val)}
                  vehicleTypes={bundle.vehicleTypes}
                  vehicleCategories={bundle.vehicleCategories}
                  insuranceServices={bundle.insuranceServices} />
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
    )
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
})

const mapStateToProps = (state) => ({
  store: state
})

const mapDispatchToProps = (dispatch) => ({
  saveInsurance: (insurance) => dispatch(saveInsurance(insurance))
})

export default connect(mapStateToProps, mapDispatchToProps)(InsurancePayment)