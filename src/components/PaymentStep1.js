import React from 'react'
import { View, Image } from 'react-native'
import { Form, Item, Icon, Button, Input, Text } from 'native-base'
import KeyboardSpacer from 'react-native-keyboard-spacer'
import Colors from '../assets/literals/colors'

export default ({ style, updateSate, handlePayment, isReady, phoneError }) => (
  <View style={[style.container]}>
    <Image source={require('../assets/images/pieLogo.png')} style={{height: 124, width: 124, alignSelf: 'center'}} />
    {!isReady && <Spinner color={Colors.primaryColor} />}
    <Form>
      <Item style={[style.item]} error={phoneError}>
        <Input placeholder="pieWallet phone number" onChangeText={phone => updateSate({ phone })} keyboardType="phone-pad" style={{ textAlign: 'center' }} />
      </Item>
      <Button
        block
        iconRight
        onPress={() => handlePayment()}
        style={[style.primaryBtn, style.btn]}>
        <Text>Pay</Text>
        <Icon name="ios-arrow-forward" />
      </Button>
    </Form>
    <KeyboardSpacer />
  </View>
)