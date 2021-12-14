import React, {useState, useEffect, Fragment} from 'react'
import axios from "axios"
import NotEditableRow from './NotEditableRow';
import EditableRow from './EditableRow';


const TableComponent = () => {

    const [guests, setGuests] = useState([]);
    const [message, setMessage] = useState("");
    const [editGuestId, setEditGuestId] = useState(null);
    const [editData, setEditData] = useState();

    useEffect(() => {
        axios.get("http://localhost:7000/api/guests")
        .then((response) => setGuests(response.data));
        
    },[guests]);
    

    const handleEditBtn = (event, guest) => {
        event.preventDefault();
        setEditGuestId(guest._id);

        const inputValues = {
            fullName: guest.fullName,
            email: guest.email,
            age: guest.age,
        };

        setEditData(inputValues);
    };
    const handleEditData = (event) => {
        event.preventDefault();

        const inputName = event.target.getAttribute("name");
        const inputValue = event.target.value;

        const newData = {...editData};
        newData[inputName] = inputValue;

        setEditData(newData);
    };
    const handleEditDataSubmit = (event) => {
        event.preventDefault();
        let editedInfo = {
            fullName: editData.fullName,
            email: editData.email,
            age: +editData.age,
        };
       
        axios.put(`http://localhost:7000/api/guests/${editGuestId}`, editedInfo)
        .then((response) => {
            console.log(response.data);
            setMessage("Informacija atnaujinta sėkmingai");
            setEditGuestId(null);
        });
    };
    const handleCancelBtn = () => {
        setEditGuestId(null);
    };
    const handleDeleteBtn = (event, guest) => {
        event.preventDefault();
        console.log("guest id", guest._id);
        axios.delete(`http://localhost:7000/api/guests/${guest._id}`)
        .then((response) => {
            console.log(response);
            setMessage("Svečias pašalintas iš sistemos")})
    };
    
    
    return (
        <div className="table-component">
            <h3>Užregistruotų svečių sąrašas</h3>
            <form onSubmit={handleEditDataSubmit}>
            <table>
                <thead>
                    <tr>
                        <th>Vardas, Pavardė</th>
                        <th>El. paštas</th>
                        <th>Gimimo metai</th>
                        <th>Veiksmai</th>
                    </tr>
                </thead>
                <tbody>
                    {guests.map((guest) =>(
                        <Fragment>
                           {editGuestId === guest._id ? 
                           <EditableRow 
                           guest={guest}
                           editData={editData} 
                           handleEditData={handleEditData}
                           handleCancelBtn={handleCancelBtn}
                           /> : 
                           <NotEditableRow 
                           guest={guest} 
                           handleEditBtn={handleEditBtn}
                           handleDeleteBtn={handleDeleteBtn}/>} 
                        </Fragment>
                        
                    ))}
                    
                </tbody>
            </table>
            </form>
            <b className='message'>{message}</b> 
        </div>
    )
}

export default TableComponent
