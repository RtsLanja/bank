import {Link} from 'react-router-dom';
import ClientList from "./liste.jsx";
function Home() {
  return <div className=" text-white bg-gray-800">
    <h1 className=" text-blue-200 text-8xl text-center my-3">B<span className=" text-blue-400">a</span><span className=" text-blue-600">n</span><span className=" text-blue-800">k</span></h1>
    <Link to = "/add" className=" bg-green-500 rounded-md text-white uppercase px-10 py-2 my-3 mx-auto w-40 font-semibold flex">Ajouter</Link>
    <p className=" text-4xl font-semibold my-2 mx-10 text-center">Liste des Clients</p>
    <ClientList/>
  </div>
}

export default Home