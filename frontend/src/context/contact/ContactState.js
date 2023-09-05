import React, { useReducer } from 'react';
import uuid from 'uuid';
import ContactContext from './contactContext';
import ContactReducer from './contactReducer';
import {
  ADD_CONTACT,
  DELETE_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
} from '../types';

const ContactState = (props) => {
  const initialState = {
    contacts: [
      {
        type: 'professional',
        id: '60949381c5db1c3d8831bc9d',
        name: 'Marry Willing',
        email: 'mwill@gmail.com',
        phone: '444-345-11234',
        user: '60942160bf58d9491c37270e',
        date: '2021-05-07T01:10:25.772Z',
        __v: 0,
      },
      {
        type: 'personal',
        id: '609428845eaf8c18d49cdac6',
        name: 'Harry Potter',
        email: 'hpotter@gmail.com',
        phone: '333-2333-2322',
        user: '60942160bf58d9491c37270e',
        date: '2021-05-06T17:33:56.654Z',
        __v: 0,
      },
      {
        type: 'personal',
        id: '6094286e5eaf8c18d49cdac5',
        name: 'Ted Daddy',
        email: 'tedd@gmail.com',
        phone: '222-2222-2222',
        user: '60942160bf58d9491c37270e',
        date: '2021-05-06T17:33:34.780Z',
        __v: 0,
      },
      {
        type: 'professional',
        id: '6094284c5eaf8c18d49cdac4',
        name: 'Sara Corner',
        email: 'sscorner@gmail.com',
        phone: '111-1111-1111',
        user: '60942160bf58d9491c37270e',
        date: '2021-05-06T17:33:00.797Z',
        __v: 0,
      },
    ],
    current: null,
    filtered: null
  };

  const [state, dispatch] = useReducer(ContactReducer, initialState);

  // Add Contact
  const addContact = (contact) => {
    contact.id = uuid.v4();
    dispatch({ type: ADD_CONTACT, payload: contact });
  };
  // Delete Contact
  const deleteContact = (id) => {
    dispatch({ type: DELETE_CONTACT, payload: id });
  };

  // Set Current Contact
  const setCurrent = (contact) => {
    dispatch({ type: SET_CURRENT, payload: contact });
  };
  // Clear Current Contact
  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT });
  };
  // Update Contact 
  const updateContact = (contact) => {
    dispatch({ type: UPDATE_CONTACT, payload: contact });
  };
  // Filter Contact
  const filterContacts = (text) => {
    dispatch({ type: FILTER_CONTACTS, payload: text });
  };
  // Clear Filter
  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER});
  };
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        addContact,
        updateContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        filterContacts,
        clearFilter,
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
