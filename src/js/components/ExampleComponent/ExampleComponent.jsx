import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactCSS from 'reactcss'

// I just like to define these as constants at the top so the
// component shape is easily found and referenced in the file.
// They are assigned below (otherwise you're assigning before
// defining the component).
const PROP_TYPES = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};

const DEFAULT_PROPS = {
    onChange: () => {},
};

const ExampleComponent = ({ onChange, value }) => {
    // Using ClassNames helper from NPM to conditionally assign
    // classes to any element using this variable as a className.
    // https://github.com/JedWatson/classnames
    const inputClass = classNames({
        'too-long': value && value.length > 5,
    });

    return (
        <div>
            <input
                onChange={(e) => { onChange(e.target.value); }}
                value={value}
                className={inputClass}
            />
            
            <style jsx>{`
                .too-long {
                    color: red;
                }
            `}</style>
        </div>
    );
}

ExampleComponent.propTypes = PROP_TYPES;
ExampleComponent.defaultProps = DEFAULT_PROPS;

export default ExampleComponent;
