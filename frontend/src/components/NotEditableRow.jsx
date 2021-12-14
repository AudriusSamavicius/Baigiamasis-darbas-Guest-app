import React from 'react'

const NotEditableRow = ({ guest, handleEditBtn, handleDeleteBtn }) => {
    return (
        <tr key={guest._id}>
             <td>{guest.fullName}</td>
             <td>{guest.email}</td>
             <td>{new Date().getFullYear() - guest.age}</td>
             <td className='edit-btns'>
                <button onClick={(event) => handleEditBtn(event, guest)} >Koreguoti</button>
                <button onClick={(event) => handleDeleteBtn(event, guest)} >Ištrinti</button>
            </td>
             
         </tr>
    )
}

export default NotEditableRow
