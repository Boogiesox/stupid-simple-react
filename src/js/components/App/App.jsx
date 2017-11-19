import React from 'react';
import PropTypes from 'prop-types';

import ExampleComponent from '../ExampleComponent';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: "",
        };

        this.handleValueSelectionChange = this.valueSelectionChange.bind(this);
    }

    valueSelectionChange(v) {
        this.setState(() => ({
            value: v,
        }));
    }

    render() {
        const {
            value
        } = this.state;

        return (
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