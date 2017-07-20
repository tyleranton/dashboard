import React from 'react';
import styled from 'styled-components';
import { getTodos } from './util/todos';
import TodoList from './TodoList';

const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export class Todoist extends React.Component {
  state = {
    todos: []
  };

  componentWillMount() {
    this.setState({ todos: getTodos() });
  }

  render() {
    return (
      <Container>
        <h3>Todos</h3>
        {this.state.todos.length > 0
          ? <TodoList todos={this.state.todos} />
          : <p>No todos.</p>}
      </Container>
    );
  }
}
