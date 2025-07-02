// import React, { useState } from 'react';
// import axios from 'axios';
// import './App.css'
// const App = () => {
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [error, setError] = useState('');
//   const [userLink, setUserLink] = useState('');

//   // Fonction pour gérer la soumission du formulaire
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Réinitialiser les erreurs
//     setError('');
//     setUserLink('');

//     // Validation du formulaire
//     if (!name || !phone) {
//       setError('Le nom et le numéro de téléphone sont obligatoires.');
//       return;
//     }

//     try {
//       // Envoi des données à l'API Express
//       const response = await axios.post('http://localhost:3000/register', {
//         name,
//         phone,
//       });

//       if (response.data.success) {
//         // Si l'inscription est réussie, afficher le lien
//         setUserLink(response.data.user.link);
//       }
//     } catch (err) {
//       // Gestion des erreurs
//       if (err.response && err.response.data) {
//         setError(err.response.data.error); // Erreur venant du backend
//       } else {
//         setError('Une erreur est survenue, veuillez réessayer.');
//       }
//     }
//   };

//   return (
//     <div className="App">
//       <h1>Inscription à l'application</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="name">Nom:</label>
//           <input
//             type="text"
//             id="name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="Entrez votre nom"
//           />
//         </div>
//         <div>
//           <label htmlFor="phone">Numéro de téléphone:</label>
//           <input
//             type="text"
//             id="phone"
//             value={phone}
//             onChange={(e) => setPhone(e.target.value)}
//             placeholder="Entrez votre numéro"
//           />
//         </div>
//         <button type="submit">S'inscrire</button>
//       </form>

//       {error && <div className="error">{error}</div>}

//       {userLink && (
//         <div>
//           <h2>Votre lien pour poser une question de manière anonyme :</h2>
//           <a href={`https://wa.me/?text=${encodeURIComponent(userLink)}`} target="_blank" rel="noopener noreferrer">
//             Partager sur WhatsApp
//           </a>
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React from 'react'
import Index from './components/Index/Index'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './components/Register/Register';
import { ToastContainer } from 'react-toastify';
import Inbox from './components/Inbox/Inbox';
import Question from './components/Question/Question';

function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<Index />} />
          <Route path="/Home" element={<Index />} />
          <Route path="/register" element={<Register />} />
           <Route path="/inbox/:userId" element={<Inbox />} />
              <Route path="/Question/:userId" element={<Question />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
