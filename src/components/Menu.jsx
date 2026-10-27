const ITENS = [
  { id: 'cliente', label: '👤 Cadastro Cliente' },
  { id: 'venda', label: '🛒 Serviço / Venda' },
  { id: 'manifestacao', label: '📝 Manifestação' },
  { id: 'relatorios', label: '📊 Relatórios' },
  { id: 'marketing', label: '📢 Marketing' },
]

export default function Menu({ atual, onSelect }) {
  return (
    <nav className="menu">
      {ITENS.map((it) => (
        <button
          key={it.id}
          className={atual === it.id ? 'active' : ''}
          onClick={() => onSelect(it.id)}
        >
          {it.label}
        </button>
      ))}
    </nav>
  )
}