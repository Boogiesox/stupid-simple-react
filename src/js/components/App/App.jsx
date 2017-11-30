import React from 'react';
import PropTypes from 'prop-types';

import ExampleComponent from '../ExampleComponent';

class App extends React.Component {
    constructor(props) {
        // Accesses property of the parent class
        // Not needed here, but necessary if you want access to props in constructor.
        super(props);

        this.state = {
            value: "",
        };
        
        // Binding in the constructor:
        // https://medium.com/shoutem/react-to-bind-or-not-to-bind-7bf58327e22a
        this.handleValueSelectionChange = this.valueSelectionChange.bind(this);
    }

    valueSelectionChange(v) {
        // Functional state updates
        this.setState((previousState, props) => ({
            value: v,
        }));
    }

    render() {
        const { // Just some destructuring of state properties
            value
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
            </div>
        );
    }
}

export default App;
