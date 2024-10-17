import { useState } from 'react';
import {FiSearch} from 'react-icons/fi';
import './style.css';
import api from './servives/api';

function App() {

  const [input,setInput] = useState('')
  const [cep, setCep] = useState('')

  async function handleSeach(){
    

   if(input == "")
    {
      alert('Preencha algum cep')
      return;
     }

     try{

      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")
      console.log(response.data)

     }catch{

      alert('Ops...Erro ao buscar')
      setInput('')

     }
  }

  return (
    <div className="container">
        <h1 className="title">Buscador Cep</h1>

        <div className="containerInput">
          <input
          type="text"
          placeholder="Digite o seu cep..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          />

          <button className="buttonSearch" onClick={handleSeach}>
            <FiSearch size={25} color="#FFF"/>
          </button>
  
        </div>

        {Object.keys(cep).length > 0 && (
          <main className='main'>
             <h2>CEP: {cep.cep}</h2>

             <span>Logradouro: {cep.logradouro}</span>
             <span>Complemento: {cep.complemento}</span>
             <span>Bairro: {cep.bairro}</span>
             <span>Cidade: {cep.localidade} - {cep.uf}</span>
          </main>
        )}
                
       
    </div>
  );
}

export default App;
