import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import AddCardModal from './AddCardModal';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [cards, setCards] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dragOverColumn, setDragOverColumn] = useState(null);
  const [editData, setEditData] = useState(null); 

  useEffect(() => {
    // Fetch cards from the backend when the component mounts
    fetchCards();
  }, []);

  const fetchCards = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/cards/');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const handleCardClick = (data) => {
    setEditData(data);
    setShowModal(true);
  };

  const handleAddCard = async (newCard) => {
    try {
      const response = await axios.post('http://localhost:8000/api/cards/', newCard);
      setCards([...cards, response.data]);
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleEdit = async (editedCard) => {
    try {
      const response = await axios.put(`http://localhost:8000/api/cards/${editedCard.id}/`, editedCard);
      const updatedCards = cards.map(card => (card.id === editedCard.id ? response.data : card));
      setCards(updatedCards);
      setShowModal(false);
    } catch (error) {
      console.error('Error editing card:', error);
    }
  };

  const handleDragStart = (e, cardId) => {
    e.dataTransfer.setData('cardId', cardId);
  };

  const handleDragOver = (e, columnId) => {
    e.preventDefault();
    setDragOverColumn(columnId);
  };

  const handleDrop = (e, columnId) => {
    e.preventDefault();
    const cardId = e.dataTransfer.getData('cardId');
    const updatedCards = cards.map(card => {
      if (card.id === parseInt(cardId)) {
        return { ...card, column: columnId };
      }
      return card;
    });
    setCards(updatedCards);
    setDragOverColumn(null);
  };

  const handleDelete = async (cardId) => {
    try {
      await axios.delete(`http://localhost:8000/api/cards/${cardId}/`);
      const updatedCards = cards.filter(card => card.id !== cardId);
      setCards(updatedCards);
    } catch (error) {
      console.error('Error deleting card:', error);
    }
  };

  return (
    <div className="container-fluid mt-5">
      <h2 className="text-center fw-bold">Card Hub</h2>
      <button className="btn btn-primary mb-3 mx-auto d-block" onClick={() => setShowModal(true)}>
        Add Card <i className="fa fa-plus-circle"></i>
      </button>
      <div className="row justify-content-around">
        {['To Do', 'Doing', 'Done'].map((columnId) => (
          <div key={columnId} className={`col-md-3 column ${dragOverColumn === columnId ? 'drop-target' : 'non-drop-target'}`} 
               onDrop={(e) => handleDrop(e, columnId)} 
               onDragOver={(e) => handleDragOver(e, columnId)}>
            <h3 className="text-left fw-bold">{columnId}</h3>
            {cards.filter(card => card.column === columnId).map((card, index) => (
              <Card key={card.id} {...card} handleCardClick={handleCardClick} handleDragStart={handleDragStart} handleDelete={handleDelete} />
            ))}
          </div>
        ))}
      </div>
      <AddCardModal show={showModal} handleClose={handleCloseModal} handleAddCard={handleAddCard} handleEdit={handleEdit} handleDeleteCard={handleDelete} cardData={editData} />
    </div>
  );
};

export default App;
