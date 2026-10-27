export default function CadastroVenda() {
    return(
        <>
            <h1>CadastroVenda</h1>
        </>
    )
}
// Cadastro de Venda JSX:

// import { useState } from 'react'
// import { load, inserir, novoId } from '../data/storage.js'

// export default function CadastroVenda() {
//   const clientes = load('clientes')
//   const vendas = load('vendas')

//   const [form, setForm] = useState({
//     clienteId: '', data: '', descricao: '',
//     valorUnitario: '', quantidade: 1,
//     pagamento: 'Dinheiro', funcionario: '',
//   })
//   const [msg, setMsg] = useState('')

//   const onChange = (e) =>
//     setForm({ ...form, [e.target.name]: e.target.value })

//   const total =
//     Number(form.valorUnitario || 0) * Number(form.quantidade || 0)

//   const salvar = (e) => {
//     e.preventDefault()
//     if (!form.clienteId) { setMsg('❌ Selecione um cliente.'); return }
//     inserir('vendas', {
//       id: novoId('V'),
//       ...form,
//       total,
//     })
//     setMsg('✅ Venda/serviço registrado!')
//     setForm({ ...form, descricao: '', valorUnitario: '', quantidade: 1 })
//   }

//   return (
//     <div className="card">
//       <h2>Registro de Serviço / Venda</h2>
//       <form onSubmit={salvar}>
//         <div className="grid">
//           <div><label>Cliente</label>
//             <select name="clienteId" value={form.clienteId} onChange={onChange} required>
//               <option value="">Selecione…</option>
//               {clientes.map((c) => (
//                 <option key={c.id} value={c.id}>{c.nome} — {c.cpf}</option>
//               ))}
//             </select></div>
//           <div><label>Data</label>
//             <input type="date" name="data" value={form.data} onChange={onChange} required /></div>
//           <div><label>Funcionário executor</label>
//             <input name="funcionario" value={form.funcionario} onChange={onChange} required /></div>
//           <div><label>Forma de pagamento</label>
//             <select name="pagamento" value={form.pagamento} onChange={onChange}>
//               <option>Dinheiro</option><option>PIX</option>
//               <option>Cartão Débito</option><option>Cartão Crédito</option>
//               <option>Boleto</option>
//             </select></div>
//           <div><label>Valor unitário (R$)</label>
//             <input type="number" step="0.01" name="valorUnitario" value={form.valorUnitario} onChange={onChange} /></div>
//           <div><label>Quantidade</label>
//             <input type="number" name="quantidade" value={form.quantidade} onChange={onChange} /></div>
//         </div>

//         <div style={{ marginTop: 12 }}>
//           <label>Descrição do produto/serviço</label>
//           <textarea name="descricao" value={form.descricao} onChange={onChange} />
//         </div>

//         <p style={{ fontWeight: 700 }}>Total: R$ {total.toFixed(2)}</p>
//         <button className="primary" type="submit">Registrar Venda</button>
//         {msg && <p className="msg">{msg}</p>}
//       </form>

//       <h3 style={{ marginTop: 24 }}>Vendas registradas ({vendas.length})</h3>
//       <table>
//         <thead><tr><th>ID</th><th>Cliente</th><th>Data</th><th>Total</th><th>Pagamento</th></tr></thead>
//         <tbody>
//           {vendas.map((v) => {
//             const cli = clientes.find((c) => c.id === v.clienteId)
//             return (
//               <tr key={v.id}>
//                 <td>{v.id}</td><td>{cli?.nome || '-'}</td>
//                 <td>{v.data}</td><td>R$ {v.total.toFixed(2)}</td>
//                 <td>{v.pagamento}</td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>
//     </div>
//   )
// }