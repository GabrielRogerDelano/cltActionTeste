
export function load(chave) {
  try {
    const dados = localStorage.getItem(chave)
    return dados ? JSON.parse(dados) : []
  } catch (erro) {
    console.error(`Erro ao carregar "${chave}":`, erro)
    return []
  }
}

export function save(chave, dados) {
  localStorage.setItem(chave, JSON.stringify(dados))
}

export function inserir(chave, registro) {
  const dados = load(chave)
  const novoRegistro = {
    ...registro,
    id: registro.id ?? novoId(chave),
  }

  dados.push(novoRegistro)
  save(chave, dados)

  return novoRegistro
}

export function atualizar(chave, id, alteracoes) {
  const dados = load(chave)
  const indice = dados.findIndex(
    (item) => String(item.id) === String(id)
  )

  if (indice === -1) {
    return null
  }

  dados[indice] = {
    ...dados[indice],
    ...alteracoes,
    id: dados[indice].id,
  }

  save(chave, dados)

  return dados[indice]
}

export function novoId(chave) {
  const dados = load(chave)

  const maiorId = dados.reduce((maior, item) => {
    const id = Number(item.id)
    return Number.isFinite(id) ? Math.max(maior, id) : maior
  }, 0)

  return maiorId + 1
}
