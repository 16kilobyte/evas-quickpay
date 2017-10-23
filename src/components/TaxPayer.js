import React from 'react';
import { View } from 'react-native';
import { Item, Picker } from 'native-base';

export default TaxPayer = ({ taxPayerServices , updateState, state }) => (
  <Picker
    onValueChange={serviceId => updateState({ serviceId })}
    iosHeader="Select Service"
    mode="dialog"
    placeholder="Select Service"
    selectedValue={state.serviceId}>
      <Item label="Select Taypayer Service" value="" />
      {taxPayerServices.map(taxPayerService => (
        <Item label={taxPayerService.service} key={taxPayerService.id} value={taxPayerService.id} />
      ))}
  </Picker>
)