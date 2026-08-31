import React, {useEffect} from 'react';

import UserContext from "../Context/UserContext";
import useFetching from "../Hooks/useFetching";
import UserService from "../API/UserService";

const UserProvider = ({children}) => {

    const [fetchUser, isLoading, user, setUser, error] = useFetching(
        async () => await UserService.getUserData()
    )

    useEffect( () => {
        if (localStorage.getItem('token')) {
            fetchUser();
        }
    }, [])

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;