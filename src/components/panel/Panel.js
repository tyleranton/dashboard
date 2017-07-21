import React from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';
import styled from 'styled-components';

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
    connectDragSource: connect.dragSource(),
    connectDragPreview: connect.dragPreview()
  };
};

/**
 * HOC providing a draggable/resizable panel
 * @param {React.Component} Plugin - Your plugin component
 * @param {Object} [config] - Config object for width, height, background color, and resize options.
 */
const createPanel = (Plugin, config) => {
  class Panel extends React.Component {
    static propTypes = {
      connectDragSource: PropTypes.func.isRequired,
      connectDropTarget: PropTypes.func.isRequired,
      index: PropTypes.number.isRequired,
      id: PropTypes.any.isRequired,
      movePanel: PropTypes.func.isRequired
    };

    Container = styled.div`
      padding: 1%;
      width: ${config && config.width ? config.width : '250px'};
      height: ${config && config.height ? config.height : '400px'};
      margin-left: 1%;
      margin-top: 1%;
      background-color: ${config && config.bgColor
        ? config.bgColor
        : '#333333'};
      text-align: center;
      overflow: hidden;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
      transition: all 0.3s cubic-bezier(.25, .8, .25, 1);

      &:active {
        resize: ${config && config.resize ? config.resize : 'none'};
        box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
          0 10px 10px rgba(0, 0, 0, 0.22);
      }

      &:hover {
        resize: ${config && config.resize ? 'both' : 'none'};
      }
    `;

    Draggable = styled.div`
      cursor: move;
      text-align: right;
    `;

    render() {
      const {
        connectDragSource,
        connectDragPreview,
        connectDropTarget
      } = this.props;

      return (
        <this.Container
          ref={instance => {
            const node = findDOMNode(instance);
            connectDragPreview(node);
            connectDropTarget(node);
          }}
        >
          <this.Draggable
            ref={instance => {
              const node = findDOMNode(instance);
              connectDragSource(node);
            }}
          >
            <i className="fa fa-bars" />
          </this.Draggable>

          <Plugin />
        </this.Container>
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
