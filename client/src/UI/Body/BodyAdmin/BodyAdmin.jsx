import React, {useEffect} from 'react';
import Class from './BodyAdmin.module.css'
import UserService from "../../../API/UserService";
import useFetching from "../../../Hooks/useFetching";
import Sidebar from "./components/Sidebar/Sidebar";
import ContentAdmin from "./components/ContentAdmin/ContentAdmin";
import Users from "./components/ContentAdmin/Users/Users";
import ItemsAdmin from "./components/ContentAdmin/ItemsAdmin/ItemsAdmin";

const BodyAdmin = () => {

    const [fetchUser, isLoading, user, error] = useFetching(
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
                    <Sidebar option={selectedOption} setOption={setSelectedOption}></Sidebar>
                    <ContentAdmin>
                        { selectedOption &&
                            {
                                'Users': <Users></Users>,
                                'Items': <ItemsAdmin></ItemsAdmin>
                            }[selectedOption]
                        }
                    </ContentAdmin>
                </>: <>{error && error.toString()}</>}
        </div>
    );
};

export default BodyAdmin;