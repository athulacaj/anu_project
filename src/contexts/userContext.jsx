import { createContext } from 'react';
import { auth } from '../common/functions/firebase';

const UserContext = createContext(
    {
        user:auth.currentUser
    }
);

export default UserContext;