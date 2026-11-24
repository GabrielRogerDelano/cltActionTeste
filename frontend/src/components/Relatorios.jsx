export default function Relatorios(props) {
  const { manifestacoes, clientes, iniciarTratamento, abrirModalFinalizar } = props;

  return (
    <>

      <div className="view-card">
        <div className="report-header">
          <div>
            <h2>📊 Relatório de Auditoria e Ouvidoria</h2>
            <p className="subtitle">
              Acompanhamento de casos, funcionários envolvidos e <strong>Parecer Conclusivo do Gerente (Máx. 250 caracteres)</strong>
            </p>
          </div>
          <div className="metrics-summary">
            <span className="metric-pill">Total: {manifestacoes.length}</span>
            <span className="metric-pill open">
              Em Aberto: {manifestacoes.filter(m => m.status === 'Em Aberto').length}
            </span>
            <span className="metric-pill warn">
              Em Tratamento: {manifestacoes.filter(m => m.status === 'Em Tratamento').length}
            </span>
            <span className="metric-pill ok">
              Finalizadas: {manifestacoes.filter(m => m.status === 'Finalizado').length}
            </span>
          </div>
        </div>

        <div className="table-responsive">
          <table className="data-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Cliente</th>
                <th>Tipo / Canal</th>
                <th>Classificação</th>
                <th>Relato da Manifestação</th>
                <th>Equipe Envolvida</th>
                <th>Datas & Prazo</th>
                <th>Status</th>
                <th>Parecer do Gerente / Ação</th>
              </tr>
            </thead>
            <tbody>
              {manifestacoes.map(m => {
                const cli = clientes.find(c => c.id === m.idCliente) || {};

                return (
                  <tr key={m.id} className={m.status === 'Finalizado' ? 'row-finalizado' : ''}>
                    <td><strong>#{m.id}</strong></td>
                    <td>
                      <strong>{cli.nome || 'Cliente Desconhecido'}</strong>
                      <div className="sub-text">{cli.email}</div>
                      <div className="sub-text">{cli.telefone}</div>
                    </td>
                    <td>
                      <span className={`badge-type ${m.tipo.toLowerCase()}`}>{m.tipo}</span>
                      <div className="sub-text">Via {m.meio}</div>
                    </td>
                    <td>
                      <span className="badge-class">{m.classificacao}</span>
                      {m.idPedido && <div className="sub-text">Pedido #{m.idPedido}</div>}
                    </td>
                    <td className="texto-manifestacao">"{m.texto}"</td>
                    <td>
                      <div><strong>👤 Funcionário:</strong> {m.funcionarioEnvolvido || 'Não informado'}</div>
                      <div className="sub-text"><strong>👔 Gerente:</strong> {m.responsavel || 'Não definido'}</div>
                    </td>
                    <td>
                      <div className="sub-text"><strong>Criado:</strong> {m.dataRegistro}</div>
                      <div className="sub-text"><strong>Prazo:</strong> {m.prazo}</div>
                      <div className="sub-text"><strong>Conclusão:</strong> {m.dataFinalizacao}</div>
                    </td>
                    <td>
                      {/* Gera automaticamente: status-pill em-aberto | em-tratamento | finalizado */}
                      <span className={`status-pill ${m.status.toLowerCase().replace(/\s+/g, '-')}`}>
                        {m.status}
                      </span>
                    </td>
                    <td>
                      {m.status === 'Em Aberto' && (
                        <div className="action-buttons">
                          <button
                            type="button"
                            className="btn-table btn-iniciar"
                            title="Iniciar análise desta ocorrência"
                            onClick={() => iniciarTratamento(m.id)}
                          >
                            ▶️ Iniciar Tratamento
                          </button>
                        </div>
                      )}

                      {m.status === 'Em Tratamento' && (
                        <div className="action-buttons">
                          <button
                            type="button"
                            className="btn-table btn-success"
                            title="Emitir Parecer e Finalizar Caso"
                            onClick={() => abrirModalFinalizar(m)}
                          >
                            ✍️ Dar Parecer & Finalizar
                          </button>
                        </div>
                      )}

                      {m.status === 'Finalizado' && (
                        <div className="parecer-conclusivo-box">
                          <span className="parecer-header">✅ Parecer Registrado ({m.responsavel}):</span>
                          <p className="parecer-texto">"{m.parecerGerente}"</p>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

    </>
  );
}
