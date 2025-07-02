import React, { useState } from 'react';
import './Index.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getUserByPhone } from '../../../services/Service'; // Importation du service

function Index() {
    const navigate = useNavigate();
    
    // État pour gérer l'affichage de la modale et le numéro de téléphone saisi
    const [showModal, setShowModal] = useState(false);
    const [phone, setPhone] = useState('');
    const [error, setError] = useState('');

    const gotoInbox = () => {
        setShowModal(true); // Afficher la modale pour entrer le numéro de téléphone
    };

    const goToRegister = () => {
        navigate('/register');
    };

    const handlePhoneChange = (e) => {
        setPhone(e.target.value);
        setError(''); // Réinitialiser l'erreur à chaque changement
    };

    const handleSubmitPhone = async () => {
        try {
            // Utilisation du service getUserByPhone pour vérifier l'utilisateur
            const response = await getUserByPhone(phone);
            
            if (response.success) {
                // Si l'utilisateur existe, rediriger vers son inbox
                navigate(`/inbox/${response.user.id}`);
                setShowModal(false); // Fermer la modale
            } else {
                // Si l'utilisateur n'existe pas
                setError('Utilisateur non trouvé');
                toast.error('Utilisateur non trouvé');
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message); // Afficher l'erreur avec toast
        }
    };

    return (
        <div className='container'>
            <div className="row">
                <button onClick={goToRegister}>Je m'inscris</button>
                <button onClick={gotoInbox}>Je lis mes messages</button>
            </div>

            {/* Modale pour entrer le numéro de téléphone */}
            {showModal && (
                <div className='modal'>
                    <div className='modal-content'>
                        <span className='close' onClick={() => setShowModal(false)}>&times;</span>
                        <h4>Entrez votre numéro de téléphone</h4>
                        <input
                            type="text"
                            placeholder="Numéro de téléphone"
                            value={phone}
                            onChange={handlePhoneChange}
                        />
                        <button id='btn' onClick={handleSubmitPhone}>Vérifier</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Index;
