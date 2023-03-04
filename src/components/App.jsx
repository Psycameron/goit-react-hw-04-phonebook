import React, { Component } from 'react';

import ContactForm from './ContactForm/ContactForm';
import { ContactList } from './ContactList';
import { Filter } from './Filter';

import { nanoid } from 'nanoid';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('my contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('my contacts', JSON.stringify(this.state.contacts));
    }
  }

  formSubmitHandler = data => {
    const contact = {
      id: nanoid(),
      name: data.name,
      number: data.number,
    };

    // if (this.state.contacts.filter(contact => contact.name === data.name)) {
    //   console.log(this.state.contacts);
    //   console.log(`🚀 ~ App ~ contact.name:`, contact.name);
    //   console.log(`🚀 ~ App ~ data.name:`, data.name);

    //   return alert(`${data.name} is already contacts`);
    // }

    const contactNamesList = this.state.contacts.map(contact => contact.name);

    if (contactNamesList.includes(data.name)) {
      return alert(`${data.name} is already contacts`);
    }

    this.setState(({ contacts }) => ({
      contacts: [...contacts, contact],
    }));
  };

  filterChange = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;

    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    const { filter } = this.state;

    const visibleContacts = this.getVisibleContacts();

    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          // alignItems: 'center',
          marginLeft: 300,
          fontSize: 40,
          color: '#010101',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.formSubmitHandler} />

        <h2>Contacts</h2>
        <Filter value={filter} onChange={this.filterChange} />
        <ContactList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        />
      </div>
    );
  }
}

export default App;
