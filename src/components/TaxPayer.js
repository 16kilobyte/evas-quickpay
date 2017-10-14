import React from 'react';
import { View } from 'react-native';
import { Item, Picker } from 'native-base';

export default TaxPayer = ({ vehicleTypes , updateState, state }) => (
  <View>
    <Item>
      <Picker
        onValueChange={serviceId => updateState({ serviceId })}
        iosHeader="Select Service"
        mode="dropdown"
        placeholder="Select Service"
        selectedValue={state.serviceId}>
          vehicleTypes.map(vehicleType => (
            <Item label={vehicleType.service} key={vehicleType.id} />
          ))
      </Picker>
    </Item>
  </View>
)