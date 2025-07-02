// src/components/Inbox.js

import React, { useState, useEffect } from 'react';
import { getQuestions } from '../../../services/Service';  // Importer la fonction du service
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Inbox.css'

function Inbox() {
    const { userId } = useParams();  // Récupérer l'ID de l'utilisateur
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const data = await getQuestions(userId);
                setQuestions(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchQuestions();
    }, [userId]);

    if (loading) {
        return <div>Chargement des messages...</div>;
    }

    if (error) {
        return <div>
            {error}

        </div>;
    }

    return (
        <div className="inbox-container">
            <h3>Vos questions anonymes</h3>
            {questions.length === 0 ? (
                <p>Vous n'avez aucune question pour le moment.</p>
            ) : (
                questions.map((question, index) => (
                    <div key={index} className="message">
                        <p><strong>Question anonyme</strong></p>
                        <p>{question.question}</p>
                        <p><small>Reçu le {new Date(question.date).toLocaleString()}</small></p>
                    </div>
                ))
            )}
        </div>
    );
}

export default Inbox;
