// Core
import React, { Component } from 'react';
import cx from 'classnames';
import PropTypes from "prop-types";

// Components
import Checkbox from '../../theme/assets/Checkbox';
import Star from '../../theme/assets/Star';
import Edit from '../../theme/assets/Edit';
import Remove from '../../theme/assets/Remove';

// Instruments
import Styles from './styles.m.css';

export default class Task extends Component {

    constructor(props) {
        super(props);
        this.taskInput = React.createRef();
        this.state = {
            isTaskEditing: false,
            newMessage:    this.props.message,
        };
      }

    static propTypes = {
        id:               PropTypes.string.isRequired,
        completed:        PropTypes.bool.isRequired,
        favorite:         PropTypes.bool.isRequired,
        message:          PropTypes.string.isRequired,
        _removeTaskAsync: PropTypes.func.isRequired,
        _updateTaskAsync: PropTypes.func.isRequired,
    };

    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _updateNewTaskMessage = (event) => {
        const { value : newMessage }  = event.target;

        this.setState({ newMessage });
    };

    _setTaskEditingState = (isTaskEditing) => {
        this.taskInput.current.disabled = !isTaskEditing;
        if (isTaskEditing) {
            this.taskInput.current.focus();
        }

        this.setState({
            isTaskEditing,
        });
    };

    _updateTask = () => {
        const { _updateTaskAsync, message } = this.props;
        const { newMessage } = this.state;

        if (message !== newMessage) {
            _updateTaskAsync(
                this._getTaskShape({
                    message: newMessage,
                })
            );
        }
        this._setTaskEditingState(false);

        return null;

    };

    _updateTaskMessageOnKeyDown = (event) => {
        const { newMessage } = this.state;
        const enter = event.key === "Enter";
        const escapeKey = event.key === "Escape";

        if (!newMessage) {
            return null;
        }

        if (enter) {
            this._updateTask();
        }

        if (escapeKey) {
            this._cancelUpdatingTaskMessage();
        }
    };

    _toggleTaskFavoriteState = () => {
        const { _updateTaskAsync, favorite } = this.props;

        _updateTaskAsync(
            this._getTaskShape({
                favorite: !favorite,
            })
        );
    };

    _toggleTaskCompletedState = () => {
        const { _updateTaskAsync, completed } = this.props;

        _updateTaskAsync(
            this._getTaskShape({
                completed: !completed,
            })
        );
    };

    _updateTaskMessageOnClick = () => {
        const { isTaskEditing } = this.state;

        if (isTaskEditing) {
            this._updateTask();

            return null;
        }

        this._setTaskEditingState(true);
    };

    _cancelUpdatingTaskMessage = () => {
        const { message: newMessage } = this.props;

        this._setTaskEditingState(false);

        this.setState({
            newMessage,
        });
    };

    _removeTask = () => {
        const { _removeTaskAsync, id } = this.props;

        _removeTaskAsync(id);
    };

    render () {
        const { completed, favorite } = this.props;
        const { isTaskEditing, newMessage } = this.state;

        return (
            <li
                className = { cx(Styles.task, {
                    [Styles.completed]: completed,
                }) }>
                <div className = { Styles.content }>
                    <Checkbox
                        inlineBlock
                        checked = { completed }
                        className = { Styles.toggleTaskCompletedState }
                        onClick = { this._toggleTaskCompletedState }
                    />
                    <input
                        disabled
                        maxLength = { 50 }
                        ref = { this.taskInput }
                        type = 'text'
                        value = { newMessage }
                        onChange = { this._updateNewTaskMessage }
                        onKeyDown = { this._updateTaskMessageOnKeyDown }
                    />
                </div>
                <div className = { Styles.actions }>
                    <Star
                        inlineBlock
                        checked = { favorite }
                        className = { Styles.toggleTaskFavoriteState }
                        onClick = { this._toggleTaskFavoriteState }
                    />
                    <Edit
                        inlineBlock
                        checked = { isTaskEditing }
                        className = { Styles.updateTaskMessageOnClick }
                        onClick = { this._updateTaskMessageOnClick }
                    />
                    <Remove
                        inlineBlock
                        className = { Styles.removeTask }
                        onClick = { this._removeTask }
                    />
                </div>
            </li>
        );
    }
}
