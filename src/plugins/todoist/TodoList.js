import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Todo from './Todo';

const uuid = require('uuid/v4');

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: scroll;
`;

const TodoList = ({ todos, completeTodo }) => {
  return (
    <Container>
      {todos.map(todo =>
        <Todo key={uuid()} todo={todo} completeTodo={completeTodo} />
      )}
    </Container>
  );
};

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  completeTodo: PropTypes.func.isRequired
};

export default TodoList;
