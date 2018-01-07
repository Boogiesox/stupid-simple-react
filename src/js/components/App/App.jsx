import React from 'react';
import PropTypes from 'prop-types';
import JSONPretty from 'react-json-pretty'; // Component for a nice, formatted JSON rendering

import ExampleComponent from '../ExampleComponent';

class App extends React.Component {
    static propTypes = {
        onGetAllPosts: PropTypes.func,
        onGetSinglePost: PropTypes.func,
        onGetSinglePostComments: PropTypes.func,
    }

    static defaultProps = {
        onGetAllPosts: () => {},
        onGetSinglePost: () => {},
        onGetSinglePostComments: () => {},
    }

    constructor(props) {
        // Accesses property of the parent class
        // Not needed here, but necessary if you want access to props in constructor.
        // e.g. Assigning prop values to state is popular for initializing a component
        super(props);

        this.state = {
            value: '',
            posts: 'No Data',
        };

        // Binding in the constructor:
        // https://medium.com/shoutem/react-to-bind-or-not-to-bind-7bf58327e22a
        this.handleValueSelectionChange = this.valueSelectionChange.bind(this);
        this.handleGetAllPosts = this.getAllPosts.bind(this);
        this.handleGetSinglePost = this.getSinglePost.bind(this);
        this.handleGetSinglePostComments = this.getSinglePostComments.bind(this);
    }

    valueSelectionChange(v) {
        return this.setState((previousState, props) => ({
            value: v,
        }));
    }

    exampleDataChanged(data) {
        // Functional state updates
        this.setState(() => ({
            data,
        }));
    }

    getAllPosts() {
        return this.props.onGetAllPosts().then(data => {
            this.exampleDataChanged(data);
        });
    }

    getSinglePost() {
        return this.props.onGetSinglePost().then(data => {
            this.exampleDataChanged(data);
        });
    }

    getSinglePostComments() {
        return this.props.onGetSinglePostComments().then(data => {
            this.exampleDataChanged(data);
        });
    }

    render() {
        const { // Just some destructuring of state properties
            value,
            data,
        } = this.state;

        return ( // The JSX 
            <div>
                <ExampleComponent
                    value={this.state.value}
                    onChange={this.handleValueSelectionChange}
                />

                <h3>
                    {this.state.value}
                </h3>

                <button onClick={this.handleGetAllPosts}>Get All Posts</button>
                <button onClick={this.handleGetSinglePost}>Get Single Post</button>
                <button onClick={this.handleGetSinglePostComments}>Get Post Comments</button>

                <fieldset>
                    <legend>
                        Get Posts
                    </legend>

                    <JSONPretty json={data} />
                </fieldset>
            </div>
        );
    }
}

export default App;
