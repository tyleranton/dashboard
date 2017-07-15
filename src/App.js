import React from 'react';
import styled from 'styled-components';
import SideBar from './components/sidebar/SideBar';
import Panels from './components/panel/Panels';

const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  color: white;
`;

const App = () => {
  return (
    <Container>
      <SideBar />
      <Panels />
    </Container>
  );
};

export default App;
