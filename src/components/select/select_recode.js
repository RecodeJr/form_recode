export default function Select_recode(
    { labeltxt, nomeSelect, idSelect, listaItens, cssClass }) {
    return (
        <div className="grid">
            <label><b>{labeltxt}</b></label>
            <select name={nomeSelect && nomeSelect}
                id={idSelect && idSelect}
                className={cssClass ? cssClass : "w-auto p-2 border-none shadow-md rounded-md"} >
                {listaItens && listaItens.map(op => {
                    return (
                        <option key={op.value} value={op.value}>{op.descricao}</option>
                    )
                })}
            </select>
        </div>
    )
}