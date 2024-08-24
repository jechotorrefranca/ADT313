import './name.css'

function Name({ firstName, middleInitial, lastName }) {

    return(
        <div className="">
            <h1 className="fName">{firstName} 
                <span className='mName'> {middleInitial} </span> 
                <span className='lName'>{lastName}</span>
            </h1> 
        </div>
    )

}

export default Name;