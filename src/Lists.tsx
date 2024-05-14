import React, { useEffect, useId, useState } from 'react';
import { auth, signInWithGoogle } from './auth';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

interface todoList {
   id: Number;
   text: string;
}

function Lists() {
   const [inputTodo, setInputTodo] = useState(''); //입력 값
   const [todos, setTodos] = useState<todoList[]>([]); //Todo의 리스트 값
   const [nextId, setNextId] = useState(0); //다음 id 값

   const id = useId();

   //입력 값
   const inputChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputTodo(e.target.value);
   };

   //입력 된 내용 추가
   const addTodo = () => {
      if (inputTodo !== '') {
         const newTodo: todoList = {
            id: nextId,
            text: inputTodo,
         };
         setTodos([...todos, newTodo]); //newTodo 값 추가
         setNextId(nextId + 1); // 다음 id 값 업데이트
         setInputTodo(''); // 입력창 초기화
      } else {
         alert('Please fill the content');
      }
   };

   //입력된 값 삭제
   const removeChange = (id: number) => {
      const removed = todos.filter(todo => id !== todo.id);
      setTodos(removed); //입력 값
   };

   //내용 업데이트
   const updateChange = (id: number) => {
      const updatedName = prompt('Content to Change');
      if (updatedName !== null && updatedName !== '') {
         setTodos(todos.map(item => (item.id === id ? { ...item, text: updatedName } : item)));
      } else {
         alert("There's no content. Please fill the content for update");
      }
   };

   const [user, setUser] = useState<User | null>(null);

   const navigate = useNavigate();

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         setUser(user);
         if (!user) {
            toLoginForm();
         }
      });

      return () => unsubscribe();
   }, [user]);

   const toLoginForm = () => {
      navigate('/');
   };
   return (
      <div>
         <p>Todo</p>
         <input value={inputTodo} onChange={inputChanged} />
         <button onClick={addTodo}>Add</button>
         <ul>
            {todos.map(item => (
               <li key={item.id.toString()}>
                  {item.text}
                  <button onClick={() => updateChange(Number(item.id))}>update</button>
                  <button onClick={() => removeChange(Number(item.id))}>delete</button>
               </li>
            ))}
         </ul>

         <div>
            {user ? (
               <div>
                  <button onClick={() => auth.signOut()}>Sign Out</button>
               </div>
            ) : (
               <div></div>
            )}
         </div>
      </div>
   );
}

export default Lists;
