import React from 'react';
import { Container, Header, Content, Spinner } from 'native-base'

export default Loading = () => (
  <Container>
    <Header />
    <Content>
      <Spinner color='green' />
    </Content>
  </Container>
)