import './buttonStyle.css'


function Button({label, onClicked, isOperator, isResult}){
    return (
        <>
        <div className='col-3 p-2'>
            <button 
            className={"d-flex justify-content-center w-100" + " " + (isOperator ? "active" : "") + (isResult ? "result" : "")} 
            onClick={() => onClicked(label)}>{label}</button>
        </div>
        </>
    
    )
}




export default Button