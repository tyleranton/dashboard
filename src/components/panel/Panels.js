import React from 'react';
import update from 'react/lib/update';
import styled from 'styled-components';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import plugins from '../../plugins';

const uuidv4 = require('uuid/v4');

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  align-content: flex-start;
  flex-wrap: wrap;
  flex: 1;
  height: 100%;
  order: 2;
  padding-bottom: 1%;
  padding-right: 1%;
`;

class Panels extends React.Component {
  constructor(props) {
    super(props);
    this.movePanel = this.movePanel.bind(this);
    this.state = {
      panels: plugins
    };
  }

  movePanel(dragIndex, hoverIndex) {
    const { panels } = this.state;
    const dragPanel = panels[dragIndex];

    this.setState(
      update(this.state, {
        panels: {
          $splice: [[dragIndex, 1], [hoverIndex, 0, dragPanel]]
        }
      })
    );
  }

  render() {
    const { panels } = this.state;

    return (
      <Container>
        {panels.map((Panel, i) => {
          return (
            <Panel key={uuidv4()} index={i} id={i} movePanel={this.movePanel} />
          );
        })}
      </Container>
    );
  }
}

export default DragDropContext(HTML5Backend)(Panels);
