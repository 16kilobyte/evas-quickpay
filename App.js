import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Button, Text, Left, Icon, Body, Title, Right, Header, Content, Footer, FooterTab, Form, Item, Input } from 'native-base';
import Expo from 'expo'


export default class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      ready: false
    }
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf'),
    });
    this.setState({ ready: true })
  }

  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
