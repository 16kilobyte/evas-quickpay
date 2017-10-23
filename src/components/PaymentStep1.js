import React from 'react'
import { View, Image } from 'react-native'
import { Form, Item, Icon, Button, Input, Text, Left, Right } from 'native-base'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Colors from '../assets/literals/colors'

export default ({ style, updateSate, handlePayment, isWorking, phoneError, amount = 0, cancelPayment }) => (
  <View style={[style.container, { padding: 15 }]}>
    <Image source={require('../assets/images/pieLogo.png')} style={{height: 124, width: 124, alignSelf: 'center', marginBottom: 25}} />
    <Form>
      <Item style={[style.item]} error={phoneError}>
        <Input
          placeholder="Enter your pieWallet phone number" onChangeText={phone => updateSate({ phone })} keyboardType="phone-pad" style={{ textAlign: 'center' }} />
      </Item>
      <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between', marginTop: 30 }}>
        <Button
        iconLeft
        danger
        rounded
        onPress={() => cancelPayment()}
        style={[style.btn]}
        disabled={isWorking}>
        <Icon name="ios-close-circle" />
        <Text>Cancel</Text>
      </Button>
      <Button
        iconRight
        primary
        onPress={() => handlePayment()}
        style={[style.primaryBtn, style.btn]}
        disabled={isWorking}>
        <Text>Pay ₦{amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')}</Text>
        <Icon name="ios-arrow-dropright-circle" />
      </Button>
      </View>
    </Form>
    <KeyboardSpacer />
  </View>
)