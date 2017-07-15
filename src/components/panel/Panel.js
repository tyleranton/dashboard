import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import styled from 'styled-components';

const Container = styled.div`
  padding: 1%;
  width: 280px;
  height: 400px;
  margin-left: 1%;
  margin-top: 1%;
  background-color: #333333;
  text-align: center;
  cursor: move;
  overflow: auto;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(.25, .8, .25, 1);

  &:active {
    resize: both;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  &:hover {
    resize: both;
  }
`;

const panelSrc = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index
    };
  }
};

const panelTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    if (dragIndex === hoverIndex) return;

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

    const clientOffset = monitor.getClientOffset();

    const hoverClientX = clientOffset.x - hoverBoundingRect.left;

    if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
      return;
    }

    props.movePanel(dragIndex, hoverIndex);

    monitor.getItem().index = hoverIndex;
  }
};

const collect = connect => {
  return {
    connectDragSource: connect.dragSource()
  };
};

const createPanel = Plugin => {
  class Panel extends React.Component {
    static propTypes = {
      connectDragSource: PropTypes.func.isRequired,
      connectDropTarget: PropTypes.func.isRequired,
      index: PropTypes.number.isRequired,
      id: PropTypes.any.isRequired,
      movePanel: PropTypes.func.isRequired
    };

    render() {
      const { connectDragSource, connectDropTarget } = this.props;

      return (
        <Container
          ref={instance => {
            const node = findDOMNode(instance);
            connectDragSource(node);
            connectDropTarget(node);
          }}
        >
          <Plugin />
        </Container>
      );
    }
  }

  return flow(
    DropTarget('panel', panelTarget, connect => ({
      connectDropTarget: connect.dropTarget()
    })),
    DragSource('panel', panelSrc, collect)
  )(Panel);
};

export default createPanel;
