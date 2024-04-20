import { useEffect, useState } from "react";
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Update() {
    const [inputs, setInputs] = useState({
        accountNumber: '',
        clientName: '', // Mise à jour pour correspondre au nom dans l'état
        sold: 0,
    });

    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await axios.get('https://localhost/react/api/' + id);
                if (isMounted) {
                    setInputs(response.data);
                }
            } catch (error) {
                console.error('Erreur lors de la récupération des utilisateurs :', error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setInputs({
            ...inputs,
            [name]: value,
        });
    };

    async function updateAccount(Data) {
        try {
            const response = await axios.put('https://localhost/react/api/' + id + '/edit', Data);
            console.log(response.data);
            if(response.data == { status: 0, message: "Ce client existe déja." }){
                alert("Ce client existe déja");
            }
            else{
               navigate('/'); 
            }
            
        } catch (error) {
            console.error('Erreur lors de la mise à jour du compte :', error);
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (!/^\d{10}$/.test(inputs.accountNumber) && inputs.accountNumber !== '') {
            alert('Le numéro de compte doit être une chaîne numérique de 10 caractères.');
            return;
          }
        updateAccount(inputs);
    }

    return (
        <div className="text-white px-10">
            <h1 className="text-blue-200 text-8xl text-center my-3">B<span className="text-blue-400">a</span><span className="text-blue-600">n</span><span className="text-blue-800">k</span></h1>
            <div className="items-center bg-gray-700 rounded-2xl px-10 py-20 h-full my-20">
                <h2 className="text-4xl font-semibold my-2 text-center mb-10">Modifier Client</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Numéro de compte"
                        value={inputs.accountNumber}
                        onChange={handleChange}
                        className="bg-gray-800 border-2 border-white flex rounded-xl my-5 w-3/5 h-16 mx-auto"
                        name="accountNumber"
                        required
                    />
                    <input
                        type="text"
                        placeholder="Nom du client"
                        value={inputs.clientName}
                        onChange={handleChange}
                        className="bg-gray-800 border-2 border-white flex rounded-xl my-5 w-3/5 h-16 mx-auto"
                        name="clientName"
                        required
                    />
                    <input
                        type="number"
                        placeholder="Solde"
                        value={inputs.sold}
                        onChange={handleChange}
                        className="bg-gray-800 border-2 border-white flex rounded-xl my-5 w-3/5 h-16 mx-auto mb-10"
                        name="sold"
                        required
                    />
                    <button type="submit" className="mx-auto flex bg-green-500 rounded-2xl w-40 py-2 uppercase font-semibold my-5 px-10">Modifier</button>
                </form>
            </div>
        </div>
    );
}

export default Update;
