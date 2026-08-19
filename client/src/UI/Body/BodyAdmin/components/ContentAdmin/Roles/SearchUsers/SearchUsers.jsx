import React, {useEffect, useMemo} from 'react';
import Class from './SearchUsers.module.css'
import UserService from "../../../../../../../API/UserService";
import SearchUsersItem from "./SearchUsersItem/SearchUsersItem";

const SearchUsers = ({user, setUser}) => {
    const [search, setSearch] = React.useState('');
    const [allUsers, setAllUsers] = React.useState([]);
    const [visible, setVisible] = React.useState(true);
    const token = localStorage.getItem('token');

    useEffect(() => {
        const getAllUsers = async () => {
            const res = await UserService.getAllUsers(token)
            setAllUsers(res)
        }
        getAllUsers()
    }, []);

    const cachedItems = useMemo(() => {
        if (search !== '') {
            const filteredUsers = allUsers.filter(user => user.name.toLowerCase().includes(search.toLowerCase()))
            console.log(allUsers)
            return filteredUsers
        }
    }, [search])

    const pickUser = (user) => {
        setUser(user);
        setVisible(false);
    }

    return (
        <div className={Class.searchUsers}>
            <div className={Class.searchBar}>
                <input className={Class.searchBar__input} type='text' value={search} onChange={e=> setSearch(e.target.value)} onClick={()=> setVisible(true)} placeholder="Enter username..." ></input>
                <button className={Class.searchBar__button}></button>
            </div>
            {search && visible ?
                <div className={Class.searchResults}>
                    {cachedItems.map((user) => <SearchUsersItem user={user} onClick={() => pickUser(user)} ></SearchUsersItem>)}
                </div>
                :
                <></>}

        </div>
    );
};

export default SearchUsers;