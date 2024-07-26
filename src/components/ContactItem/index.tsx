// src/components/ContactItem.tsx
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import { removeContact } from '../../store/reducers/contact'
import Contact from '../../models/Contact'
import ContactForm from '../ContactForm'

import { Item, Button, EditButton } from './styles'

type ContactItemProps = {
  contact: Contact
}

const ContactItem: React.FC<ContactItemProps> = ({ contact }) => {
  const dispatch = useDispatch()
  const [isEditing, setIsEditing] = useState(false)

  const handleDelete = () => {
    dispatch(removeContact(contact.id))
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  return (
    <Item>
      {isEditing ? (
        <ContactForm
          contact={contact}
          isEditing={isEditing}
          onCancelEdit={handleCancelEdit}
        />
      ) : (
        <>
          <div>
            <p>{contact.name}</p>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
          </div>
          <div>
            <EditButton onClick={handleEdit}>Editar</EditButton>
            <Button onClick={handleDelete}>Remover</Button>
          </div>
        </>
      )}
    </Item>
  )
}

export default ContactItem
