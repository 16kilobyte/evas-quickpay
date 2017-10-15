import  React from 'react';
import { View } from 'react-native';
import { Item, Picker } from 'native-base';

export default Vehicle = ({ vehicleTypes, vehicleCategories, vehicleServices, updateState, state }) => (
  <View>
    <Picker
      onValueChange={vehicleType => updateState({ vehicleType })}
      iosHeader="Vehichle Type"
      mode="dialog"
      placeholder="Vehichle Type"
      selectedValue={state.vehicleType}>
        {vehicleTypes.map(vehicleType => (
          <Item label={vehicleType.type} key={vehicleType.id} value={vehicleType.id} />
        ))}
    </Picker>
    <Picker
      onValueChange={vehicleCategory => updateState({ vehicleCategory })}
      iosHeader="Vehicle Category"
      mode="dialog"
      placeholder="Vehicle Category"
      selectedValue={state.vehicleCategory}>
        {vehicleCategories.map(vehicleCategory => (
          <Item label={vehicleCategory.category} key={vehicleCategory.id} value={vehicleCategory.id} />
        ))}
    </Picker>
    <Picker
      onValueChange={serviceId => updateState({ serviceId })}
      iosHeader="Select Service"
      mode="dialog"
      placeholder="Select Service"
      selectedValue={state.serviceId}>
        {vehicleServices.map(vehicleService => (
          <Item label={vehicleService.service} key={vehicleService.id} value={vehicleService.id} />
        ))}
    </Picker>
  </View>
)
