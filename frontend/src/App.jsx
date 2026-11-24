import { useState, useEffect } from 'react';
import './App.css';
import CadastroCliente from './components/CadastroCliente';
import CadastroVenda from './components/CadastroVenda';
import CadastroManifestacao from './components/CadastroManifestacao';
import Marketing from './components/Marketing';
import Relatorios from './components/Relatorios';
import ModalParecer from './components/ModalParecer';

const formClienteInicial = {
  cpf: '',
  nome: '',
  email: '',
  telefone: '',
  dataNasc: '',
  sexo: 'Masculino',
  mktEmail: false,
  mktWhats: false,
  mktLigacao: false,
  preferencia: 'Produtos'
};

function validarCPF(cpf) {
  const numeros = cpf.replace(/\D/g, '');
  if (numeros.length !== 11 || /^(\d)\1+$/.test(numeros)) return false;

  let soma = 0;
  for (let i = 0; i < 9; i++) soma += parseInt(numeros.charAt(i)) * (10 - i);
  let resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  if (resto !== parseInt(numeros.charAt(9))) return false;

  soma = 0;
  for (let i = 0; i < 10; i++) soma += parseInt(numeros.charAt(i)) * (11 - i);
  resto = (soma * 10) % 11;
  if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(numeros.charAt(10));
}

