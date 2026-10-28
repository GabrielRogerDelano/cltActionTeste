import { useState } from 'react';

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

  const salvarCliente = (e) => {
    e.preventDefault();
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
    <div className="view-card">
      <h2>Cadastro do Cliente</h2>
      <form onSubmit={salvarCliente} className="form-grid">
        <div className="form-group">
          <label>CPF (Chave Única)</label>
          <input
            type="text"
            required
            placeholder="000.000.000-00"
            value={formCliente.cpf}
            onChange={e => setFormCliente({ ...formCliente, cpf: e.target.value })}
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
            required
            placeholder="(00) 00000-0000"
            value={formCliente.telefone}
            onChange={e => setFormCliente({ ...formCliente, telefone: e.target.value })}
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