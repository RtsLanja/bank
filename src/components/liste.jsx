import axios from "axios";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import Histogramme from "./graph";
function ClientList() {
  const [clients,setClients] = useState([]);
  const [datas,setDatas] = useState([]);
  useEffect(() =>  {
    getClients();
    getSold();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  async function getClients () {  
    try {
      const response = await axios.get('http://localhost/react/api/');
      // Gérer la réponse réussie
      console.log(response.data);// En supposant que data soit la clé dans la réponse
      setClients(response.data);
    } catch (error) {
      // Gérer les erreurs réseau ou autres
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      // Afficher un message d'erreur à l'utilisateur (facultatif)
    }
  }
  const convertirEnTableau = (objet) => {
    const tableauData = [];

    for (const [key, value] of Object.entries(objet)) {
      tableauData.push({ name: key, value });
    }

    return tableauData;
  };
  async function getSold () {  
    try {
      const response = await axios.get('http://localhost/react/api/sold');
      // Gérer la réponse réussie
      console.log(response.data);// En supposant que data soit la clé dans la réponse
      const sold = convertirEnTableau(response.data);
      setDatas(sold);
    } catch (error) {
      // Gérer les erreurs réseau ou autres
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      // Afficher un message d'erreur à l'utilisateur (facultatif)
    }
  }
  const deleteUser = (id) => {
    try {
        axios.delete('https://localhost/react/api/'+id+'/delete').then(function(response){
        console.log(response.data);
        getClients();
      })
    } catch (error) {
      // Gérer les erreurs réseau ou autres
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      // Afficher un message d'erreur à l'utilisateur (facultatif)
    }
  }
    return (
      <div>
        <table className=" w-11/12 text-xl text-center mx-aut
  // eslint-disable-next-line react-hooks/exhaustive-depso">
          <thead>
            <tr>
              <th>Numero de Compte</th>
              <th>Nom</th>
              <th>Solde</th>
              <th>Observation</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {clients.map((client, key) => 
              <tr key = {key}>
                <td>{client.accountNumber}</td>
                <td>{client. clientName}</td>
                <td>{client.sold}$</td>
                <td>{client.obs}</td>
                <td className="flex justify-center">  
                  <Link to={'client/'+client.id+'/edit'} className=" bg-blue-500 rounded-md text-white uppercase px-6 py-2 my-3 m-1 w-28 font-semibold flex text-xs text-center">Modifier</Link>
                  <button onClick={() => deleteUser(client.id)} className=" bg-red-500 rounded-md text-white uppercase px-5 py-2 my-3 mx-1 w-28 font-semibold flex text-xs text-center">Supprimer</button> 
                </td>
              </tr>
              
            )}
          </tbody>
        </table>
        <div className="flex text-xl items-center justify-center my-5">
          {datas.map((data, key) => 
            <div key={key} className=" w-40 mx-5 bg-emerald-400 rounded-md text-center  h-20 items-center py-5">
              <h1 className=" text-2xl uppercase font-bold">{data.name}</h1>
              <p>{data.value}</p>
            </div>
          )}
        </div>
        <h2 className=" text-4xl font-semibold my-2 mx-10 text-center"> Histogramme</h2>
        <Histogramme data={datas}/>
      </div>
    );
  }
  
  export default ClientList;