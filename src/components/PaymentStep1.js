import React from 'react'
import { View, Image, Text } from 'react-native'
import { Form, Item, Icon, Button, Input } from 'native-base'
import KeyboardSpacer from 'react-native-keyboard-spacer'

export default ({ style, updateSate, handlePayment, isReady, phoneError }) => (
  <View style={[style.container]}>
    <Image source={require('../assets/images/displayLogo.png')} height={64} />
    {!isReady && <Spinner color={Colors.primaryColor} />}
    <Form>
      <Item style={[style.item]} error={phoneError}>
        <Input placeholder="pieWallet phone number" onChangeText={email => updateSate({ email })} keyboardType="phone-pad" />
      </Item>
      <Button
        block
        iconRight
        onPress={() => handlePayment()}
        style={[style.primaryBtn, style.btn]}>
        <Text>Login</Text>
        <Icon name="ios-arrow-forward" />
      </Button>
    </Form>
    <KeyboardSpacer />
  </View>
)