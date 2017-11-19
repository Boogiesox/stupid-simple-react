import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import ExampleComponent from './ExampleComponent';

Enzyme.configure({ adapter: new Adapter() });

describe('<ExampleComponent />', () => {
    describe('onChange()', () => {
        it('uses the default when not specified', () => {
            const wrapper = Enzyme.shallow(<ExampleComponent onChange={undefined}/>);
            const Input = wrapper.find('input').at(0);

            expect(Input.props().onChange).toBeDefined();
        });

        it('calls props\' onChange when the value is changed', () => {
            const onChange = jest.fn();
            const wrapper = Enzyme.shallow(<ExampleComponent onChange={onChange} />);
            const Input = wrapper.find('input').at(0);

            Input.simulate('change', {target: {value: ''} });

            expect(onChange).toHaveBeenCalledTimes(1);
        });

        it('calls props\' onChange with the input value when changed', () => {
            const onChange = jest.fn();
            const wrapper = Enzyme.shallow(<ExampleComponent onChange={onChange} />);
            const Input = wrapper.find('input').at(0);

            Input.simulate('change', {target: {value: 'test'} });

            expect(onChange).toHaveBeenCalledWith('test');
        });
    })
});