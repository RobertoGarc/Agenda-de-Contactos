import logo from './logo.svg';
import './App.css';
import {useState,useEffect} from 'react';
import { store } from './firebaseConfig';

function App() {
  const[modoEdicion,setModoEdicion]=useState(false);
  const[idUser,setIdUser]=useState('');
  const[name,setName]=useState('');
  const[phone,setPhone]=useState('');
  const[users,setUsers]=useState([]);
  const[error,setError]=useState('');

  const getUsuarios=async()=>{
    const {docs}=await store.collection('agenda').get();
    const nuevoArray = docs.map(item=>({id:item.id, ...item.data()}));
    setUsers(nuevoArray);
    console.log(nuevoArray);
    console.log(users);
  }

  const pulsarActualizarUsuario= async (id) => {
    try {
      const data= await store.collection('agenda').doc(id).get();  
      const {userName,userPhone}=data.data();
      setName(userName);
      setPhone(userPhone);
      setIdUser(id);
      setModoEdicion(true);
    } catch (error) {
      console.log(error);
    }
    
  }

  const setUpdateUsuario=async(e)=>{
    e.preventDefault();
    if(!name.trim()){
      setError("El campo nombre está vacio");
    }
    if(!phone.trim()){
      setError("El campo teléfono está vacio");
    }
    if(!name.trim()&&!phone.trim()){
      setError("Los campos estan vacios");
    }

    const userUpdate={
      userName:name,
      userPhone:phone,
    }

    try {
      await store.collection('agenda').doc(idUser).set(userUpdate);
      alert("Usuario editado")
    } catch (error) {
      console.log(error);
    }
    
    setPhone('');
    setName('');
    setIdUser('');
    setModoEdicion(false);
    getUsuarios();
  }

  const deleteUsuario=async(id)=>{
    try {
      await store.collection("agenda").doc(id).delete();
      getUsuarios();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{
    getUsuarios();
  },[])

  const RegistrarUsuario= async (e)=>{
    e.preventDefault();
    if(!name.trim()){
      setError("El campo nombre está vacio");
    }
    if(!phone.trim()){
      setError("El campo teléfono está vacio");
    }
    if(!name.trim()&&!phone.trim()){
      setError("Los campos estan vacios");
    }

    const user={
      userName:name,
      userPhone:phone,
    }

    try {
      const data = await store.collection('agenda').add(user);
      alert("Usuario añadido")
    } catch (error) {
      console.log(error);
    }
    
    setPhone('');
    setName('');
    getUsuarios();
  }

  return (
    <div className="container body p-5">
      <h1 class="text-center">Agenda de Contactos</h1>
      <div className="row mt-5">
        <div className="col col-md-5 text-center">
          <h2 className="text-center">Registro de Contactos</h2>
          <form onSubmit={modoEdicion?setUpdateUsuario:RegistrarUsuario} className="form-group mt-4">
            <input value={name} onChange={(e)=>{setName(e.target.value)}} type="text" className="form-control" placeholder="Introduce tu nombre"></input>
            <input value={phone} onChange={(e)=>{setPhone(e.target.value)}} type="text" className="form-control my-3" placeholder="Introduce tu telefono"></input>
            {
              modoEdicion==true?
              (
                <input type="submit" className="btn btn-dark w-100" value="Editar"></input>
              ):
              (
                <input type="submit" className="btn btn-dark w-100" value="Registrar"></input>
              )
            }
            
          </form>
          {
            error?(
            <div>
              <p className="card mt-3 bg-danger text-white">{error}</p>
            </div>)
            :
            <span></span>
          }
          <img src="./contact-1293388.svg" className="w-50 mt-5"></img>
        </div>
        <div className="col">
          <h2 className="text-center mb-4">Lista de Contactos </h2>
          {
            users.length!==0 ? 
            (
              users.map(item=>(
              <div className="d-flex justify-content-between list-group-item align-items-center mt-" key={item.id}>
                <span>{item.userName} - {item.userPhone}</span>
                <div>
                  <button onClick={(id)=>{pulsarActualizarUsuario(item.id)}} className="btn btn-info mx-3">
                    Editar
                  </button>
                  <button onClick={(id)=>{deleteUsuario(item.id)}} className="btn btn-danger">Borrar</button>
                </div>
              </div>))
            ):
            (
              <span>No hay registros</span>
            )
          }
        </div>
      </div>
    </div>
  );
}

export default App;
