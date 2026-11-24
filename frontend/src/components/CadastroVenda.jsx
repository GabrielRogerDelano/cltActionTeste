export default function CadastroVenda(props) {
  const { subAbaCadastros, salvarVenda, formVenda, setFormVenda, clientes, vendas } = props;

  return (
    <>
          {subAbaCadastros === 'venda' && (
            <div className="sub-aba-content">
              <div className="view-card full-width">
                <h2>🛒 Registro de Venda / Serviço Efetivado</h2>
                <form onSubmit={salvarVenda} className="form-grid">
                  <div className="form-group">
                    <label>Cliente Comprador</label>
                    <select
                      required
                      value={formVenda.idCliente}
                      onChange={e => setFormVenda({ ...formVenda, idCliente: e.target.value })}
                    >
                      <option value="">-- Selecione o Cliente --</option>
                      {clientes.map(c => (
                        <option key={c.id} value={c.id}>
                          ID #{c.id} - {c.nome} (CPF: {c.cpf})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Produto ou Serviço Adquirido</label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Consultoria, Notebook, Plano Mensal..."
                      value={formVenda.produto}
                      onChange={e => setFormVenda({ ...formVenda, produto: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Valor da Transação (R$)</label>
                    <input
                      type="number"
                      step="0.01"
                      min="0.01"
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
                      <option value="Cartão de Crédito">Cartão de Crédito</option>
                      <option value="Cartão de Débito">Cartão de Débito</option>
                      <option value="Dinheiro">Dinheiro</option>
                      <option value="Boleto">Boleto</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Funcionário / Vendedor Responsável</label>
                    <input
                      type="text"
                      required
                      placeholder="Nome do vendedor"
                      value={formVenda.funcionario}
                      onChange={e => setFormVenda({ ...formVenda, funcionario: e.target.value })}
                    />
                  </div>

                  <div className="form-group">
                    <label>Data da Venda</label>
                    <input
                      type="date"
                      required
                      value={formVenda.data}
                      onChange={e => setFormVenda({ ...formVenda, data: e.target.value })}
                    />
                  </div>

                  <button type="submit" className="btn-submit full-width">
                    Registrar Venda / Serviço
                  </button>
                </form>
              </div>

              {/* Tabela de Vendas Registradas */}
              <div className="view-card full-width">
                <h2>📑 Histórico de Transações Comerciais Registradas ({vendas.length})</h2>
                <div className="table-responsive">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>ID Venda</th>
                        <th>Cliente</th>
                        <th>Item / Serviço</th>
                        <th>Valor</th>
                        <th>Pagamento</th>
                        <th>Funcionário</th>
                        <th>Data</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendas.map(v => {
                        const cli = clientes.find(c => c.id === v.idCliente);
                        return (
                          <tr key={v.id}>
                            <td><strong>#{v.id}</strong></td>
                            <td>{cli ? cli.nome : `Cliente #${v.idCliente}`}</td>
                            <td>{v.produto}</td>
                            <td><strong>R$ {parseFloat(v.valor).toFixed(2)}</strong></td>
                            <td>{v.formaPagamento}</td>
                            <td>{v.funcionario}</td>
                            <td>{v.data}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* SUB-ABA 3: FORMULÁRIO ÚNICO DE MANIFESTAÇÃO (SAC / OUVIDORIA) */}
    </>
  );
}
