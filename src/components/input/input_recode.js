export default function Input_Recode({
    labeltxt, placeholder, inputName, inputID, cssClass
}) {
    return (
        <div className="grid">
            <label><b>{labeltxt}</b></label>
            <input name={inputName && inputName}
                id={inputID && inputID} placeholder={placeholder ? placeholder : ""}
                className={cssClass ? cssClass : "w-auto p-1 border-none shadow-md rounded-md"} />
        </div>
    )
}