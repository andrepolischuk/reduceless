import React from 'react';
import {connect} from 'react-redux';
import get from 'lodash/get';
import setStateByPath from './setStateByPath';
import replaceStateByPath from './setStateByPath';

/**
 * Connect provided component to `path` part of the redux state
 * @param path
 * @returns {Function}
 */
export default function connectSlicedState(path) {
  return function (WrappedComponent) {
    class Connect extends React.Component {
      render() {
        return (
          <WrappedComponent {...this.props}/>
        );
      }
    }
    return connect(
      state => state,
      dispatch => ({dispatch}),
      (state, {dispatch}, props) => {
        const slicedState = get(state, path);
        return {
          ...props,
          state: slicedState,
          setState: newState => dispatch(setStateByPath(path, newState)),
          replaceState: newState => dispatch(replaceStateByPath(path, newState)),
        };
      }
    )(Connect);
  };
}
