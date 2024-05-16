import React, { useEffect, useState } from 'react';
import { getDatabase, ref, push, onValue, remove, update, set } from 'firebase/database';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

interface TodoType {
   id: number;
   text: string;
}

const Lists = () => {
   const [inputTodo, setInputTodo] = useState('');
   const [todos, setTodos] = useState<TodoType[]>([]);
   const [nextId, setNextId] = useState(0);
   const navigate = useNavigate();
   const auth = getAuth(); // Firebase 인증 객체 가져오기
   const userId = auth.currentUser?.uid; // 사용자의 고유 식별자

   useEffect(() => {
      if (!userId) return;
      const dbRef = ref(getDatabase(), `users/${userId}/todo`);
      onValue(dbRef, snapshot => {
         const data = snapshot.val();
         if (data) {
            setTodos(Object.values(data));
            setNextId(Object.keys(data).length);
         } else {
            setTodos([]);
            setNextId(0);
         }
      });
   }, [userId]);

   const handleAddTodo = () => {
      if (inputTodo !== '') {
         const newTodo = {
            id: nextId,
            text: inputTodo,
         };
         const id = nextId;
         set(ref(getDatabase(), `users/${userId}/todo/${id}`), newTodo)
            .then(() => {
               setNextId(prevId => prevId + 1);
               setInputTodo('');
            })
            .catch(error => console.error('An error occurred while adding', error));
      } else {
      }
   };

   const handleDeleteTodo = (id: number) => {
      const todosRef = ref(getDatabase(), `users/${userId}/todo/${id}`);
      remove(todosRef)
         .then(() => {
            const deleteTodo = todos.filter(todo => todo.id !== id);
            setTodos(deleteTodo);
            // alert('Delete completed successfully');
         })
         .catch(error => console.error('An error occurred while deleting', error));
   };

   const handleUpdateTodo = (id: number) => {
      const updatedName = prompt('Enter new text');
      if (updatedName !== null && updatedName !== '') {
         const todoRef = ref(getDatabase(), `users/${userId}/todo/${id}`);
         update(todoRef, { text: updatedName })
            .then(() => {
               const updatedTodos = todos.map(todo => {
                  if (todo.id === id) {
                     return { ...todo, text: updatedName };
                  }
                  return todo;
               });
               setTodos(updatedTodos);
               //  alert('Update completed successfully');
            })
            .catch(error => console.error('An error occurred while updating', error));
      } else {
         alert("There's no content. Please fill the content for update");
      }
   };

   const handleLogout = () => {
      const auth = getAuth();
      signOut(auth)
         .then(() => {
            navigate('/');
         })
         .catch(error => console.error('An error occurred while logging out', error));
   };

   const today = new Date();
   const year = today.getFullYear();
   const month = today.getMonth() + 1;
   const day = today.getDay();
   return (
      <div>
         <p>{`${year}/${month}/${day}`}</p>
         <input value={inputTodo} onChange={e => setInputTodo(e.target.value)} />
         <button onClick={handleAddTodo}>Add</button>
         <button onClick={handleLogout}>Sign out</button>
         <ul>
            {todos.map(todo => (
               <li key={todo.id}>
                  {todo.text}
                  <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                  <button onClick={() => handleUpdateTodo(todo.id)}>Update</button>
               </li>
            ))}
         </ul>
      </div>
   );
};

export default Lists;
