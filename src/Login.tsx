import React, { useEffect, useState } from 'react';
import { auth, signInWithGoogle } from './auth';
import { User } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
   const [user, setUser] = useState<User | null>(null);
   const navigate = useNavigate();

   useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged(user => {
         setUser(user);
         if (user) {
            goToTodo();
         }
      });

      return () => unsubscribe();
   }, [user]);

   const goToTodo = () => {
      navigate('/todo');
   };

   return (
      <div>
         {!user ? (
            <div>
               <p>Log in</p>
               <button onClick={signInWithGoogle}>Sign in with Google</button>
            </div>
         ) : (
            <div></div>
         )}
      </div>
   );
};

export default Login;
// import React, { KeyboardEventHandler, useState } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
// import { auth } from './firbase';

// interface User {
//    id: string;
//    password: string;
// }

// const Login = () => {
//    const [userId, setUserId] = useState<string>('');
//    const [userPassword, setUserPassword] = useState<string>('');
//    const [userData, setUserData] = useState(null);
//    const navigate = useNavigate();

//    const test: User = {
//       id: 'test',
//       password: 'test',
//    };

//    const goToLogin = () => {
//       navigate('/');
//    };

//    const goToTodo = () => {
//       navigate('./todo');
//    };

//    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
//       if (userId === '' || userPassword === '') {
//          alert('Enter your Id or Password');
//          return;
//       }
//       if (userId === test.id && userPassword === test.password) {
//          goToTodo();
//       } else {
//          goToLogin();
//          alert('Check your ID or password');
//          setUserId('');
//          setUserPassword('');
//       }
//    };

//    const onKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
//       if (e.key === 'Enter') {
//          onSubmit(e);
//       }
//    };

//    const signInWithGoogle = () => {
//       const provider = new GoogleAuthProvider();
//       signInWithPopup(auth, provider)
//          .then(data => {
//             setUserId(data.operationType); // TODO: check
//          })
//          .catch(err => {
//             console.log(err);
//          });
//    };

//    return (
//       <div>
//          <form onSubmit={onSubmit} onKeyDown={onKeyDown} name="sub">
//             <input
//                name="userId"
//                value={userId}
//                type="text"
//                placeholder="Enter your ID"
//                onChange={e => setUserId(e.target.value)}
//             />
//             <input
//                name="password"
//                value={userPassword}
//                type="password"
//                placeholder="Enter your password"
//                onChange={e => setUserPassword(e.target.value)}
//             />

//             <button type="submit">Log in</button>
//             <button onClick={signInWithGoogle}>Google</button>
//          </form>
//       </div>
//    );
// };

// export default Login;
