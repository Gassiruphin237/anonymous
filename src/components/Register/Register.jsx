import React, { useState } from 'react';
import { registerUser } from '../../../services/Service';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import './Register.css';

function Register() {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [userLink, setUserLink] = useState('');
    const [isRegistered, setIsRegistered] = useState(false); // Nouvel état pour contrôler l'affichage du formulaire

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const data = await registerUser(name, phone);

            if (data.success) {
                toast.success('Inscription réussie !');
                setName('');
                setPhone('');
                setUserLink(data.user.link);
                setIsRegistered(true); // Définir à true pour masquer le formulaire
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className='container'>
            <div className="head"></div>

            {/* Afficher le formulaire uniquement si l'utilisateur n'est pas inscrit */}
            {!isRegistered ? (
                <form onSubmit={handleSubmit}>
                    <div className="body">
                        <h4>Bienvenue sur l'application Anonyme de message, créez un compte et partagez-le à vos contacts WhatsApp pour qu'ils vous posent des questions.</h4>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Entrer votre nom"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="text"
                            name="phone"
                            id="phone"
                            placeholder="Entrer votre numéro"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <button type="submit">Je m'inscris</button>
                    </div>
                </form>
            ) : (
                // Si l'utilisateur est inscrit, afficher le lien
                <div className='screen'>
                    <h4>Votre lien pour poser une question de manière anonyme :</h4>
                    <a href={`https://wa.me/?text=${encodeURIComponent(userLink)}`} target="_blank" rel="noopener noreferrer">
                        Partager sur WhatsApp
                    </a><br />
                    <a href={`/inbox/${userLink.split('/').pop()}`} id='a'>Je lis mes messages</a>
                </div>
            )}
        </div>
    );
}

export default Register;
