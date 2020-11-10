import { configureStore } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { Status } from '../../../app/constants/Status';
import { SourceOperationBar } from '../../../app/features/source/SourceOperationBar';
import * as sourceSlice from '../../../app/features/source/sourceSlice';

function setup(
  preloadedState: {
    source: Partial<sourceSlice.State>;
  } = {
    source: {},
  }
) {
  const initialSourceState = {
    list: [],
    activeId: null,
    fetchListStatus: Status.Idle,
    subscribeLink: '',
    subscribeName: '',
    subscribeStep: null,
    subscribeStatus: Status.Idle,
    subscribeError: null,
  };
  const state: {
    source: sourceSlice.State;
  } = {
    source: { ...initialSourceState, ...preloadedState.source },
  };
  const store = configureStore({
    reducer: { source: sourceSlice.sourceReducer },
    preloadedState: state,
  });

  const wrapper = render(
    <Provider store={store}>
      <Router>
        <SourceOperationBar />
      </Router>
    </Provider>
  );

  return {
    store,
    wrapper,
  };
}

describe('SourceOperationBar component', () => {
  it('should match snapshot when list is empty', () => {
    const { wrapper } = setup();

    expect(wrapper.baseElement).toMatchSnapshot();
  });
});
