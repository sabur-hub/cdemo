// AddAchievement.js

import React, { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AddAchievement = ({ userId, onClose }) => {
    const [achievementData, setAchievementData] = useState({
        title: '',
        description: '',
        date: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAchievementData({ ...achievementData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Отправляем данные достижения на сервер
            await axios.post(`http://localhost:8000/api/users/${userId}/achievements`, achievementData);
            toast.success('Достижение успешно добавлено');
            onClose(); // Закрываем окно после успешного добавления
        } catch (error) {
            console.error('Ошибка при добавлении достижения:', error);
            toast.error('Ошибка при добавлении достижения');
        }
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>Добавить достижение</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Название</label>
                        <input type="text" id="title" name="title" value={achievementData.title} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="description">Описание</label>
                        <textarea id="description" name="description" value={achievementData.description} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="date">Дата</label>
                        <input type="date" id="date" name="date" value={achievementData.date} onChange={handleChange} required />
                    </div>
                    <button type="submit">Добавить</button>
                </form>
            </div>
        </div>
    );
};

export default AddAchievement;
