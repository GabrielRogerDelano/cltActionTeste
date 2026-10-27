export default function Marketing() {
    return(
        <>
            <h1>Marketing</h1>
        </>
    )
}

// Marketing ou publicidade:

// import { load } from '../data/storage.js'

// export default function Marketing() {
//   const clientes = load('clientes')
//   const hoje = new Date()
//   const mesAtual = String(hoje.getMonth() + 1).padStart(2, '0')

//   const aniversariantes = clientes.filter(
//     (c) => c.nascimento && c.nascimento.slice(5, 7) === mesAtual
//   )

//   // Segmentação simplificada: clientes que autorizaram e-mail
//   const autorizadosEmail = clientes.filter((c) => c.autorizaEmail)

//   return (
//     <div className="card">
//       <h2>Marketing Direto</h2>

//       <h3>🎂 Aniversariantes do mês</h3>
//       {aniversariantes.length === 0 && <p>Nenhum aniversariante este mês.</p>}
//       <table>
//         <thead><tr><th>Nome</th><th>E-mail</th><th>Nascimento</th><th>Ação</th></tr></thead>
//         <tbody>
//           {aniversariantes.map((c) => (
//             <tr key={c.id}>
//               <td>{c.nome}</td>
//               <td>{c.email}</td>
//               <td>{c.nascimento}</td>
//               <td>
//                 <button className="secondary"
//                   onClick={() => alert(`Mensagem de parabéns enviada para ${c.nome}!`)}>
//                   Enviar parabéns
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <h3 style={{ marginTop: 24 }}>📢 Clientes com autorização de e-mail ({autorizadosEmail.length})</h3>
//       <table>
//         <thead><tr><th>Nome</th><th>E-mail</th><th>Ação</th></tr></thead>
//         <tbody>
//           {autorizadosEmail.map((c) => (
//             <tr key={c.id}>
//               <td>{c.nome}</td>
//               <td>{c.email}</td>
//               <td>
//                 <button className="secondary"
//                   onClick={() => alert(`Promoção enviada para ${c.nome}`)}>
//                   Disparar promoção
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   )
// }