import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  height: 50px;
  width: 100%;
  background-color: #555;
  margin: 1%;
  display: table;
`;

const Content = styled.span`
  display: table-cell;
  vertical-align: middle;
  padding: 5%;
`;

const Todo = ({ todo }) => {
  return (
    <Container>
      <Content>
        {todo.content}
      </Content>
    </Container>
  );
};

Todo.propTypes = {
  todo: PropTypes.object.isRequired
};

export default Todo;
