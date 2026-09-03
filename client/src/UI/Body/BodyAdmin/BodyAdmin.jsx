import React, {useEffect} from 'react';
import Class from './BodyAdmin.module.css'
import UserService from "../../../API/UserService";
import useFetching from "../../../Hooks/useFetching";
import Sidebar from "./components/Sidebar/Sidebar";
import Users from "./components/ContentAdmin/Users/Users";
import ItemsAdmin from "./components/ContentAdmin/ItemsAdmin/ItemsAdmin";

const BodyAdmin = () => {

    const [fetchUser, isLoading, user, setUser, error] = useFetching(
        async () => await UserService.getUserData()
    );

    const [selectedOption, setSelectedOption] = React.useState('');

    useEffect(() => {
         fetchUser();
    }, [])

    return (
        <div className={Class.bodyAdmin}>
            {user && (user?.role === 'admin' || user?.role === 'super') ?
                <>
                    <Sidebar options={['Users', 'Items']} option={selectedOption} setOption={setSelectedOption}></Sidebar>
                    <div className={Class.contentAdmin}>
                        { selectedOption &&
                            {
                                'Users': <Users></Users>,
                                'Items': <ItemsAdmin></ItemsAdmin>
                            }[selectedOption]
                        }
                    </div>
                </>: <h2>{error && error.toString()}</h2>
            }
        </div>
    );
};

export default BodyAdmin;