import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import reactCSS from 'reactcss'

const PROP_TYPES = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
};

const DEFAULT_PROPS = {
    onChange: () => {},
};

const ExampleComponent = ({ onChange, value }) => {
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