export default function ModalParecer(props) {
  const { modalParecer, setModalParecer, confirmarFinalizacaoComParecer } = props;

  return (
    <>
      {modalParecer.aberto && (
        <div className="modal-overlay">
          <div className="modal-card">
            <div className="modal-header">
              <h3>✍️ Parecer Conclusivo do Gerente (Protocolo #{modalParecer.manifestacaoId})</h3>
              <button
                type="button"
                className="btn-close-modal"
                onClick={() => setModalParecer({ aberto: false, manifestacaoId: null, gerenteNome: '', textoParecer: '' })}
              >
                ✕
              </button>
            </div>

            <form onSubmit={confirmarFinalizacaoComParecer}>
              <div className="modal-body">
                <p className="modal-instruction">
                  Ao registrar o parecer final, a ocorrência sairá do estado <strong>"Em Tratamento"</strong> para <strong>"Finalizado"</strong>, ficando visível no relatório de auditoria.
                </p>

                <div className="form-group" style={{ marginBottom: '16px' }}>
                  <label>Gerente Conclusor do Caso:</label>
                  <input
                    type="text"
                    required
                    value={modalParecer.gerenteNome}
                    onChange={e => setModalParecer({ ...modalParecer, gerenteNome: e.target.value })}
                    placeholder="Nome do gerente que assina o parecer"
                  />
                </div>

                <div className="form-group">
                  <div className="label-with-counter">
                    <label>Parecer Técnico / Solução Adotada:</label>
                    <span className={`char-counter ${modalParecer.textoParecer.length >= 240 ? 'warn' : ''}`}>
                      {modalParecer.textoParecer.length} / 250 caracteres
                    </span>
                  </div>
                  <textarea
                    rows="4"
                    required
                    maxLength={250}
                    placeholder="Descreva sucintamente as providências tomadas para regularizar a ocorrência (máximo de 250 caracteres)..."
                    value={modalParecer.textoParecer}
                    onChange={e => setModalParecer({ ...modalParecer, textoParecer: e.target.value })}
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  className="btn-cancel-large"
                  onClick={() => setModalParecer({ aberto: false, manifestacaoId: null, gerenteNome: '', textoParecer: '' })}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn-submit btn-finalize">
                  Salvar Parecer e Finalizar Caso
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
