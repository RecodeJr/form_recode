export default function Select_recode(
    { value, labeltxt, nomeSelect, idSelect, listaItens, cssClass, handleChange }) {
    return (
        <div className="grid">
            <label><b>{labeltxt}</b></label>
            <select name={nomeSelect && nomeSelect}
                id={idSelect && idSelect}
                className={cssClass ? cssClass : "w-full min-w-32 max-w-full p-2 border-none shadow-md rounded-md"}
                onChange={handleChange}
                value={value} >
                {listaItens && listaItens.map(op => {
                    return (
                        <option key={op.value} value={op.value}>{op.descricao}</option>
                    )
                })}
            </select>
        </div>
    )
}