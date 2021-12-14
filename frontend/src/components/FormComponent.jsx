import React, {useState, useRef} from 'react'
import axios from "axios"

const FormComponent = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");

    let guestfullNameInputRef = useRef(null);
    let guestemailInputRef = useRef(null);
    let guestageInputRef = useRef(null);
    

    const submitHandler = (e) => {
        e.preventDefault();
        
        setFullName("");
        setAge("");
        setEmail("");
       
    };
    const createGuest = () => {
        

       
        axios.post("http://localhost:7000/api/guests", {fullName: guestfullNameInputRef.current.value,
        email: guestemailInputRef.current.value,
        age: guestageInputRef.current.value,})
        .then((res) => {
            console.log(res);
        console.log(res.data);});
       
    };
    
    return (
      <>
        <h3>Užregistruoti svečią</h3>
        <form className="form-component" onSubmit={submitHandler} > 
        <div>
            <label htmlFor="fullName">Vardas, Pavardė</label>
            <input 
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                ref={guestfullNameInputRef}
                />
        </div>
        <div>
            <label htmlFor="email">El. paštas</label>
            <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                ref={guestemailInputRef}
                />
        </div>
        <div>
            <label htmlFor="age">Amžius</label>
            <input 
                type="text"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                ref={guestageInputRef}
                />
        </div>
        <div className="registerbtn">
            <input onClick={createGuest} type="submit" value="Užregistruoti"/>
        </div>
        </form>

      </>
    )
}

export default FormComponent
