// export default function Manifestacao() {
//     return(
//         <>
//             <h1>Manifestacao</h1>
//         </>
//     )
// }

import { useState } from 'react'
import { load, inserir, atualizar, novoId } from '../data/storage.js'

const VAZIO = {
  clienteId: '', tipo: 'Reclamação', meio: 'Telefone',
  texto: '', classificacao: 'Comportamental',
  pedidoId: '', funcionario: '',
  autorizaRetorno: false, aceitePrivacidade: false,
}

const DIAS_PRAZO = 5 // úteis — simplificado para dias corridos aqui

export default function Manifestacao() {
  const clientes = load('clientes')
  const vendas = load('vendas')
  const manifestacoes = load('manifestacoes')

  const [form, setForm] = useState(VAZIO)
  const [msg, setMsg] = useState('')

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const salvar = (e) => {
    e.preventDefault()
    if (!form.clienteId) { setMsg('❌ Selecione o cliente.'); return }
    if (!form.aceitePrivacidade) {
      setMsg('❌ É necessário aceitar a Política de Privacidade.')
      return
    }
    const hoje = new Date()
    const prazo = new Date(hoje)
    prazo.setDate(prazo.getDate() + DIAS_PRAZO)

    inserir('manifestacoes', {
      id: novoId('M'),
      ...form,
      status: 'Aberto',
      dataRegistro: hoje.toISOString().slice(0, 10),
      dataPrazo: prazo.toISOString().slice(0, 10),
      dataFinalizacao: null,
    })
    setMsg('✅ Manifestação registrada (prazo de 5 dias).')
    setForm(VAZIO)
  }

  const avancarStatus = (id, atual) => {
    const fluxo = { Aberto: 'Em tratamento', 'Em tratamento': 'Finalizado' }
    const proximo = fluxo[atual]
    if (!proximo) return
    atualizar('manifestacoes', id, {
      status: proximo,
      dataFinalizacao: proximo === 'Finalizado'
        ? new Date().toISOString().slice(0, 10) : null,
    })
    // força re-render
    setForm({ ...form })
  }


  return (
    <div className="card">
      <h2>Formulário de Manifestação</h2>
      <form onSubmit={salvar}>
        <div className="grid">
          <div><label>Cliente</label>
            <select name="clienteId" value={form.clienteId} onChange={onChange} required>
              <option value="">Selecione…</option>
              {clientes.map((c) => (
                <option key={c.id} value={c.id}>{c.nome} — {c.cpf}</option>
              ))}
            </select></div>
          <div><label>Tipo</label>
            <select name="tipo" value={form.tipo} onChange={onChange}>
              <option>Elogio</option><option>Sugestão</option><option>Reclamação</option>
            </select></div>
          <div><label>Meio utilizado</label>
            <select name="meio" value={form.meio} onChange={onChange}>
              <option>Telefone</option><option>E-mail</option>
              <option>Redes sociais</option><option>WhatsApp</option>
            </select></div>
          <div><label>Classificação</label>
            <select name="classificacao" value={form.classificacao} onChange={onChange}>
              <option>Comportamental</option><option>Sistêmico</option>
              <option>Estrutural</option><option>Produto</option>
            </select></div>
          <div><label>Funcionário responsável</label>
            <input name="funcionario" value={form.funcionario} onChange={onChange} /></div>
          {(form.classificacao === 'Produto') && (
            <div><label>ID do pedido/venda</label>
              <select name="pedidoId" value={form.pedidoId} onChange={onChange}>
                <option value="">Selecione…</option>
                {vendas.map((v) => <option key={v.id} value={v.id}>{v.id}</option>)}
              </select></div>
          )}
        </div>

        <div style={{ marginTop: 12 }}>
          <label>Descrição (problema, sugestão ou elogio)</label>
          <textarea name="texto" value={form.texto} onChange={onChange} required />
        </div>

        <div className="checkbox-line">
          <input type="checkbox" name="autorizaRetorno" checked={form.autorizaRetorno} onChange={onChange} />
          <span>Autorizo retorno por e-mail/telefone/WhatsApp</span>
        </div>
        <div className="checkbox-line">
          <input type="checkbox" name="aceitePrivacidade" checked={form.aceitePrivacidade} onChange={onChange} />
          <span>Li e aceito a Política de Privacidade — dados usados somente para tratar esta manifestação.</span>
        </div>

        <button className="primary" type="submit">Registrar Manifestação</button>
        {msg && <p className="msg">{msg}</p>}
      </form>

      <h3 style={{ marginTop: 24 }}>Manifestações ({manifestacoes.length})</h3>
      <table>
        <thead><tr>
          <th>ID</th><th>Cliente</th><th>Tipo</th><th>Status</th>
          <th>Registro</th><th>Prazo</th><th>Finalização</th><th>Ação</th>
        </tr></thead>
        <tbody>
          {manifestacoes.map((m) => {
            const cli = clientes.find((c) => c.id === m.clienteId)
            return (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{cli?.nome || '-'}</td>
                <td>{m.tipo}</td>
                <td>
                  <span className={`badge ${m.status.toLowerCase().replace(' ', '')}`}>
                    {m.status}
                  </span>
                </td>
                <td>{m.dataRegistro}</td>
                <td>{m.dataPrazo}</td>
                <td>{m.dataFinalizacao || '—'}</td>
                <td>
                  {m.status !== 'Finalizado' && (
                    <button className="secondary"
                      onClick={() => avancarStatus(m.id, m.status)}>
                      Avançar
                    </button>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}