import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import './List.css';

const List = ({ data, searchTerm }) => {

    const [editableIndex, setEditableIndex] = useState(null);
    const [editedCity, setEditedCity] = useState('');
    const [editedState, setEditedState] = useState('');
    
    const handleEditClick = (index, currentCity, currentState) => {
        setEditableIndex(index);
        setEditedCity(currentCity);
        setEditedState(currentState);
    };
    
    const handleSaveClick = (index) => {
        setEditableIndex(null);

        // Update the data array with the edited address
        const newData = [...data];
        newData[index].location.city = editedCity;
        newData[index].location.state = editedState;    
    };
    
    const handleCityChange = (e) => {
        setEditedCity(e.target.value);
    };
    
    const handleStateChange = (e) => {
        setEditedState(e.target.value);
    };
    
    const renderEditIcon = (index, currentCity, currentState) => {
        return (
            <IconButton
              size="small"
              onClick={() => (editableIndex === index ? handleSaveClick(index) : handleEditClick(index, currentCity, currentState))}
            >
              {editableIndex === index ? <SaveIcon /> : <EditIcon />}
            </IconButton>
          );
    };

    const filteredData = searchTerm
    ? data.filter(
        (item) =>
          `${item.name.first} ${item.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : data;
    

    return (
        <div className="card-container">
            {filteredData.map((item, index) => (
                <div key={item.login.uuid} className="card"> {/* use uuid as the unique identifier*/}
                    <div className="upper-part">
                        <p>{item.name.first} {item.name.last}</p>                    
                        <img src={item.picture.large} alt="User" />
                    </div>
                    <div className="lower-part">
                        <p>{item.email}</p>
                        <p>{item.phone}</p>
                        <p>
                        {renderEditIcon(index, item.location.city, item.location.state)} {editableIndex === index ? (
                            <>
                            <input
                                type="text"
                                value={editedCity}
                                onChange={handleCityChange}
                                placeholder="City"
                            />
                            <input
                                type="text"
                                value={editedState}
                                onChange={handleStateChange}
                                placeholder="State"
                            />
                            </>
                        ) : (
                            ` ${item.location.city}, ${item.location.state}`
                        )}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default List;
