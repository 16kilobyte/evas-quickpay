import React from 'react'
import { BackHandler, StyleSheet, View, ScrollView } from 'react-native'
import { Root, Container, Header, Content, Spinner } from 'native-base'
import Expo, { Constants } from 'expo'
import { StackNavigator, addNavigationHelpers, NavigationActions } from 'react-navigation'
import { Provider, connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import getStore from './src/store'
import { isDoneWorking } from './src/actions'
import { getIsWorking } from './src/reducers'
import styles from './src/assets/styles/common'

// Screens
import Login from './src/containers/Login'
import Menu from './src/containers/Menu'
import Services from './src/containers/Services'
import Insurance from './src/containers/Insurance'
import UpdateStore from './src/containers/UpdateStore'
import Payment from './src/containers/Payment'

import Loading from './src/components/Loading'

const AppNavigator = StackNavigator({
  Login: { screen: Login },
  Menu: { screen: Menu },
  Services: { screen: Services },
  Insurance: { screen: Insurance },
  Payment: { screen: Payment },
  UpdateStore: { screen: UpdateStore },
}, { headerMode: 'none' })

const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams('Login'))

const navReducer = (state = initialState, action) => {
  const newState = AppNavigator.router.getStateForAction(action, state)
  return newState || state
}

class BaseApp extends React.Component {

  constructor(props) {
    super(props)
  }

  async componentWillMount() {
    try {
      await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
      });
      this.props.makeReady()
    } catch(e) {
      console.log(e)
    }
  }

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
  }

  onBackPress = () => {
    const { dispatch, nav } = this.props
    if (nav.index === 0) {
      return false
    }
    dispatch(NavigationActions.back())
    return true
  }

  render() {
    console.log(this.props)
    const { dispatch, nav } = this.props
    if(!this.props.isReady) return (<Loading />)
    return (
      <Root>
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: dispatch,
          state: nav,
        })} />
      </Root>
    );
  }
}

const mapStateToProps = (state) => ({
  nav: state.nav,
  isReady: getIsWorking(state)
});

const mapDispatchToProps = (dispatch) => {
  return {
    // actions: bindActionCreators(actions, dispatch)
    makeReady: () => dispatch(isDoneWorking()),
    dispatch
  };
}

const AppWithNavigationState = connect(mapStateToProps, mapDispatchToProps)(BaseApp);

const store = getStore(navReducer)

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <Provider store={store}>
          <AppWithNavigationState />
        </Provider>
      </Root>
    )
  }
}
