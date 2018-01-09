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
        this.valueSelectionChange = this.valueSelectionChange.bind(this);
        this.getAllPosts = this.getAllPosts.bind(this);
        this.getSinglePost = this.getSinglePost.bind(this);
        this.getSinglePostComments = this.getSinglePostComments.bind(this);
        this.getError404 = this.getError404.bind(this);
    }

    valueSelectionChange(value) {
        return this.setState((previousState, props) => ({
            value, // Shorthand for { value: value }
        }));
    }

    exampleDataChanged(data) {
        // Functional state updates
        this.setState(() => ({
            data,
        }));
    }

    getAllPosts() {
        return this.props.onGetAllPosts()
            .then(data => { this.exampleDataChanged(data);},
            e => { alert('There was a 500-level error'); });
    }

    getSinglePost() {
        return this.props.onGetSinglePost()
            .then(data => { this.exampleDataChanged(data);},
            e => { alert('There was a 500-level error'); });
    }

    getSinglePostComments() {
        return this.props.onGetSinglePostComments()
            .then(data => { this.exampleDataChanged(data); },
            e => { alert('There was an 500-level error'); });
    }

    getError404() { // 400-level are valid responses. Catch handles 500-level responses
        return this.props.onGetError404()
            .then(data => {
                this.exampleDataChanged(data);
                switch (data.response.status) { // Handlers for 400-level responses
                    case 404:
                        alert(`The resource at ${data.config.url} could not be found`);
                        break;
                
                    default:
                        break;
                }
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

                <fieldset>
                    <button onClick={this.getAllPosts}>Get All Posts</button>
                    <button onClick={this.getSinglePost}>Get Single Post</button>
                    <button onClick={this.getSinglePostComments}>Get Post Comments</button>
                    <button onClick={this.getError404}>Get 404 Error</button>

                    <legend>
                        Example API
                    </legend>

                    <JSONPretty json={data} />
                </fieldset>
            </div>
        );
    }
}

export default App;
