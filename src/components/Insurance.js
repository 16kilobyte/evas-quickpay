import React from 'react';
import { View } from 'react-native';
import { Item, Picker } from 'native-base';

export default Insurance = ({ vehicleTypes, vehicleCategories, insuranceServices, updateState, state }) => (
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
        onValueChange={serviceId => updateState({ serviceId })}
        iosHeader="Select Insurance"
        mode="dropdown"
        placeholder="Select Insurance"
        selectedValue={state.serviceId}>
          insuranceServices.map(insuranceService => (
            <Item label={insuranceService.title} key={insuranceService.id} />
          ))
      </Picker>
    </Item>
  </View>
)