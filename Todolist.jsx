import React, { useState, useEffect} from 'react'; 
import './Todolist.css'; 
import icon from './assets/imagem3.png';


function Todolist() {
    const listaStorage = localStorage.getItem('lista');
    const [lista, setlista] = useState(listaStorage ? JSON.parse(listaStorage) : []);
    const [novoItem, setNovoItem] = useState("");

    useEffect(() => {
        localStorage.setItem('lista', JSON.stringify(lista));
    }, [lista]);

    function adcionaItem(form) {
        form.preventDefault();
        if (!novoItem) return;
        setlista([...lista, { Text: novoItem, isCompleted: false }]);
        setNovoItem("");
        setTimeout(() => {
            document.getElementById('input-entrada').focus();
        }, 0);
    }

    function clicou(index) {
        const listaAux = [...lista];
        listaAux[index].isCompleted = !listaAux[index].isCompleted;
        setlista(listaAux);
    }

    function deleta(index) {
        const listaAux = [...lista];
        listaAux.splice(index, 1);
        setlista(listaAux);
    }

    function deletaTudo() {
        setlista([]);
    }

    return (
        <div>
            <h1>Lista de Tarefas</h1>
            <form onSubmit={adcionaItem}>
                <input
                    id='input-entrada'
                    type="text"
                    value={novoItem}
                    onChange={(e) => { setNovoItem(e.target.value) }}
                    placeholder="Adicione uma tarefa"
                />
                <button className="add" type="submit">Add</button>
            </form>
            <div className="listadeTarefas">
                <div style={{ textAlign: 'center' }}>
                    {lista.length < 1
                        ? <img className='icon-central' src={icon} />
                        : lista.map((item, index) => (
                            <div key={index} className={item.isCompleted ? "item completo" : "item"}>
                                <span onClick={() => clicou(index)}>{item.Text}</span>
                                <button onClick={() => deleta(index)} className="Del">Deletar</button>
                            </div>
                        ))
                    }
                    {lista.length > 0 &&
                        <button onClick={deletaTudo} className="deleteAll">Deletar Todas</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Todolist;
