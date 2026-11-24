export default function CadastroManifestacao(props) {
  const { subAbaCadastros, salvarManifestacao, formManifestacao, setFormManifestacao, clientes, vendas, handleVincularPedido } = props;

  return (
    <>
      {subAbaCadastros === 'manifestacao' && (
        <div className="sub-aba-content">
          <div className="view-card full-width">
            <h2>📢 Formulário Único de Manifestação (SAC / Ouvidoria)</h2>
            <p className="subtitle">
              Abertura de ocorrência com identificação explícita do <strong>Funcionário Envolvido</strong> e do <strong>Gerente Responsável</strong> pelo caso
            </p>

            <form onSubmit={salvarManifestacao} className="form-grid">
              <div className="form-group">
                <label>Cliente Solicitante</label>
                <select
                  required
                  value={formManifestacao.idCliente}
                  onChange={e => setFormManifestacao({ ...formManifestacao, idCliente: e.target.value, idPedido: '' })}
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
                <label>Vincular Venda / Pedido (Opcional)</label>
                <select
                  value={formManifestacao.idPedido}
                  onChange={e => handleVincularPedido(e.target.value)}
                >
                  <option value="">-- Nenhum pedido associado --</option>
                  {vendas
                    .filter(v => v.idCliente === Number(formManifestacao.idCliente))
                    .map(v => (
                      <option key={v.id} value={v.id}>
                        Venda #{v.id} - {v.produto} (Vendedor: {v.funcionario})
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label>Tipo de Manifestação</label>
                <select
                  value={formManifestacao.tipo}
                  onChange={e => setFormManifestacao({ ...formManifestacao, tipo: e.target.value })}
                >
                  <option value="Reclamação">Reclamação</option>
                  <option value="Elogio">Elogio</option>
                  <option value="Sugestão">Sugestão</option>
                </select>
              </div>

              <div className="form-group">
                <label>Meio / Canal de Entrada</label>
                <select
                  value={formManifestacao.meio}
                  onChange={e => setFormManifestacao({ ...formManifestacao, meio: e.target.value })}
                >
                  <option value="Telefone">Telefone</option>
                  <option value="E-mail">E-mail</option>
                  <option value="Redes Sociais">Redes Sociais</option>
                  <option value="WhatsApp">WhatsApp</option>
                </select>
              </div>

              <div className="form-group full-width">
                <label>Classificação do Incidente</label>
                <select
                  value={formManifestacao.classificacao}
                  onChange={e => setFormManifestacao({ ...formManifestacao, classificacao: e.target.value })}
                >
                  <option value="Comportamental">Comportamental (Conduta de Atendimento/Venda)</option>
                  <option value="Sistêmico">Sistêmico (Erros em Sistemas, Plataforma ou Pagamento)</option>
                  <option value="Estrutural">Estrutural (Instalações, Prazos de Entrega e Logística)</option>
                  <option value="Produto">Produto (Defeitos, Qualidade e Garantia)</option>
                </select>
              </div>

              {/* CAMPOS REQUISITADOS: FUNCIONÁRIO ENVOLVIDO E GERENTE TRATADOR */}
              <div className="form-group">
                <label>👤 Funcionário Envolvido no Caso</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Carlos Vendedor, Felipe Atendente..."
                  value={formManifestacao.funcionarioEnvolvido}
                  onChange={e => setFormManifestacao({ ...formManifestacao, funcionarioEnvolvido: e.target.value })}
                />
                <small className="field-hint">Preenchido automaticamente ao vincular uma venda ou editável manualmente.</small>
              </div>

              <div className="form-group">
                <label>👔 Gerente Responsável pelo Tratamento</label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Gerente Marcos, Gerente Patrícia..."
                  value={formManifestacao.responsavel}
                  onChange={e => setFormManifestacao({ ...formManifestacao, responsavel: e.target.value })}
                />
                <small className="field-hint">Gestor encarregado de acompanhar e dar o parecer final.</small>
              </div>

              <div className="form-group full-width">
                <label>Texto da Manifestação / Relato do Cliente</label>
                <textarea
                  rows="3"
                  required
                  placeholder="Descreva com detalhes o motivo da manifestação..."
                  value={formManifestacao.texto}
                  onChange={e => setFormManifestacao({ ...formManifestacao, texto: e.target.value })}
                />
              </div>

              <div className="lgpd-section full-width">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formManifestacao.autorizadoRetorno}
                    onChange={e => setFormManifestacao({ ...formManifestacao, autorizadoRetorno: e.target.checked })}
                  />
                  Autorizar retorno direto ao cliente (E-mail, Telefone ou WhatsApp)
                </label>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={formManifestacao.termoLgpd}
                    onChange={e => setFormManifestacao({ ...formManifestacao, termoLgpd: e.target.checked })}
                  />
                  <strong>LGPD:</strong> Consentimento do cliente para uso exclusivo dos dados para tratar e auditar esta manifestação.
                </label>
              </div>

              <button type="submit" className="btn-submit full-width">
                Registrar Ocorrência (Status: Em Tratamento - Prazo Padrão: 5 Dias Úteis)
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
