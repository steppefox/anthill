import React                  from 'react';
import { bindActionCreators } from 'redux';
import { connect }            from 'react-redux';
import B from 'bem-cn';

import TodosView              from '../TodosView/TodosView';
import TodosForm              from '../TodosForm/TodosForm';
import * as TodoActions       from '../../actions/TodoActions';

import './Home.css';

const b = B('ComponentName');

export default class Home extends React.Component {
    render() {
        const { todos, dispatch } = this.props;

        return (
            <div id="todo-list">
                <TodosView todos={[]}
                    {...bindActionCreators(TodoActions, dispatch)} />
                <TodosForm
                    {...bindActionCreators(TodoActions, dispatch)} />
            </div>
        );
    }
}
