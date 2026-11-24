export default function Menu({ atual, onSelect }) {
  return (
    <nav>
      <button
        className={atual === 'cliente' ? 'active' : ''}
        onClick={() => onSelect('cliente')}
      >
        👤 Cadastrar Cliente
      </button>
      <button
        className={atual === 'venda' ? 'active' : ''}
        onClick={() => onSelect('venda')}
      >
        🛒 Registrar Venda
      </button>
      <button
        className={atual === 'manifestacao' ? 'active' : ''}
        onClick={() => onSelect('manifestacao')}
      >
        📢 SAC / Ouvidoria
      </button>
      <button
        className={atual === 'marketing' ? 'active' : ''}
        onClick={() => onSelect('marketing')}
      >
        🎯 Automação Marketing
      </button>
      <button
        className={atual === 'relatorios' ? 'active' : ''}
        onClick={() => onSelect('relatorios')}
      >
        📊 Relatório Ouvidoria
      </button>
    </nav>
  );
}