import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast, Picker } from 'native-base';
import PiePayment from 'pie-react-native'

import login from '../api/login';
import * as storage from '../utils/storage'
import * as auth from '../utils/auth'

import TaxPayer from '../components/TaxPayer';
import Insurance from '../components/Insurance';
import Vehicle from '../components/Vehicle';

export default class StartPayment extends Component {

  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      phone: '',
      serviceType: 'taxPayer',
      bundle: {},
      serviceId: null,
      vehicleType: null,
      vehicleCategory: null,
      amount: 0,
      visibility: false
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
    this.setState(newState);
    this.updateAmount();
  }

  updateAmount() {
    console.log(this.state.serviceId)
    let { bundle } = this.props.navigation.state.params;
    if(this.state.serviceType === 'taxPayer' && this.state.serviceId) {
      let costObj = bundle.taxPayerServiceCosts.find((service, key) => {
        return (service['client_service_id'] === this.state.serviceId);
      });
      if(costObj) {
        this.setState({ amount: costObj.cost/100 });
      } else {
        this.setState({ amount: 0 });
      }
    }
    if(this.state.serviceType === 'insurance' && this.state.serviceId && this.state.vehicleType && this.state.vehicleCategory) {
      let costObj = bundle.insuranceServiceCosts.find((service, key) => {
        return (service['insurance_id'] === this.state.serviceId
                  && service['vehicle_category_id'] === this.state.vehicleCategory
                  && service['vehicle_type_id'] === this.state.vehicleType);
      });
      if(costObj) {
        this.setState({ amount: costObj.cost/100 });
      } else {
        this.setState({ amount: 0 });
      }
    }
    if(this.state.serviceType === 'vehicle' && this.state.serviceId && this.state.vehicleType && this.state.vehicleCategory) {
      let costObj = bundle.vehicleServiceCosts.find((service, key) => {
        return (service['service_id'] === this.state.serviceId
                  && service['vehicle_category_id'] === this.state.vehicleCategory
                  && service['vehicle_type_id'] === this.state.vehicleType);
      });
      if(costObj) {
        this.setState({ amount: costObj.cost/100 });
      } else {
        this.setState({ amount: 0 });
      }
    }
  }

  callback(trxData) {

  }

  render() {
    const { params } = this.props.navigation.state;
    const { bundle, user } = params;
    console.log('StartPayment', bundle.vehicleTypes);
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="First name" onChangeText={name => this.updateState({ name })} />
            </Item>
            <Item>
              <Input placeholder="Phone" onChangeText={phone => this.updateState({ phone })} />
            </Item>
            <Picker
              onValueChange={serviceType => this.updateState({ serviceType })}
              iosHeader="Service Type"
              mode="dropdown"
              placeholder="Service Type"
              headerBackButtonText="Select Service Type"
              headerStyle={{ backgroundColor: "#b95dd3" }}
              headerBackButtonTextStyle={{ color: "#fff" }}
              headerTitleStyle={{ color: "#fff" }}
              selectedValue={this.state.selected5}
              selectedValue={this.state.serviceType}>
              <Item label="Tax Payer Services" key="taxPayer" value="taxPayer" />
              <Item label="Vehicle Services" key="vehicle"  value="vehicle" />
              <Item label="Third Party Insurance" key="insurance" value="insurance" />
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
            { this.state.serviceType === 'insurance' &&
              <Insurance
                state={this.state}
                updateState={(key, val) => this.updateState(key, val)}
                vehicleTypes={bundle.vehicleTypes}
                vehicleCategories={bundle.vehicleCategories}
                insuranceServices={bundle.insuranceServices} /> }
            <Button block success onPress={() => this.setState({ visibility: true })}>
              <Text>Pay ₦{this.state.amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</Text>
            </Button>
          </Form>
        </Content>
        <PiePayment
          pubKey="pk_WG3VlzyJ2NhcFbIr"
          wallet="default"
          commission={0}
          amount={this.state.amount}
          customer="sales@logicaladdress.com"
          visible={this.state.visibility}
          callback={(data) => this.callback(data)} />
      </Container>
    );
  }
}