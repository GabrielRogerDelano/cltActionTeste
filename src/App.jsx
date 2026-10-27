import { useState } from 'react'
import Menu from './components/Menu.jsx'
import CadastroCliente from './components/CadastroCliente.jsx'
import CadastroVenda from './components/CadastroVenda.jsx'
import Manifestacao from './components/Manifestacao.jsx'
import Relatorios from './components/Relatorios.jsx'
import Marketing from './components/Marketing.jsx'

export default function App() {
  const [tela, setTela] = useState('cliente')

  const telas = {
    cliente: <CadastroCliente />,
    venda: <CadastroVenda />,
    manifestacao: <Manifestacao />,
    relatorios: <Relatorios />,
    marketing: <Marketing />
  }

  return (
    <div className="app">
      <header className="topbar">
        <h1>CLI-action — Satisfação no Atendimento</h1>
        <p>Automatize, ouça o cliente e transforme percepção em métrica</p>
      </header>

      <Menu atual={tela} onSelect={setTela} />
      {telas[tela]}
    </div>
  )
}
