import React, { useState } from 'react'; 
import { askQuestion } from '../../../services/Service'; // Importer le service
import './Question.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams } from 'react-router-dom';
function Question() {
    const [question, setQuestion] = useState(''); // État pour gérer la question
    const [error, setError] = useState(''); // État pour gérer les erreurs
    const [loading, setLoading] = useState(false); // État pour gérer l'état de chargement
    const { userId } = useParams();
    const handleSubmit = async (e) => {
        e.preventDefault(); // Empêche la soumission du formulaire par défaut

        // Validation de la question
        if (question.trim() === '') {
            setError('La question ne peut pas être vide');
            toast.warning('La question ne peut pas être vide')
            return;
        }

        setLoading(true); // Activer le chargement
        setError(''); // Réinitialiser l'erreur

        try {
            const id = userId
            
            // Appeler la fonction du service pour envoyer la question
            const response = await askQuestion(userId, question);

            if (response.success) {
                console.log('Question soumise :', question);
                setQuestion(''); // Réinitialiser le champ de question après soumission réussie
                toast.success('Votre question a été posée avec succès!');
                
            }
        } catch (error) {
            setError(error.message || 'Erreur lors de la soumission de la question');
            toast.error(error.message )
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='container'>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="question"
                    id="question"
                    placeholder="Posez votre question"
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                />
                <button className='button' type="submit" disabled={loading}>
                    {loading ? 'Envoi en cours...' : 'Posez la question'}
                </button>
            </form>

            {/* {error && <p className="error">{error}</p>}  */}

        </div>
    );
}

export default Question;
