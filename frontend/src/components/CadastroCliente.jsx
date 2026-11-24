export default function CadastroCliente(props) {
  const { subAbaCadastros, editandoClienteId, cancelarEdicao, erroCliente, salvarCliente, formCliente, handleCpfChange, handleTelefoneChange, setFormCliente, clientes, buscaCliente, setBuscaCliente, clientesFiltrados, vendas, manifestacoes, iniciarEdicao, excluirCliente } = props;

  return (
    <>
          {subAbaCadastros === 'cliente' && (
            <div className="sub-aba-content">
              {/* Formulário de Cadastro / Edição do Cliente */}
              <div className="view-card full-width">
                <div className="card-header-flex">
                  <h2>{editandoClienteId ? `✏️ Editar Cliente (#${editandoClienteId})` : 'Cadastro do Cliente'}</h2>
                  {editandoClienteId && (
                    <button type="button" className="btn-cancel" onClick={cancelarEdicao}>
                      Cancelar Edição
                    </button>
                  )}
                </div>

                {/* Caixa de Erro Explicativa */}
                {erroCliente && (
                  <div style={{
                    backgroundColor: '#fee2e2',
                    color: '#991b1b',
                    padding: '12px 16px',
                    borderRadius: '6px',
                    border: '1px solid #f87171',
                    marginBottom: '16px',
                    fontWeight: '500'
                  }}>
                    ⚠️ <strong>Atenção:</strong> {erroCliente}
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
                      max={new Date().toISOString().split('T')[0]}
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

                  <div className="full-width action-buttons-form">
                    <button type="submit" className={`btn-submit ${editandoClienteId ? 'btn-update' : ''}`}>
                      {editandoClienteId ? 'Salvar Alterações do Cliente' : 'Salvar Cadastro Cliente'}
                    </button>
                    {editandoClienteId && (
                      <button type="button" className="btn-cancel-large" onClick={cancelarEdicao}>
                        Cancelar
                      </button>
                    )}
                  </div>
                </form>
                {/* Gerenciamento de Clientes Cadastrados (CRUD Read / Update / Delete) */}
                <div className="view-card full-width">
                  <div className="report-header">
                    <div>
                      <h2>👥 Gerenciamento de Clientes Cadastrados ({clientes.length})</h2>
                      <p className="subtitle">Visualize, edite ou exclua clientes respeitando as regras de integridade</p>
                    </div>
                    <div className="search-box">
                      <input
                        type="text"
                        placeholder="🔎 Buscar por Nome ou CPF..."
                        value={buscaCliente}
                        onChange={e => setBuscaCliente(e.target.value)}
                        className="input-search"
                      />
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="data-table">
                      <thead>
                        <tr>
                          <th>ID</th>
                          <th>Nome / CPF</th>
                          <th>Contatos</th>
                          <th>Nasc. / Sexo</th>
                          <th>Foco MKT</th>
                          <th>Canais Autorizados</th>
                          <th>Histórico Vinculado</th>
                          <th>Ações</th>
                        </tr>
                      </thead>
                      <tbody>
                        {clientesFiltrados.length > 0 ? (
                          clientesFiltrados.map(cli => {
                            const totalCompras = vendas.filter(v => v.idCliente === cli.id).length;
                            const totalManifestacoes = manifestacoes.filter(m => m.idCliente === cli.id).length;

                            return (
                              <tr key={cli.id} className={editandoClienteId === cli.id ? 'row-editing' : ''}>
                                <td><strong>#{cli.id}</strong></td>
                                <td>
                                  <strong>{cli.nome}</strong>
                                  <div className="text-muted">CPF: {cli.cpf}</div>
                                </td>
                                <td>
                                  <div>📧 {cli.email}</div>
                                  <div className="text-muted">📱 {cli.telefone}</div>
                                </td>
                                <td>
                                  <div>{cli.dataNasc}</div>
                                  <div className="text-muted">{cli.sexo}</div>
                                </td>
                                <td>
                                  <span className="badge-mkt">{cli.preferencia}</span>
                                </td>
                                <td>
                                  <div className="canais-tags">
                                    {cli.mktEmail && <span className="tag-canal">E-mail</span>}
                                    {cli.mktWhats && <span className="tag-canal">WhatsApp</span>}
                                    {cli.mktLigacao && <span className="tag-canal">Ligação</span>}
                                    {!cli.mktEmail && !cli.mktWhats && !cli.mktLigacao && (
                                      <span className="text-muted">Nenhum</span>
                                    )}
                                  </div>
                                </td>
                                <td>
                                  <div>🛒 {totalCompras} compra(s)</div>
                                  <div className="text-muted">📢 {totalManifestacoes} ocorrência(s)</div>
                                </td>
                                <td>
                                  <div className="action-buttons">
                                    <button
                                      type="button"
                                      className="btn-edit"
                                      onClick={() => iniciarEdicao(cli)}
                                      title="Editar Cliente"
                                    >
                                      ✏️ Editar
                                    </button>
                                    <button
                                      type="button"
                                      className="btn-delete"
                                      onClick={() => excluirCliente(cli.id)}
                                      title="Excluir Cliente"
                                    >
                                      🗑️ Excluir
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <tr>
                            <td colSpan="8" style={{ textAlign: 'center', padding: '20px' }}>
                              Nenhum cliente encontrado.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
    </>
  );
}
