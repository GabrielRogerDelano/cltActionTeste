export default function Marketing({ clientes }) {
  const aniversariantesDoMes = clientes.filter(c => {
    if (!c.dataNasc) return false;
    const mesNasc = Number(c.dataNasc.split('-')[1]);
    const mesAtual = new Date().getMonth() + 1;
    return mesNasc === mesAtual && (c.mktEmail || c.mktWhats);
  });

  const clientesPorPreferencia = (tipo) =>
    clientes.filter(
      c => c.preferencia === tipo && (c.mktEmail || c.mktWhats || c.mktLigacao)
    );

  return (
    <div className="view-card">
      <h2>🎯 Módulo CLI-action Marketing (Retenção)</h2>
      <p className="subtitle">Simulador de gatilhos automáticos com base no perfil e consentimento LGPD dos clientes:</p>

      <div className="marketing-cards-grid">
        {/* Gatilho 1: Aniversários */}
        <div className="marketing-box green">
          <div className="marketing-box-header">
            <h3>🎂 Aniversários do Mês</h3>
            <span className="badge">{aniversariantesDoMes.length} elegíveis</span>
          </div>
          <p>Dispara saudações personalizadas e cupons para clientes aniversariantes que autorizaram contato.</p>

          <div className="audience-list">
            <strong>Público-alvo identificado:</strong>
            {aniversariantesDoMes.length > 0 ? (
              <ul>
                {aniversariantesDoMes.map(c => (
                  <li key={c.id}>
                    {c.nome} ({c.dataNasc}) — Canais: {[c.mktEmail && 'E-mail', c.mktWhats && 'WhatsApp'].filter(Boolean).join(', ')}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-muted">Nenhum aniversariante elegível com autorização neste mês.</p>
            )}
          </div>

          <button
            className="btn-action btn-green"
            onClick={() => alert(`🎉 Campanha de Aniversário disparada com sucesso para ${aniversariantesDoMes.length} clientes!`)}
          >
            Disparar Parabenização
          </button>
        </div>

        {/* Gatilho 2: Ofertas Direcionadas */}
        <div className="marketing-box blue">
          <div className="marketing-box-header">
            <h3>🚀 Ofertas Direcionadas por Segmento</h3>
            <span className="badge">
              {clientesPorPreferencia('Produtos').length} Produtos | {clientesPorPreferencia('Serviços').length} Serviços
            </span>
          </div>
          <p>Filtra a base de dados por interesse de compra e dispara campanhas sob medida para canais autorizados.</p>

          <div className="audience-list">
            <strong>Segmentação atual:</strong>
            <p>📦 <strong>Foco em Produtos:</strong> {clientesPorPreferencia('Produtos').map(c => c.nome).join(', ') || 'Nenhum'}</p>
            <p>🛠️ <strong>Foco em Serviços:</strong> {clientesPorPreferencia('Serviços').map(c => c.nome).join(', ') || 'Nenhum'}</p>
          </div>

          <div className="button-group">
            <button
              className="btn-action btn-blue"
              onClick={() => alert(`Campanha de PRODUTOS enviada para ${clientesPorPreferencia('Produtos').length} clientes!`)}
            >
              Disparar Campanha de Produtos
            </button>
            <button
              className="btn-action btn-indigo"
              onClick={() => alert(`Campanha de SERVIÇOS enviada para ${clientesPorPreferencia('Serviços').length} clientes!`)}
            >
              Disparar Campanha de Serviços
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}