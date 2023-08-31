/*
    render behavior
      ✓ renders component without error (3 ms) - Paired done 
      ✓ render without loading state (2 ms) - Paired done
      ✓ render with loading state (3 ms) - Cindy 
      ✓ renders the auto-populated value if it exists (5 ms) - Mena
      ✓ renders component with options (5 ms) - Cindy
      ✓ renders with error msg (8 ms) - Mena
    controlled behavior
      ✓ selects option (8 ms) - Pair
      ✓ when a function is passed to onClick, it is called (6 ms)
      ✓ when a function is not passed to onClick, it is not called (3 ms)
      ✓ options list depends on empty field value (2 ms)
      ✓ options list depends on filled field value (2 ms)
      ✓ toggles options list (3 ms)
      ✓ shows options list depends on field value (2 ms)
      ✓ closes options list on click outside (4 ms)
*/


import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import FormAutosuggest from '../FormAutosuggest';
import FormAutosuggestOption from '../FormAutosuggestOption';

function FormAutosuggestWrapper(props) {
  return (
    <IntlProvider locale="en" messages={{}}>
      <FormAutosuggest {...props} />
    </IntlProvider>
  );
}

function FormAutosuggestTestComponent(){
  const onSelected = jest.fn();
  const onClick = jest.fn();
  return (
    <FormAutosuggestWrapper
      name="FormAutosuggest"
      floatingLabel="floatingLabel text"
      helpMessage="Example help message"
      errorMessageText="Example error message"
      onSelected={onSelected}
    >
      <FormAutosuggestOption>Option 1</FormAutosuggestOption>
      <FormAutosuggestOption onClick={onClick}>Option 2</FormAutosuggestOption>
      <FormAutosuggestOption>Learn from more than 160 member universities</FormAutosuggestOption>
    </FormAutosuggestWrapper>
  );
}

// const container = mount(
  //     <FormAutosuggestWrapper
  //       name="FormAutosuggest"
  //       floatingLabel="floatingLabel text"
  //       helpMessage="Example help message"
  //       errorMessageText="Example error message"
  //       onSelected={onSelected}
  //     >
  //       <FormAutosuggestOption>Option 1</FormAutosuggestOption>
  //       <FormAutosuggestOption onClick={onClick}>Option 2</FormAutosuggestOption>
  //       <FormAutosuggestOption>Learn from more than 160 member universities</FormAutosuggestOption>
  //     </FormAutosuggestWrapper>,
  //   );

describe('render behavior', () => {
     

      it('renders component without error', () => {
        render(<FormAutosuggestWrapper />);
      });
  
      it('renders without loading state', () => {
        const { container } = render( <FormAutosuggestTestComponent />);
        expect(container.querySelector('.pgn__form-autosuggest__dropdown-loading')).toBeNull();
      });
  
      it('render with loading state', () => {
        const { container } = render(<FormAutosuggestWrapper isLoading />);
        expect(container.querySelector('.pgn__form-autosuggest__dropdown-loading')).toBeTruthy();
      });
  
  //     it('renders the auto-populated value if it exists', () => {
  //       const wrapper = mount(<FormAutosuggestWrapper value="Test Value" />);
  
  //       expect(wrapper.find('input').instance().value).toEqual('Test Value');
  //       expect(wrapper.props().value).toEqual('Test Value');
  //     });
  
      it('renders component with options', () => {
        const { getByTestId, container } = render(<FormAutosuggestTestComponent />);
        const input = getByTestId("pgn__form-autosuggest__dropdown-box")
        fireEvent.click(input)
        const list = container.querySelectorAll('button');
        expect(list.length).toBe(3); //TO DO: Change this to look for <li>
      });
  
  
      it('renders with error msg', () => {
        const input = screen.getByTestId('autosuggest-textbox')
        fireEvent.click(input)
        // fireEvent(
        //   getByRole(container, 'input'),
        //   new MouseEvent('click', {
        //     bubbles: true,
        //   }),
        // )
        container.update();
        const formControlFeedback = getByText('FormControlFeedback');
  
        expect(formControlFeedback).toBeInTheDocument();
      });
    });

    //
    //
    // OLD ERROR MESSAGE TEST BELOW: -----------
    //
    //

    // it('renders with error msg', () => {
      //       container.find('input').simulate('click');
      //       act(() => {
      //         const event = new Event('click', { bubbles: true });
      //         document.dispatchEvent(event);
      //       });
      //       container.update();
      //       const formControlFeedback = container.find('FormControlFeedback');
      
      //       expect(formControlFeedback.text()).toEqual('Example error message');
      //     });
      //   });






//
//
// OLD CODE BELOW --------------------- :
//
//

// import React from 'react';
// import { mount } from 'enzyme';
// import { act } from 'react-dom/test-utils';
// import { IntlProvider } from 'react-intl';
// import FormAutosuggest from '../FormAutosuggest';
// import FormAutosuggestOption from '../FormAutosuggestOption';

// const createDocumentListenersMock = () => {
//   const listeners = {};
//   const handler = (domEl, e) => listeners?.[e]?.({ target: domEl });

//   document.addEventListener = jest.fn((e, fn) => { listeners[e] = fn; });
//   document.removeEventListener = jest.fn(e => { delete listeners[e]; });

