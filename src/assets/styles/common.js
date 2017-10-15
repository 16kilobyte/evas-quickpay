import { StyleSheet, Dimensions } from 'react-native';
import Colors from '../literals/colors';

const Screen = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Screen.height,
    justifyContent: 'center',
    padding: 8
  },
  item: {
    marginVertical: 15
  },
  primaryBtn: {
    backgroundColor: Colors.primaryColor,
  },
  btn: {
    margin: 12,
    borderRadius: 4,
  }
})