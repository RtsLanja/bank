import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Form() {
  const [inputs, setInputs] = useState({
    accountNumber: '',
    clientName: '',
    sold: 0, // Initialiser à 0 pour un champ numérique
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    // Valider l'entrée pour le champ "sold"
    if (name === 'sold' && isNaN(value)) {
      alert('Veuillez entrer un nombre pour "Vendu".');
      return;
    } 
    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  async function createAccount(data) {
    try {
      axios.post('https://localhost/react/api/save', data)
      .then(response => {
        console.log('Requête POST réussie:', response.data);
        if(response.data == { status: 0, message: "Ce client existe déja." }){
          alert("Ce client existe déja");
        }
        else {
          navigate('/');
        }
        // Gérer la réponse réussie ici (par exemple, mettre à jour l'interface utilisateur)
      })
      .catch(error => {
        console.error('Erreur de requête POST:', error);
        // Gérer l'erreur ici (par exemple, afficher un message d'erreur à l'utilisateur)
      });
    } catch (error) {
      console.error('Erreur réseau ou autre :', error);
      // Afficher un message d'erreur générique à l'utilisateur
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!/^\d{10}$/.test(inputs.accountNumber) && inputs.accountNumber !== '') {
      alert('Le numéro de compte doit être une chaîne numérique de 10 caractères.');
      return;
    }
    console.log(inputs); // Journaliser l'objet inputs avant l'envoi
    createAccount(inputs);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Numéro de compte"
        onChange={handleChange}
        className="bg-gray-800 border-2 border-white flex rounded-xl my-5 w-3/5 h-16 mx-auto"
        name="accountNumber"
        required
      />
      <input
        type="text"
        placeholder="Nom du client"
        onChange={handleChange}
        className="bg-gray-800 border-2 border-white flex rounded-xl my-5 w-3/5 h-16 mx-auto"
        name="clientName"
        required
      />
      <input
        type="number"
        placeholder="Solde"
        onChange={handleChange}
        className="bg-gray-800 border-2 border-white flex rounded-xl my-5 w-3/5 h-16 mx-auto mb-10"
        name="sold"
        required
      />
      <button
        type="submit"
        className="mx-auto flex bg-green-500 rounded-2xl w-40 py-2 uppercase font-semibold my-5 px-10"
      >
        Ajouter
      </button>
    </form>
  );
}

export default Form;
