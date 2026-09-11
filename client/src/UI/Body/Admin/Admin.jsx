import React, {useEffect} from 'react';
import Class from './Admin.module.css'
import UserService from "../../../API/UserService";
import useFetching from "../../../Hooks/useFetching";
import Users from "./components/Users/Users";
import ProductsAdmin from "./components/ProductsAdmin/ProductsAdmin";
import Sidebar from "../../GeneralComponents/Sidebar/Sidebar";

const Admin = () => {

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
                                'Items': <ProductsAdmin></ProductsAdmin>
                            }[selectedOption]
                        }
                    </div>
                </>: <h2>{error && error.toString()}</h2>
            }
        </div>
    );
};

export default Admin;