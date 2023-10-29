import React from "react";
import CounterRedux from "./CounterRedux";
import HelloRedux from "./HelloRedux";
import AddReducer from "./AddRedux";
import TodoList from "./todos/TodoList";

const ReduxExamples = () => {
  return(
    <div>
      <h2>Redux Examples</h2>
      <HelloRedux />
      <CounterRedux />
      <AddReducer />
      <TodoList />
      <hr />
    </div>
  );
};

export default ReduxExamples;