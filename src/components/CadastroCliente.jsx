// export default function CadastroCliente() {
//     return(
//         <>
//             <h1>CadastroCliente</h1>
//         </>
//     )
// }

import { useState } from 'react'
import { load, inserir } from '../data/storage.js'

const VAZIO = {
  cpf: '', nome: '', email: '', telefone: '',
  nascimento: '', sexo: '',
  autorizaEmail: false, autorizaWhats: false, autorizaLigacao: false,
}

export default function CadastroCliente() {
  const [form, setForm] = useState(VAZIO)
  const [msg, setMsg] = useState('')

  const clientes = load('clientes')

  const onChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value })
  }

  const salvar = (e) => {
    e.preventDefault()
    // CPF é chave única
    if (clientes.some((c) => c.cpf === form.cpf)) {
      setMsg('❌ Já existe um cliente com este CPF.')
      return
    }
    inserir('clientes', { id: form.cpf, ...form })
    setMsg('✅ Cliente cadastrado com sucesso!')
    setForm(VAZIO)
  }

  return (
    <div className="card">
      <h2>Cadastro de Cliente</h2>
      <form onSubmit={salvar}>
        <div className="grid">
          <div><label>CPF (único)</label>
            <input name="cpf" value={form.cpf} onChange={onChange} required /></div>
          <div><label>Nome</label>
            <input name="nome" value={form.nome} onChange={onChange} required /></div>
          <div><label>E-mail</label>
            <input type="email" name="email" value={form.email} onChange={onChange} /></div>
          <div><label>Telefone</label>
            <input name="telefone" value={form.telefone} onChange={onChange} /></div>
          <div><label>Data de Nascimento</label>
            <input type="date" name="nascimento" value={form.nascimento} onChange={onChange} /></div>
          <div><label>Sexo</label>
            <select name="sexo" value={form.sexo} onChange={onChange}>
              <option value="">Selecione…</option>
              <option>Feminino</option>
              <option>Masculino</option>
              <option>Outro</option>
              <option>Prefiro não informar</option>
            </select></div>
        </div>

        <p style={{ marginTop: 14, fontWeight: 600 }}>Autorização de Marketing:</p>
        <div className="checkbox-line">
          <input type="checkbox" name="autorizaEmail" checked={form.autorizaEmail} onChange={onChange} />
          <span>E-mail</span>
        </div>
        <div className="checkbox-line">
          <input type="checkbox" name="autorizaWhats" checked={form.autorizaWhats} onChange={onChange} />
          <span>WhatsApp</span>
        </div>
        <div className="checkbox-line">
          <input type="checkbox" name="autorizaLigacao" checked={form.autorizaLigacao} onChange={onChange} />
          <span>Ligações</span>
        </div>

        <button className="primary" type="submit">Salvar Cliente</button>
        {msg && <p className="msg">{msg}</p>}
      </form>

      <h3 style={{ marginTop: 24 }}>Clientes cadastrados ({clientes.length})</h3>
      <table>
        <thead><tr><th>CPF</th><th>Nome</th><th>E-mail</th><th>Aniversário</th></tr></thead>
        <tbody>
          {clientes.map((c) => (
            <tr key={c.id}><td>{c.cpf}</td><td>{c.nome}</td><td>{c.email}</td><td>{c.nascimento}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}