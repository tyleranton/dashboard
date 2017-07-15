import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  order: 1;
  width: 3%;
  padding: 15px;
  height: 100%;
  border-right: 1px solid #555;
`;

const SideBar = () => {
  return (
    <Container>
      <span>SideBar</span>
    </Container>
  );
};

export default SideBar;
