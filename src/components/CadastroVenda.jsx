import { useState } from 'react';

export default function CadastroVenda({ clientes, vendas, setVendas }) {
  const [formVenda, setFormVenda] = useState({
    idCliente: '',
    produto: '',
    valor: '',
    formaPagamento: 'Pix',
    funcionario: '',
    data: ''
  });

  const salvarVenda = (e) => {
    e.preventDefault();
    if (!formVenda.idCliente) {
      alert('Selecione um cliente para vincular à venda!');
      return;
    }
    const nova = {
      ...formVenda,
      id: vendas.length > 0 ? Math.max(...vendas.map(v => v.id)) + 1 : 101,
      idCliente: Number(formVenda.idCliente)
    };
    setVendas([...vendas, nova]);
    alert('Venda/Serviço registrado com sucesso!');
    setFormVenda({
      idCliente: '',
      produto: '',
      valor: '',
      formaPagamento: 'Pix',
      funcionario: '',
      data: ''
    });
  };

  return (
    <div className="view-card">
      <h2>Formulário Serviço / Venda</h2>
      <form onSubmit={salvarVenda} className="form-grid">
        <div className="form-group full-width">
          <label>Vincular Cliente</label>
          <select
            required
            value={formVenda.idCliente}
            onChange={e => setFormVenda({ ...formVenda, idCliente: e.target.value })}
          >
            <option value="">-- Escolha o Cliente --</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>
                {c.nome} (CPF: {c.cpf})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group full-width">
          <label>Descrição do Produto / Serviço</label>
          <input
            type="text"
            required
            placeholder="Ex: Consultoria, Smartphone, Manutenção..."
            value={formVenda.produto}
            onChange={e => setFormVenda({ ...formVenda, produto: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Valor (R$)</label>
          <input
            type="number"
            step="0.01"
            required
            placeholder="0.00"
            value={formVenda.valor}
            onChange={e => setFormVenda({ ...formVenda, valor: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Forma de Pagamento</label>
          <select
            value={formVenda.formaPagamento}
            onChange={e => setFormVenda({ ...formVenda, formaPagamento: e.target.value })}
          >
            <option value="Pix">Pix</option>
            <option value="Cartão">Cartão</option>
            <option value="Boleto">Boleto</option>
            <option value="Dinheiro">Dinheiro</option>
          </select>
        </div>

        <div className="form-group">
          <label>Funcionário Executor</label>
          <input
            type="text"
            required
            placeholder="Nome do vendedor/técnico"
            value={formVenda.funcionario}
            onChange={e => setFormVenda({ ...formVenda, funcionario: e.target.value })}
          />
        </div>

        <div className="form-group">
          <label>Data da Transação</label>
          <input
            type="date"
            required
            value={formVenda.data}
            onChange={e => setFormVenda({ ...formVenda, data: e.target.value })}
          />
        </div>

        <button type="submit" className="btn-submit full-width">Registrar Serviço / Venda</button>
      </form>
    </div>
  );
}