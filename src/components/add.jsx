import Form from "./Form"
function Add () {

    return <>
        <div className="text-white px-10 ">
            <h1 className=" text-blue-200 text-8xl text-center my-3">B<span className=" text-blue-400">a</span><span className=" text-blue-600">n</span><span className=" text-blue-800">k</span></h1>
            <div className="items-center bg-gray-700 rounded-2xl px-10 py-20 h-full my-20">
                <h2 className="text-4xl font-semibold my-2 text-center mb-10">Ajouter Nouveau Client</h2>
                <Form/>
            </div>
            
        </div>
    </>
    
}
export default Add