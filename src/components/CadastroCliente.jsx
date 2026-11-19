import { useState } from 'react';

// Função auxiliar para validar o cálculo matemático oficial do CPF
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

export default function CadastroCliente({ clientes, setClientes, vendas }) {
  const [formCliente, setFormCliente] = useState({
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
  });

  // Novo estado para armazenar mensagens de erro explicativas
  const [erroForm, setErroForm] = useState('');

  // Máscara que remove letras e formata o CPF (000.000.000-00)
  const handleCpfChange = (e) => {
    let valor = e.target.value.replace(/\D/g, ''); // Remove tudo que não é número
    if (valor.length > 11) valor = valor.slice(0, 11); // Limita a 11 dígitos

    // Aplica a pontuação automática
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d)/, '$1.$2');
    valor = valor.replace(/(\d{3})(\d{1,2})$/, '$1-$2');

    setFormCliente({ ...formCliente, cpf: valor });
    if (erroForm) setErroForm(''); // Limpa o erro assim que o usuário corrige
  };

  // Máscara que remove letras e formata o Telefone ((00) 00000-0000)
  const handleTelefoneChange = (e) => {
    let valor = e.target.value.replace(/\D/g, '');
    if (valor.length > 11) valor = valor.slice(0, 11);

    valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
    valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');

    setFormCliente({ ...formCliente, telefone: valor });
    if (erroForm) setErroForm('');
  };

  const salvarCliente = (e) => {
    e.preventDefault();
    setErroForm('');

    // 1. Valida se o CPF tem os 11 dígitos e é válido
    if (!validarCPF(formCliente.cpf)) {
      setErroForm('CPF inválido. Digite exatamente 11 números válidos (ex: 123.456.789-00).');
      return;
    }

    // 2. Valida se o CPF já existe na lista (Chave Única)
    const cpfJaCadastrado = clientes.some(c => c.cpf === formCliente.cpf);
    if (cpfJaCadastrado) {
      setErroForm('Este CPF já está cadastrado no sistema. Utilize outro CPF.');
      return;
    }

    // 3. Valida se o telefone tem ao menos 10 dígitos (DDD + número)
    const telLimpo = formCliente.telefone.replace(/\D/g, '');
    if (telLimpo.length < 10) {
      setErroForm('Telefone inválido. Informe o DDD e o número completo com 10 ou 11 dígitos.');
      return;
    }

    // 4. Valida se o nome tem pelo menos nome e sobrenome
    if (formCliente.nome.trim().split(' ').length < 2) {
      setErroForm('Por favor, informe o nome completo do cliente (nome e sobrenome).');
      return;
    }

    const novo = {
      ...formCliente,
      id: clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1
    };

    setClientes([...clientes, novo]);
    alert('Cliente cadastrado com sucesso!');

    setFormCliente({
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
    });
  };

  return (
    <div className="view-card full-width">
      <h2>Cadastro do Cliente</h2>

      {/* Caixa de Alerta Explicativo */}
      {erroForm && (
        <div
          style={{
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            padding: '12px 16px',
            borderRadius: '6px',
            border: '1px solid #f87171',
            marginBottom: '16px',
            fontWeight: '500'
          }}
        >
          ⚠️ <strong>Atenção:</strong> {erroForm}
        </div>
      )}

      <form onSubmit={salvarCliente} className="form-grid">
        <div className="form-group">
          <label>CPF (Chave Única)</label>
          <input
            type="text"
            inputMode="numeric"
            required
            maxLength={14}
            placeholder="000.000.000-00"
            value={formCliente.cpf}
            onChange={handleCpfChange}
          />
        </div>

        <div className="form-group">
          <label>Nome Completo</label>
          <input
            type="text"
            required
            placeholder="Nome do cliente"
            value={formCliente.nome}
            onChange={e => setFormCliente({ ...formCliente, nome: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>E-mail</label>
          <input
            type="email"
            required
            placeholder="cliente@email.com"
            value={formCliente.email}
            onChange={e => setFormCliente({ ...formCliente, email: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Telefone / WhatsApp</label>
          <input
            type="tel"
            inputMode="numeric"
            required
            maxLength={15}
            placeholder="(00) 00000-0000"
            value={formCliente.telefone}
            onChange={handleTelefoneChange}
          />
        </div>

        <div className="form-group">
          <label>Data de Nascimento</label>
          <input
            type="date"
            required
            value={formCliente.dataNasc}
            onChange={e => setFormCliente({ ...formCliente, dataNasc: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Sexo</label>
          <select
            value={formCliente.sexo}
            onChange={e => setFormCliente({ ...formCliente, sexo: e.target.value })}
          >
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
            <option value="Não Informar">Não Informar</option>
          </select>
        </div>

        <div className="form-group full-width">
          <label>Preferência de Compra (Foco Marketing)</label>
          <select
            value={formCliente.preferencia}
            onChange={e => setFormCliente({ ...formCliente, preferencia: e.target.value })}
          >
            <option value="Produtos">Produtos</option>
            <option value="Serviços">Serviços</option>
          </select>
        </div>

        <div className="marketing-section full-width">
          <label className="section-title">Autorizações de Comunicação (LGPD / MKT):</label>
          <div className="checkbox-row">
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formCliente.mktEmail}
                onChange={e => setFormCliente({ ...formCliente, mktEmail: e.target.checked })}
              />
              E-mail
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formCliente.mktWhats}
                onChange={e => setFormCliente({ ...formCliente, mktWhats: e.target.checked })}
              />
              WhatsApp
            </label>
            <label className="checkbox-label">
              <input
                type="checkbox"
                checked={formCliente.mktLigacao}
                onChange={e => setFormCliente({ ...formCliente, mktLigacao: e.target.checked })}
              />
              Ligações
            </label>
          </div>
        </div>

        <button type="submit" className="btn-submit full-width">Salvar Cadastro Cliente</button>
      </form>

      {/* Painel Interno de Histórico */}
      <div className="historico-container">
        <strong>🔎 Acesso Interno a Histórico por Cliente:</strong>
        {clientes.map(cli => {
          const compras = vendas.filter(v => v.idCliente === cli.id);
          return (
            <div key={cli.id} className="historico-item">
              <span>👤 <strong>{cli.nome}</strong> (ID #{cli.id}):</span>
              {compras.length > 0 ? (
                <ul>
                  {compras.map(v => (
                    <li key={v.id}>
                      Venda #{v.id}: {v.produto} — <strong>R$ {parseFloat(v.valor).toFixed(2)}</strong> ({v.formaPagamento})
                    </li>
                  ))}
                </ul>
              ) : (
                <span className="text-muted"> Nenhuma compra registrada até o momento.</span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
