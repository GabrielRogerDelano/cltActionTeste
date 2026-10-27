export default function Relatorios() {
    return(
        <>
            <h1>Relatorios</h1>
        </>
    )
}
// import { useState } from 'react'
// import { load } from '../data/storage.js'

// export default function Relatorios() {
//   const clientes = load('clientes')
//   const manifestacoes = load('manifestacoes')
//   const [filtro, setFiltro] = useState('Todas')

//   const lista = filtro === 'Todas'
//     ? manifestacoes
//     : manifestacoes.filter((m) => m.classificacao === filtro)

//   const agrupar = (chave) => {
//     return manifestacoes.reduce((acc, m) => {
//       acc[m[chave]] = (acc[m[chave]] || 0) + 1
//       return acc
//     }, {})
//   }

//   const porClassificacao = agrupar('classificacao')
//   const porTipo = agrupar('tipo')
//   const porStatus = agrupar('status')

//   const sugestoes = {
//     Comportamental: 'Treinar equipe em comunicação e empatia; revisar scripts de atendimento.',
//     Sistêmico: 'Mapear processo e eliminar etapas redundantes; automatizar retrabalho.',
//     Estrutural: 'Avaliar infraestrutura física e ferramentas; investir em melhorias.',
//     Produto: 'Revisar qualidade do produto/serviço junto ao fornecedor e controle de qualidade.',
//   }

//   return (
//     <div className="card">
//       <h2>Relatórios Sintéticos</h2>

//       <div className="grid" style={{ marginBottom: 16 }}>
//         <div className="card" style={{ boxShadow: 'none', background: '#f8fafc' }}>
//           <strong>Total de manifestações</strong>
//           <p style={{ fontSize: 22, margin: 4 }}>{manifestacoes.length}</p>
//         </div>
//         <div className="card" style={{ boxShadow: 'none', background: '#f8fafc' }}>
//           <strong>Por status</strong>
//           <p>{Object.entries(porStatus).map(([k, v]) => `${k}: ${v}`).join(' • ') || '—'}</p>
//         </div>
//         <div className="card" style={{ boxShadow: 'none', background: '#f8fafc' }}>
//           <strong>Por tipo</strong>
//           <p>{Object.entries(porTipo).map(([k, v]) => `${k}: ${v}`).join(' • ') || '—'}</p>
//         </div>
//         <div className="card" style={{ boxShadow: 'none', background: '#f8fafc' }}>
//           <strong>Por classificação</strong>
//           <p>{Object.entries(porClassificacao).map(([k, v]) => `${k}: ${v}`).join(' • ') || '—'}</p>
//         </div>
//       </div>

//       <label>Filtrar por classificação</label>
//       <select value={filtro} onChange={(e) => setFiltro(e.target.value)}>
//         <option>Todas</option>
//         <option>Comportamental</option>
//         <option>Sistêmico</option>
//         <option>Estrutural</option>
//         <option>Produto</option>
//       </select>

//       <table>
//         <thead><tr>
//           <th>ID</th><th>Cliente</th><th>Tipo</th><th>Classificação</th>
//           <th>Data Inicial</th><th>Data Finalização</th><th>Texto</th><th>Funcionário</th>
//         </tr></thead>
//         <tbody>
//           {lista.map((m) => {
//             const cli = clientes.find((c) => c.id === m.clienteId)
//             return (
//               <tr key={m.id}>
//                 <td>{m.id}</td>
//                 <td>{cli?.nome || '-'}</td>
//                 <td>{m.tipo}</td>
//                 <td>{m.classificacao}</td>
//                 <td>{m.dataRegistro}</td>
//                 <td>{m.dataFinalizacao || '—'}</td>
//                 <td>{m.texto}</td>
//                 <td>{m.classificacao === 'Comportamental' ? m.funcionario : '—'}</td>
//               </tr>
//             )
//           })}
//         </tbody>
//       </table>

//       <h3 style={{ marginTop: 24 }}>Sugestões de melhoria por classificação</h3>
//       <ul>
//         {Object.entries(sugestoes).map(([k, v]) => (
//           <li key={k}><strong>{k}:</strong> {v}</li>
//         ))}
//       </ul>
//     </div>
//   )
// }