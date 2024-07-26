import { Provider } from 'react-redux'

import store from './store'

import ContactForm from './components/ContactForm'
import ContactList from './components/ContactList'

import EstiloGlobal, { Container } from './styles'

function App() {
  return (
    <Provider store={store}>
      <EstiloGlobal />
      <Container>
        <h1>Lista de Contatos</h1>
        <ContactForm />
        <ContactList />
      </Container>
    </Provider>
  )
}

export default App