export default function App() {
  // =========================================================================
  // NAVEGAÇÃO PRINCIPAL E ESTADOS DO BANCO (POSTGRESQL)
  // =========================================================================
  const [telaAtiva, setTelaAtiva] = useState('cadastros');
  const [subAbaCadastros, setSubAbaCadastros] = useState('cliente');

  const [clientes, setClientes] = useState([]);
  const [vendas, setVendas] = useState([]);
  const [manifestacoes, setManifestacoes] = useState([]);

  // =========================================================================
  // ESTADOS DOS FORMULÁRIOS E MODAIS
  // =========================================================================
  const [formCliente, setFormCliente] = useState(formClienteInicial);
  const [erroCliente, setErroCliente] = useState('');
  const [editandoClienteId, setEditandoClienteId] = useState(null);
  const [buscaCliente, setBuscaCliente] = useState('');

  // Bloqueia letras/símbolos (como o *) e formata o CPF
  const handleCpfChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    setFormCliente({ ...formCliente, cpf: valor });
    if (erroCliente) setErroCliente('');
  };

  // Bloqueia letras/símbolos e formata o Telefone
  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');

    setFormCliente({ ...formCliente, telefone: valor });
    if (erroCliente) setErroCliente('');
  };

  const [formVenda, setFormVenda] = useState({
    idCliente: '',
    produto: '',
    valor: '',
    formaPagamento: 'Pix',
    funcionario: '',
    data: ''
  });

  const [formManifestacao, setFormManifestacao] = useState({
    idCliente: '',
    tipo: 'Reclamação',
    meio: 'Telefone',
    texto: '',
    classificacao: 'Comportamental',
    idPedido: '',
    funcionarioEnvolvido: '',
    responsavel: '',
    autorizadoRetorno: false,
    termoLgpd: false
  });

  const [modalParecer, setModalParecer] = useState({
    aberto: false,
  });

  useEffect(() => {
    fetch('http://localhost:3001/api/clientes')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setClientes(data);
        } else {
          console.error('Erro na API de clientes:', data);
        }
      })
      .catch((err) => console.error('Erro ao buscar clientes:', err));

    fetch('http://localhost:3001/api/vendas')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setVendas(data);
        } else {
          console.error('Erro na API de vendas:', data);
        }
      })
      .catch((err) => console.error('Erro ao buscar vendas:', err));

    fetch('http://localhost:3001/api/manifestacoes')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setManifestacoes(data);
        } else {
          console.error('Erro na API de manifestações:', data);
        }
      })
      .catch((err) => console.error('Erro ao buscar manifestações:', err));
  }, []);

  // =========================================================================
  // CRUD DE CLIENTES (CONECTADO AO POSTGRESQL)
  // =========================================================================
  const salvarCliente = async (e) => {
    e.preventDefault();
    setErroCliente('');

    // 1. Valida formato e dígitos verificadores do CPF
    if (!validarCPF(formCliente.cpf)) {
      setErroCliente('CPF inválido. Digite exatamente 11 números válidos (ex: 123.456.789-00).');
      return;
    }

    // 2. Valida duplicidade comparando apenas os dígitos (evita conflito com CPFs sem máscara no banco)
    const cpfLimpo = formCliente.cpf.replace(/\D/g, '');
    const cpfDuplicado = clientes.some(
      c => c.cpf.replace(/\D/g, '') === cpfLimpo && c.id !== editandoClienteId
    );
    if (cpfDuplicado) {
      setErroCliente('Este CPF já pertence a outro cliente cadastrado.');
      return;
    }

    // 3. Valida telefone
    if (formCliente.telefone.replace(/\D/g, '').length < 10) {
      setErroCliente('Telefone inválido. Informe o DDD e o número completo.');
      return;
    }

    // 4. Valida data de nascimento futura
    const hoje = new Date().toISOString().split('T')[0];;
    if (formCliente.dataNasc > hoje) {
      setErroCliente('A data de nascimento não pode ser uma data futura.');
      return;
    }

    // 5. Envia para o PostgreSQL (Atualização ou Novo Cadastro)
    try {
      if (editandoClienteId) {
        // Atualização (PUT)
        const response = await fetch(`http://localhost:3001/api/clientes/${editandoClienteId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formCliente),
        });
        const clienteAtualizado = await response.json();
        setClientes(clientes.map(c => (c.id === editandoClienteId ? clienteAtualizado : c)));
        alert('Cadastro do cliente atualizado com sucesso!');
        setEditandoClienteId(null);
      } else {
        // Novo Cadastro (POST)
        const response = await fetch('http://localhost:3001/api/clientes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formCliente),
        });
        const novoCliente = await response.json();
        setClientes([...clientes, novoCliente]);
        alert('Cliente cadastrado com sucesso!');
      }

      setFormCliente(formClienteInicial);
    } catch (err) {
      console.error('Erro ao salvar cliente:', err);
      setErroCliente('Erro ao comunicar com o servidor. Tente novamente.');
    }
  };

  const iniciarEdicao = (cli) => {
    setErroCliente('');
    setEditandoClienteId(cli.id);
    setFormCliente({
      cpf: cli.cpf,
      nome: cli.nome,
      email: cli.email,
      telefone: cli.telefone,
      dataNasc: cli.dataNasc,
      sexo: cli.sexo,
      mktEmail: cli.mktEmail,
      mktWhats: cli.mktWhats,
      mktLigacao: cli.mktLigacao,
      preferencia: cli.preferencia
    });
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const cancelarEdicao = () => {
    setErroCliente('');
    setEditandoClienteId(null);
    setFormCliente(formClienteInicial);
  };


  // 
  const excluirCliente = async (id) => {
    const comprasDoCliente = vendas.filter(v => v.idCliente === id);
    const manifestacoesDoCliente = manifestacoes.filter(m => m.idCliente === id);

    if (comprasDoCliente.length > 0 || manifestacoesDoCliente.length > 0) {
      alert(
        `Não é possível excluir este cliente!\n` +
        `Motivo: Existem ${comprasDoCliente.length} venda(s) e ${manifestacoesDoCliente.length} ocorrência(s) de Ouvidoria associadas a ele.`
      );
      return;
    }

    if (window.confirm('Tem certeza de que deseja remover este cliente permanentemente?')) {
      try {
        await fetch(`http://localhost:3001/api/clientes/${id}`, {
          method: 'DELETE',
        });
        setClientes(clientes.filter(c => c.id !== id));
        if (editandoClienteId === id) {
          cancelarEdicao();
        }
        alert('Cliente excluído com sucesso!');
      } catch (err) {
        console.error('Erro ao excluir cliente:', err);
        alert('Erro ao excluir cliente no banco de dados.');
      }
    }
  };


  const clientesFiltrados = clientes.filter(c =>
    c.nome.toLowerCase().includes(buscaCliente.toLowerCase()) ||
    c.cpf.includes(buscaCliente)
  );

  // salvando vendas diretamente no banco de dados PostgreSQL
  const salvarVenda = async (e) => {
    e.preventDefault();
    if (!formVenda.idCliente) {
      alert('Selecione um cliente para vincular à venda!');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/vendas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formVenda,
          idCliente: Number(formVenda.idCliente)
        }),
      });
      const novaVenda = await response.json();
      setVendas([...vendas, novaVenda]);
      alert('Venda/Serviço registrado com sucesso!');
      setFormVenda({
        idCliente: '',
        produto: '',
        valor: '',
        formaPagamento: 'Pix',
        funcionario: '',
        data: ''
      });
    } catch (err) {
      console.error('Erro ao salvar venda:', err);
      alert('Erro ao registrar venda no banco de dados.');
    }
  };

  // =========================================================================
  // MANIFESTAÇÕES (SAC / OUVIDORIA) - CONECTADO AO POSTGRESQL
  // =========================================================================

  const handleVincularPedido = (idPedidoVal) => {
    let funcEnvolvido = formManifestacao.funcionarioEnvolvido;
    if (idPedidoVal) {
      const vendaSel = vendas.find(v => v.id === Number(idPedidoVal));
      if (vendaSel && vendaSel.funcionario) {
        funcEnvolvido = vendaSel.funcionario;
      }
    }
    setFormManifestacao({
      ...formManifestacao,
      idPedido: idPedidoVal,
      funcionarioEnvolvido: funcEnvolvido
    });
  };

  const salvarManifestacao = async (e) => {
    e.preventDefault();
    if (!formManifestacao.idCliente) {
      alert('Selecione um cliente para vincular à manifestação!');
      return;
    }
    if (!formManifestacao.funcionarioEnvolvido.trim()) {
      alert('Por favor, informe o nome do funcionário envolvido no caso!');
      return;
    }
    if (!formManifestacao.responsavel.trim()) {
      alert('Por favor, informe o gerente responsável pelo tratamento!');
      return;
    }
    if (!formManifestacao.termoLgpd) {
      alert('É obrigatório obter o consentimento LGPD para registrar a manifestação!');
      return;
    }

    const hoje = new Date().toISOString().split('T')[0];
    const dataPrazo = new Date();
    dataPrazo.setDate(dataPrazo.getDate() + 7);
    const prazoFormatado = dataPrazo.toISOString().split('T')[0];

    const payload = {
      ...formManifestacao,
      idCliente: Number(formManifestacao.idCliente),
      idPedido: formManifestacao.idPedido ? Number(formManifestacao.idPedido) : null,
      funcionarioEnvolvido: formManifestacao.funcionarioEnvolvido.trim(),
      responsavel: formManifestacao.responsavel.trim(),
      dataRegistro: hoje,
      status: 'Em Aberto', // <--- Novo estado inicial
      prazo: prazoFormatado
    };

    try {
      const response = await fetch('http://localhost:3001/api/manifestacoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const nova = await response.json();

      setManifestacoes([...manifestacoes, nova]);
      alert(`Manifestação registrada sob o Protocolo #${nova.id} com status 'Em Aberto'!`);
      setFormManifestacao({
        idCliente: '',
        tipo: 'Reclamação',
        meio: 'Telefone',
        texto: '',
        classificacao: 'Comportamental',
        idPedido: '',
        funcionarioEnvolvido: '',
        responsavel: '',
        autorizadoRetorno: false,
        termoLgpd: false
      });
    } catch (err) {
      console.error('Erro ao registrar manifestação:', err);
      alert('Erro ao comunicar com o servidor.');
    }
  };

  // Nova função para mudar o status de 'Em Aberto' para 'Em Tratamento'
  const iniciarTratamento = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/manifestacoes/${id}/iniciar`, {
        method: 'PATCH',
      });
      const atualizada = await response.json();
      setManifestacoes(manifestacoes.map(m => (m.id === id ? atualizada : m)));
      alert(`Protocolo #${id} agora está 'Em Tratamento'!`);
    } catch (err) {
      console.error('Erro ao iniciar tratamento:', err);
      alert('Erro ao atualizar status no banco de dados.');
    }
  };

  const abrirModalFinalizar = (m) => {
    setModalParecer({
      aberto: true,
      manifestacaoId: m.id,
      gerenteNome: m.responsavel || '',
      textoParecer: m.parecerGerente || ''
    });
  };

  const confirmarFinalizacaoComParecer = async (e) => {
    e.preventDefault();
    if (!modalParecer.textoParecer.trim()) {
      alert('O parecer técnico do gerente é obrigatório para finalizar a manifestação!');
      return;
    }
    if (modalParecer.textoParecer.length > 250) {
      alert('O parecer não pode exceder 250 caracteres!');
      return;
    }

    const hoje = new Date().toISOString().split('T')[0];

    try {
      const response = await fetch(`http://localhost:3001/api/manifestacoes/${modalParecer.manifestacaoId}/finalizar`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dataFinalizacao: hoje,
          responsavel: modalParecer.gerenteNome.trim(),
          parecerGerente: modalParecer.textoParecer.trim()
        }),
      });
      const finalizada = await response.json();

      setManifestacoes(manifestacoes.map(m =>
        m.id === modalParecer.manifestacaoId ? finalizada : m
      ));

      alert(`Manifestação #${modalParecer.manifestacaoId} finalizada com sucesso! Parecer registrado no relatório.`);
      setModalParecer({ aberto: false, manifestacaoId: null, gerenteNome: '', textoParecer: '' });
    } catch (err) {
      console.error('Erro ao finalizar manifestação:', err);
      alert('Erro ao salvar parecer no banco de dados.');
    }
  };


  // =========================================================================
  // MÓDULO MARKETING
  // =========================================================================

  const aniversariantesDoMes = clientes.filter(c => {
    if (!c.dataNasc) return false;
    const mesNasc = Number(c.dataNasc.split('-')[1]);
    const mesAtual = new Date().getMonth() + 1;
    return mesNasc === mesAtual && (c.mktEmail || c.mktWhats);
  });

  const clientesPorPreferencia = (tipo) =>
    clientes.filter(c => c.preferencia === tipo && (c.mktEmail || c.mktWhats || c.mktLigacao));


  return (
    <div className="app-container">
      <header>
        <h1>CLI-action</h1>
        <p>Controle Integrado de Atendimento, Ouvidoria e Marketing de Retenção</p>
      </header>

      <nav>
        <button className={telaAtiva === 'cadastros' ? 'active' : ''} onClick={() => setTelaAtiva('cadastros')}>
          📝 Entrada & Formulários
        </button>
        <button className={telaAtiva === 'marketing' ? 'active' : ''} onClick={() => setTelaAtiva('marketing')}>
          🎯 Automação Marketing
        </button>
        <button className={telaAtiva === 'relatorios' ? 'active' : ''} onClick={() => setTelaAtiva('relatorios')}>
          📊 Relatório de Auditoria & Ouvidoria
        </button>
      </nav>

      {telaAtiva === 'cadastros' && (
        <div className="modulo-cadastros-container">
          <div className="sub-nav-container">
            <button type="button" className={`sub-nav-btn ${subAbaCadastros === 'cliente' ? 'active' : ''}`}
              onClick={() => setSubAbaCadastros('cliente')}>👤 Cadastro & Gestão de Clientes</button>
            <button type="button" className={`sub-nav-btn ${subAbaCadastros === 'venda' ? 'active' : ''}`}
              onClick={() => setSubAbaCadastros('venda')}>🛒 Formulário Serviço / Venda Efetivada</button>
            <button type="button" className={`sub-nav-btn ${subAbaCadastros === 'manifestacao' ? 'active' : ''}`}
              onClick={() => setSubAbaCadastros('manifestacao')}>📢 Formulário Único de Manifestação (SAC / Ouvidoria)</button>
          </div>

          <CadastroCliente {...{
            subAbaCadastros, editandoClienteId, cancelarEdicao, erroCliente, salvarCliente,
            formCliente, handleCpfChange, handleTelefoneChange, setFormCliente, clientes,
            buscaCliente, setBuscaCliente, clientesFiltrados, vendas, manifestacoes,
            iniciarEdicao, excluirCliente
          }} />
          <CadastroVenda {...{ subAbaCadastros, salvarVenda, formVenda, setFormVenda, clientes, vendas }} />
          <CadastroManifestacao {...{
            subAbaCadastros, salvarManifestacao, formManifestacao, setFormManifestacao,
            clientes, vendas, handleVincularPedido
          }} />
        </div>
      )}

      {telaAtiva === 'marketing' && (
        <Marketing {...{ aniversariantesDoMes, clientesPorPreferencia }} />
      )}

      {telaAtiva === 'relatorios' && (
        <Relatorios {...{ manifestacoes, clientes, iniciarTratamento, abrirModalFinalizar }} />
      )}

      <ModalParecer {...{ modalParecer, setModalParecer, confirmarFinalizacaoComParecer }} />
    </div>
  );
}
