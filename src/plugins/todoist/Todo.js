import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  height: 50px;
  width: 100%;
  background-color: #555;
  margin: 1%;
  display: table;
  cursor: pointer;
`;

const Content = styled.span`
  display: table-cell;
  vertical-align: middle;
  padding: 5%;
`;

const Todo = ({ todo, completeTodo }) => {
  return (
    <Container onClick={() => completeTodo(todo)}>
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
