import React from 'react'

const EditableRow = ({ editData, handleEditData, handleCancelBtn, guest }) => {
    return (
        <tr key={guest._id}>
            <td>
                <input 
                type="text" 
                name="fullName"
                value={editData.fullName}
                onChange={handleEditData}
                requered="true"></input>
            </td>
            <td>
            <input 
                type="email" 
                name="email"
                value={editData.email}
                onChange={handleEditData}
                requered="true"></input>
            </td>
            <td>
            <input 
                type="text" 
                name="age"
                value={editData.age}
                onChange={handleEditData}
                requered="true"></input>
            </td>
            <td className='edit-btns'>
                <button type="submit">Išsaugoti</button>
                <button onClick={handleCancelBtn}>Atšaukti</button>
            </td>
        </tr>
    )
}

export default EditableRow