//   return {
//     click: domEl => handler(domEl, 'click'),
//   };
// };

// function FormAutosuggestWrapper(props) {
//   return (
//     <IntlProvider locale="en" messages={{}}>
//       <FormAutosuggest {...props} />
//     </IntlProvider>
//   );
// }

// describe('FormAutosuggest', () => {
//   afterEach(() => {
//     jest.clearAllMocks();
//   });

//   const onSelected = jest.fn();
//   const onClick = jest.fn();

//   const container = mount(
//     <FormAutosuggestWrapper
//       name="FormAutosuggest"
//       floatingLabel="floatingLabel text"
//       helpMessage="Example help message"
//       errorMessageText="Example error message"
//       onSelected={onSelected}
//     >
//       <FormAutosuggestOption>Option 1</FormAutosuggestOption>
//       <FormAutosuggestOption onClick={onClick}>Option 2</FormAutosuggestOption>
//       <FormAutosuggestOption>Learn from more than 160 member universities</FormAutosuggestOption>
//     </FormAutosuggestWrapper>,
//   );

//   describe('render behavior', () => {
//     it('renders component without error', () => {
//       mount(<FormAutosuggestWrapper />);
//     });

//     it('render without loading state', () => {
//       expect(container.exists('.pgn__form-autosuggest__dropdown-loading')).toBe(false);
//       expect(container.props().isLoading).toBeUndefined();
//     });

//     it('render with loading state', () => {
//       const wrapper = mount(<FormAutosuggestWrapper isLoading />);

//       expect(wrapper.exists('.pgn__form-autosuggest__dropdown-loading')).toBe(true);
//       expect(wrapper.props().isLoading).toBe(true);
//     });

//     it('renders the auto-populated value if it exists', () => {
//       const wrapper = mount(<FormAutosuggestWrapper value="Test Value" />);

//       expect(wrapper.find('input').instance().value).toEqual('Test Value');
//       expect(wrapper.props().value).toEqual('Test Value');
//     });

//     it('renders component with options', () => {
//       container.find('input').simulate('click');
//       const optionsList = container.find('.pgn__form-autosuggest__dropdown').find('button');

//       expect(optionsList.length).toEqual(3);
//     });

//     it('renders with error msg', () => {
//       container.find('input').simulate('click');
//       act(() => {
//         const event = new Event('click', { bubbles: true });
//         document.dispatchEvent(event);
//       });
//       container.update();
//       const formControlFeedback = container.find('FormControlFeedback');

//       expect(formControlFeedback.text()).toEqual('Example error message');
//     });
//   });

//   describe('controlled behavior', () => {
//     it('selects option', () => {
//       container.find('input').simulate('click');
//       container.find('.pgn__form-autosuggest__dropdown').find('button')
//         .at(0).simulate('click');

//       expect(container.find('input').instance().value).toEqual('Option 1');
//       expect(onSelected).toHaveBeenCalledWith('Option 1');
//       expect(onSelected).toHaveBeenCalledTimes(1);
//     });

//     it('when a function is passed to onClick, it is called', () => {
//       container.find('input').simulate('change', { target: { value: 'Option 2' } });
//       container.find('.pgn__form-autosuggest__dropdown').find('button')
//         .at(0).simulate('click');

//       expect(onClick).toHaveBeenCalledTimes(1);
//     });

//     it('when a function is not passed to onClick, it is not called', () => {
//       container.find('input').simulate('change', { target: { value: 'Option 1' } });
//       container.find('.pgn__form-autosuggest__dropdown').find('button')
//         .at(0).simulate('click');

//       expect(onClick).toHaveBeenCalledTimes(0);
//     });

//     it('options list depends on empty field value', () => {
//       container.find('input').simulate('change', { target: { value: '' } });

//       expect(container.find('input').instance().value).toEqual('');
//     });

//     it('options list depends on filled field value', () => {
//       container.find('input').simulate('change', { target: { value: 'option 1' } });

//       expect(container.find('.pgn__form-autosuggest__dropdown').find('button').length).toEqual(1);
//       expect(onSelected).toHaveBeenCalledTimes(0);
//     });

//     it('toggles options list', () => {
//       const dropdownContainer = '.pgn__form-autosuggest__dropdown';

//       expect(container.find(dropdownContainer).find('button').length).toEqual(1);

//       container.find('button.pgn__form-autosuggest__icon-button').simulate('click');
//       expect(container.find(dropdownContainer).find('button').length).toEqual(0);

//       container.find('button.pgn__form-autosuggest__icon-button').simulate('click');
//       expect(container.find(dropdownContainer).find('button').length).toEqual(1);
//     });

//     it('shows options list depends on field value', () => {
//       container.find('input').simulate('change', { target: { value: '1' } });

//       expect(container.find('.pgn__form-autosuggest__dropdown').find('button').length).toEqual(2);
//     });

//     it('closes options list on click outside', () => {
//       const fireEvent = createDocumentListenersMock();
//       const dropdownContainer = '.pgn__form-autosuggest__dropdown';

//       container.find('input').simulate('click');
//       expect(container.find(dropdownContainer).find('button').length).toEqual(2);

//       act(() => { fireEvent.click(document.body); });
//       container.update();

//       expect(container.find(dropdownContainer).find('button').length).toEqual(0);
//     });
//   });
// });
