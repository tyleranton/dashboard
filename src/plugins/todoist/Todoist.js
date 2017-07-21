import React from 'react';
import styled from 'styled-components';
import { getTodos, completeTodo } from './util/todos';
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
    getTodos().then(todos => this.setState({ todos }));
  }

  completeTodo = todo => {
    completeTodo(todo).then(todos => this.setState({ todos }));
  };

  render() {
    return (
      <Container>
        <h3>Todoist</h3>
        {this.state.todos && this.state.todos.length > 0
          ? <TodoList
              todos={this.state.todos}
              completeTodo={this.completeTodo}
            />
          : <p>No todos.</p>}
      </Container>
    );
  }
}
