export default function Relatorios({ manifestacoes, setManifestacoes, clientes, vendas }) {
  const gerenciarStatus = (id, novoStatus) => {
    const hoje = novoStatus === 'Finalizado' ? new Date().toISOString().split('T')[0] : '-';
    setManifestacoes(manifestacoes.map(m =>
      m.id === id ? { ...m, status: novoStatus, dataFinalizacao: hoje } : m
    ));
  };

  return (
    <div className="view-card">
      <div className="report-header">
        <div>
          <h2>📊 Relatório Sintetizado de Ouvidoria</h2>
          <p className="subtitle">Visão consolidada com regra de atribuição de responsabilidade por classificação</p>
        </div>
        <div className="metrics-summary">
          <span className="metric-pill">Total: {manifestacoes.length}</span>
          <span className="metric-pill warn">Abertas: {manifestacoes.filter(m => m.status === 'Aberto').length}</span>
          <span className="metric-pill ok">Finalizadas: {manifestacoes.filter(m => m.status === 'Finalizado').length}</span>
        </div>
      </div>

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente (Contato)</th>
              <th>Tipo / Canal</th>
              <th>Classificação</th>
              <th>Texto da Manifestação</th>
              <th>Funcionário Envolvido</th>
              <th>Abertura / Prazo / Fim</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {manifestacoes.map(m => {
              const cli = clientes.find(c => c.id === m.idCliente) || {};
              const vda = vendas.find(v => v.id === m.idPedido) || {};

              // Regra de Negócio:
              // Se for Comportamental, exibe o funcionário vendedor/executor da venda.
              // Se for outro tipo, exibe o Gerente responsável pelo tratamento do caso.
              const funcionarioExibido =
                m.classificacao === 'Comportamental'
                  ? `${vda.funcionario || 'Não Vinculado'} (Vendedor)`
                  : `${m.responsavel || 'Não Definido'} (Gerente)`;

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
                  </td>
                  <td className="texto-manifestacao">"{m.texto}"</td>
                  <td>
                    <span className="tag-responsavel">{funcionarioExibido}</span>
                  </td>
                  <td>
                    <div className="sub-text"><strong>Criado:</strong> {m.dataRegistro}</div>
                    <div className="sub-text"><strong>Prazo:</strong> {m.prazo}</div>
                    <div className="sub-text"><strong>Fim:</strong> {m.dataFinalizacao}</div>
                  </td>
                  <td>
                    <span className={`status-pill ${m.status.toLowerCase().replace(' ', '-')}`}>
                      {m.status}
                    </span>
                  </td>
                  <td>
                    {m.status !== 'Finalizado' ? (
                      <div className="action-buttons">
                        {m.status === 'Aberto' && (
                          <button
                            className="btn-table btn-warn"
                            onClick={() => gerenciarStatus(m.id, 'Em Análise')}
                          >
                            Em Análise
                          </button>
                        )}
                        <button
                          className="btn-table btn-success"
                          onClick={() => gerenciarStatus(m.id, 'Finalizado')}
                        >
                          Finalizar
                        </button>
                      </div>
                    ) : (
                      <span className="text-muted">Concluído</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}