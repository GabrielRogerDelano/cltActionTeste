import { useState } from 'react';

export default function Manifestacao({ clientes, vendas, manifestacoes, setManifestacoes }) {
  const [formManifestacao, setFormManifestacao] = useState({
    idCliente: '',
    tipo: 'Reclamação',
    meio: 'Telefone',
    texto: '',
    classificacao: 'Comportamental',
    idPedido: '',
    responsavel: '',
    autorizadoRetorno: false,
    termoLgpd: false
  });

  const salvarManifestacao = (e) => {
    e.preventDefault();
    if (!formManifestacao.idCliente) {
      alert('Selecione um cliente para vincular à manifestação!');
      return;
    }
    if (!formManifestacao.termoLgpd) {
      alert('É obrigatório obter o consentimento LGPD para registrar a manifestação!');
      return;
    }

    const hoje = new Date().toISOString().split('T')[0];
    const dataPrazo = new Date();
    dataPrazo.setDate(dataPrazo.getDate() + 7); // Simulação de 5 dias úteis (7 dias corridos)
    const prazoFormatado = dataPrazo.toISOString().split('T')[0];

    const nova = {
      ...formManifestacao,
      id: manifestacoes.length > 0 ? Math.max(...manifestacoes.map(m => m.id)) + 1 : 501,
      idCliente: Number(formManifestacao.idCliente),
      idPedido: formManifestacao.idPedido ? Number(formManifestacao.idPedido) : null,
      dataRegistro: hoje,
      dataFinalizacao: '-',
      status: 'Aberto',
      prazo: prazoFormatado
    };

    setManifestacoes([...manifestacoes, nova]);
    alert(`Manifestação registrada sob o Protocolo #${nova.id}`);
    setFormManifestacao({
      idCliente: '',
      tipo: 'Reclamação',
      meio: 'Telefone',
      texto: '',
      classificacao: 'Comportamental',
      idPedido: '',
      responsavel: '',
      autorizadoRetorno: false,
      termoLgpd: false
    });
  };

  return (
    <div className="view-card full-width">
      <h2>Formulário Único de Manifestação (SAC / Ouvidoria)</h2>
      <form onSubmit={salvarManifestacao} className="form-grid">
        <div className="form-group">
          <label>Cliente</label>
          <select
            required
            value={formManifestacao.idCliente}
            onChange={e => setFormManifestacao({ ...formManifestacao, idCliente: e.target.value, idPedido: '' })}
          >
            <option value="">-- Selecione o Cliente --</option>
            {clientes.map(c => (
              <option key={c.id} value={c.id}>
                ID #{c.id} - {c.nome}
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
          <label>Meio Utilizado</label>
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

        <div className="form-group">
          <label>Classificação</label>
          <select
            value={formManifestacao.classificacao}
            onChange={e => setFormManifestacao({ ...formManifestacao, classificacao: e.target.value })}
          >
            <option value="Comportamental">Comportamental</option>
            <option value="Sistêmico">Sistêmico</option>
            <option value="Estrutural">Estrutural</option>
            <option value="Produto">Produto</option>
          </select>
        </div>

        <div className="form-group">
          <label>Vincular ID do Pedido / Venda (Opcional)</label>
          <select
            value={formManifestacao.idPedido}
            onChange={e => setFormManifestacao({ ...formManifestacao, idPedido: e.target.value })}
          >
            <option value="">-- Nenhum --</option>
            {vendas
              .filter(v => v.idCliente === Number(formManifestacao.idCliente))
              .map(v => (
                <option key={v.id} value={v.id}>
                  Venda #{v.id} - {v.produto} (R$ {v.valor})
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label>Gerente Responsável</label>
          <input
            type="text"
            required
            placeholder="Gerente que fará o acompanhamento"
            value={formManifestacao.responsavel}
            onChange={e => setFormManifestacao({ ...formManifestacao, responsavel: e.target.value })}
          />
        </div>

        <div className="form-group full-width">
          <label>Texto da Manifestação</label>
          <textarea
            rows="3"
            required
            placeholder="Relato detalhado da manifestação do cliente..."
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
            Autorizar recebimento de retorno (E-mail, Telefone ou WhatsApp)
          </label>
          <label className="checkbox-label">
            <input
              type="checkbox"
              checked={formManifestacao.termoLgpd}
              onChange={e => setFormManifestacao({ ...formManifestacao, termoLgpd: e.target.checked })}
            />
            <strong>LGPD:</strong> Consentimento do cliente para uso exclusivo dos dados para tratar esta manifestação.
          </label>
        </div>

        <button type="submit" className="btn-submit full-width">
          Registrar Ocorrência (Prazo Padrão: 5 Dias Úteis)
        </button>
      </form>
    </div>
  );
}