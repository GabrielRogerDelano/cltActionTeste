export default function Menu({ atual, onSelect }) {
  return (
    <nav>
      <button
        className={atual === 'cadastros' ? 'active' : ''}
        onClick={() => onSelect('cadastros')}
      >
        📝 Entrada & Formulários
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