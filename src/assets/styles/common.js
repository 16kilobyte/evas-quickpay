import { StyleSheet, Dimensions } from 'react-native'
import Colors from '../literals/colors'
import { Constants } from 'expo'

const Screen = Dimensions.get('window');

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    height: Screen.height,
    justifyContent: 'center',
    padding: 8
  },
  container2: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight
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
  },
  item: {
    marginVertical: 8
  },
  picker: {
    margin: 20,
  },
  primaryBtn: {
    backgroundColor: Colors.primaryColor,
  },
  btn: {
    margin: 12,
    borderRadius: 4,
  }
})