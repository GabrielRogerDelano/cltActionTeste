import { useState } from 'react';
import './App.css';

import Menu from './components/Menu.jsx';
import CadastroCliente from './components/CadastroCliente.jsx';
import CadastroVenda from './components/CadastroVenda.jsx';
import Manifestacao from './components/Manifestacao.jsx';
import Marketing from './components/Marketing.jsx';
import Relatorios from './components/Relatorios.jsx';

export default function App() {
  const [tela, setTela] = useState('cliente');

  // Estados compartilhados em memória
  const [clientes, setClientes] = useState([
    {
      id: 1,
      cpf: '12345678900',
      nome: 'Ana Silva',
      email: 'ana@email.com',
      telefone: '11999998888',
      dataNasc: '1995-10-23',
      sexo: 'Feminino',
      mktEmail: true,
      mktWhats: true,
      mktLigacao: false,
      preferencia: 'Produtos'
    },
    {
      id: 2,
      cpf: '98765432100',
      nome: 'Carlos Eduardo',
      email: 'carlos@email.com',
      telefone: '11988887777',
      dataNasc: '1988-10-25',
      sexo: 'Masculino',
      mktEmail: true,
      mktWhats: true,
      mktLigacao: true,
      preferencia: 'Serviços'
    }
  ]);

  const [vendas, setVendas] = useState([
    {
      id: 101,
      idCliente: 1,
      data: '2026-10-20',
      produto: 'Notebook Pro',
      valor: '5200.00',
      formaPagamento: 'Pix',
      funcionario: 'Carlos Vendedor'
    }
  ]);

  const [manifestacoes, setManifestacoes] = useState([
    {
      id: 501,
      idCliente: 1,
      dataRegistro: '2026-10-21',
      dataFinalizacao: '-',
      prazo: '2026-10-28',
      tipo: 'Reclamação',
      meio: 'WhatsApp',
      texto: 'O carregador esquenta muito durante o uso prolongado.',
      classificacao: 'Produto',
      idPedido: 101,
      responsavel: 'Gerente Marcos',
      status: 'Aberto',
      autorizadoRetorno: true
    }
  ]);

  // Mapeamento dinâmico das telas
  const telas = {
    cliente: (
      <CadastroCliente
        clientes={clientes}
        setClientes={setClientes}
        vendas={vendas}
      />
    ),
    venda: (
      <CadastroVenda
        clientes={clientes}
        vendas={vendas}
        setVendas={setVendas}
      />
    ),
    manifestacao: (
      <Manifestacao
        clientes={clientes}
        vendas={vendas}
        manifestacoes={manifestacoes}
        setManifestacoes={setManifestacoes}
      />
    ),
    marketing: <Marketing clientes={clientes} />,
    relatorios: (
      <Relatorios
        manifestacoes={manifestacoes}
        setManifestacoes={setManifestacoes}
        clientes={clientes}
        vendas={vendas}
      />
    )
  };

  return (
    <div className="app-container">
      <header>
        <h1>CLI-action — Satisfação no Atendimento</h1>
        <p>Automatize, ouça o cliente e transforme percepção em métrica</p>
      </header>

      <Menu atual={tela} onSelect={setTela} />

      <main className="content-area">
        {telas[tela]}
      </main>
    </div>
  );
}