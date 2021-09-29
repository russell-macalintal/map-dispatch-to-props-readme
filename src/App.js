import React, { Component } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { addTodo } from './actions/todo.js';

class App extends Component {

  state = {
    todo: ''
  }

  // Action-creator function is being imported from a third-party file
  // addTodo = () => {
  //   return ({
  //     type: 'ADD_TODO',
  //     todo: this.state.todo
  //   })
  // }

  handleOnChange = event => {
    this.setState({
      todo: event.target.value
    });
  }

  handleOnSubmit = event => {
    event.preventDefault();
    console.log("Todo being added: ", this.state.todo);
    this.props.addTodo(this.state.todo);
    this.setState({ todo: '' });
  }

  render() {
    const renderTodos = () => this.props.todos.map(todo => <li key={todo}>{todo}</li>);
    return (
      <div className="App">
      <form onSubmit={(event) => this.handleOnSubmit(event)}>
        <input
          type="text"
          onChange={(event) => this.handleOnChange(event)}
          id="todos"
          placeholder="add todo" 
          value={this.state.todo}/>
        <input type="submit" />
      </form>
      <h2>Todos:</h2>
        <ol>{renderTodos()}</ol>
      </div>
    );
  }
};

// Traditional Method to map store state
// const mapStateToProps = (state) => {
//   return {
//     todos: state.todos
//   };
// };

// Traditional Method to map dispatch()
// const mapDispatchToProps = (dispatch) => {
//   return {
//     addTodo: (todo) => {
//       dispatch(addTodo(todo))
//     }
//   }
// }

// Traditional Method to map dispatch()
// export default connect(mapStateToProps, mapDispatchToProps)(App);

// Alternate Method to map action-creator function without explicit call to dispatch() - 1
// { props-key: action-creator-name }
// export default connect(mapStateToProps, { addTodo: addTodo })(App);

// Alternate Method to map action-creator function without explicit call to dispatch() - 2
// props-key and action-creator-name match
// export default connect(mapStateToProps, { addTodo })(App);

export default connect((state) => ({ todos: state.todos }), { addTodo })(App);