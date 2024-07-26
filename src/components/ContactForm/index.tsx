// src/components/ContactForm.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { useDispatch } from 'react-redux'

import { addContact, editContact } from '../../store/reducers/contact'
import Contact from '../../models/Contact'

import * as S from './styles'

type ContactFormProps = {
  contact?: Contact
  isEditing?: boolean
  onCancelEdit?: () => void
}

const ContactForm: React.FC<ContactFormProps> = ({
  contact,
  isEditing,
  onCancelEdit
}) => {
  const [formData, setFormData] = useState<Contact>(
    contact || { name: '', email: '', phone: '', id: 1 }
  )
  const dispatch = useDispatch()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (isEditing) {
      dispatch(editContact(formData as Contact))
    } else {
      dispatch(addContact({ ...formData, id: Date.now() }))
    }
    setFormData({ name: '', email: '', phone: '', id: 1 })
    if (onCancelEdit) {
      onCancelEdit()
    }
  }

  return (
    <S.Form onSubmit={handleSubmit}>
      <S.Input
        type="text"
        name="name"
        placeholder="Nome Completo"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <S.Input
        type="email"
        name="email"
        placeholder="E-mail"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <S.Input
        type="tel"
        name="phone"
        placeholder="Telefone"
        value={formData.phone}
        onChange={handleChange}
        required
      />
      <S.Button type="submit">{isEditing ? 'Salvar' : 'Adicionar'}</S.Button>
      {isEditing && (
        <S.CancelButton type="button" onClick={onCancelEdit}>
          Cancelar
        </S.CancelButton>
      )}
    </S.Form>
  )
}

export default ContactForm
