import React from 'react'
import { View, Image } from 'react-native'
import { Form, Item, Icon, Button, Input, Text } from 'native-base'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Colors from '../assets/literals/colors'

export default ({ style, updateSate, handleConfirmation, isWorking, otpError, amount = 0, cancelPayment, }) => (
  <View style={[style.container]}>
    <Image source={require('../assets/images/pieLogo.png')} style={{height: 124, width: 124, alignSelf: 'center'}} />
    <Form>
      <Item style={[style.item]} error={otpError}>
        <Input placeholder="6 digit OTP" onChangeText={otp => updateSate({ otp })} keyboardType="phone-pad" style={{ textAlign: 'center' }} />
      </Item>
      <View style={{ flexDirection: "row", flex: 1, justifyContent: 'space-between' }}>
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
          onPress={() => handleConfirmation()}
          style={[style.primaryBtn, style.btn]}
          disabled={isWorking}>
          <Text>Confirm (₦{amount.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')})</Text>
          <Icon name="ios-checkmark-circle" />
        </Button>
      </View>
    </Form>
    <KeyboardSpacer />
  </View>
)