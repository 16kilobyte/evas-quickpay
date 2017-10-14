import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Button, Text, Toast, Picker } from 'native-base';

import login from '../api/login';
import * as storage from '../utils/storage'
import * as auth from '../utils/auth'

const TaxPayer = ({ vehicleTypes }) => (
  <View>
    <Item>
      <Picker
        onValueChange={serviceId => this.updateState({ serviceId })}
        iosHeader="Select Service"
        mode="dropdown"
        placeholder="Select Service"
        selectedValue={this.state.serviceId}>
          vehicleTypes.map(vehicleType => (
            <Item label={vehicleType.service} key={vehicleType.id} />
          ))
      </Picker>
    </Item>
  </View>
)


const Vehicle = ({ vehicleTypes, vehicleCategories, vehicleServices, updateState, state }) => (
  <View>
    <Item>
      <Picker
        onValueChange={vehicleType => updateState({ vehicleType })}
        iosHeader="Vehichle Type"
        mode="dropdown"
        placeholder="Vehichle Type"
        selectedValue={state.vehicleType}>
          vehicleTypes.map(vehicleType => (
            <Item label={vehicleType.type} key={vehicleType.id} />
          ))
      </Picker>
    </Item>
    <Item>
      <Picker
        onValueChange={vehicleCategory => updateState({ vehicleCategory })}
        iosHeader="Vehichle Category"
        mode="dropdown"
        placeholder="Vehichle Category"
        selectedValue={state.vehicleCategory}>
          vehicleCategories.map(vehicleCategory => (
            <Item label={vehicleCategory.category} key={vehicleCategory.id} />
          ))
      </Picker>
    </Item>
    <Item>
      <Picker
        onValueChange={serviceId => this.updateState({ serviceId })}
        iosHeader="Select Service"
        mode="dropdown"
        placeholder="Select Service"
        selectedValue={this.state.serviceId}>
          vehicleServices.map(vehicleService => (
            <Item label={vehicleService.service} key={vehicleService.id} />
          ))
      </Picker>
    </Item>
  </View>
)

const Insurance = ({ vehicleTypes, vehicleCategories, insuranceServices, updateState, state }) => (
  <View>
    <Item>
      <Picker
        onValueChange={vehicleType => updateState({ vehicleType })}
        iosHeader="Vehichle Type"
        mode="dropdown"
        placeholder="Vehichle Type"
        selectedValue={state.vehicleType}>
          vehicleTypes.map(vehicleType => (
            <Item label={vehicleType.type} key={vehicleType.id} />
          ))
      </Picker>
    </Item>
    <Item>
      <Picker
        onValueChange={vehicleCategory => updateState({ vehicleCategory })}
        iosHeader="Vehichle Category"
        mode="dropdown"
        placeholder="Vehichle Category"
        selectedValue={state.vehicleCategory}>
          vehicleCategories.map(vehicleCategory => (
            <Item label={vehicleCategory.category} key={vehicleCategory.id} />
          ))
      </Picker>
    </Item>
    <Item>
      <Picker
        onValueChange={serviceId => this.updateState({ serviceId })}
        iosHeader="Select Insurance"
        mode="dropdown"
        placeholder="Select Insurance"
        selectedValue={this.state.serviceId}>
          insuranceServices.map(insuranceService => (
            <Item label={insuranceService.title} key={insuranceService.id} />
          ))
      </Picker>
    </Item>
  </View>
)

export default class StartPayment extends Component {
  
  static navigationItems = {
    navigationItems: ({navigation}) => ({
      title: `${navigation.state.params.name}'s Profile'`,
    })
  };

  constructor(props) {
    super(props)
    this.state = {
      fullName: '',
      phone: '',
      serviceType: 'taxPayer',
      bundle: {},
      serviceId: '',
      vehicleType: '',
      vehicleCategory: '',
      amount: 0
    }
  }

  componentDidMount() {
    if(!auth.isLoggedIn) {
      this.props.navigation.navigate('Login')
    } else {
      this.setState({ user: storage.get('user') })
    }
  }

  updateState(newState = {}) {
    this.setState(newState)
  }

  computeCost() {
    let amount = this.state.bundle.configurations[this.state.serviceType].find((obj, key) => {
      if(obj.id === this.state.serviceId) {
        return obj.cost
      }
    })
    this.setState({ amount })
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="First name" onChange={name => this.updateState({ name })} />
            </Item>
            <Item>
              <Input placeholder="Phone" onChange={phone => this.updateState({ phone })} />
            </Item>
            <Item>
              <Picker
                onValueChange={serviceType => this.updateEmail({ serviceType })}
                iosHeader="Service Type"
                mode="dropdown"
                placeholder="Service Type"
                selectedValue={this.state.serviceType}>
                <Item label="Tax Payer Services" key="taxPayer" />
                <Item label="Vehicle Services" key="vehicle" />
                <Item label="Third Party Insurance" key="insurance" />
              </Picker>
            </Item>
            { this.state.serviceType === 'taxPayer' && <TaxPayer /> }
            { this.state.serviceType === 'vehicle' && <Vehicle /> }
            { this.state.serviceType === 'insurance' && <Insurance /> }
            <Button block success>
              <Text>Pay ₦{this.state.amount}</Text>
            </Button>
          </Form>
        </Content>
      </Container>
    );
  }
}