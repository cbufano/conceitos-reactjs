import React , {useState , useEffect} from 'react';
import api from './services/api';
import "./styles.css";

function App() {
  const [projects, setProjects] = useState([]);
  

  useEffect(() => {
    api.get('/repositories').then(response => {
        setProjects(response.data);
    })
  },[]);


  async function handleAddRepository() {
    const response = api.post('repositories',{
      title:`Novo projeto ${Date.now()}`,
      owurl:"http://github/cbufano",
      techs:["nodejs","react","reactnative"],
      likes: 0
    })
    const newrecord = (await response).data;
    setProjects( [...projects,newrecord]);

  }

  async function handleRemoveRepository(id) {
    // TODO
    console.log("Deletando "  + id);
    api.delete(`repositories/${id}`); 
    const repositoriIndex = projects.findIndex(projects => projects.id === id );
    projects.splice(repositoriIndex,1);
    setProjects( [...projects]);
  }

  return (
    
    <div>
      <ul data-testid="repository-list">
         {projects.map(project => <li key={project.id}>{project.title}
         <button onClick={() => handleRemoveRepository(project.id)}>Remover</button>
         </li>)}
      </ul>
     <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
