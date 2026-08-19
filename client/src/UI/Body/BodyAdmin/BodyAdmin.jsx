import React, {useEffect} from 'react';
import Class from './BodyAdmin.module.css'
import UserService from "../../../API/UserService";
import useFetching from "../../../Hooks/useFetching";
import Sidebar from "./components/Sidebar/Sidebar";
import ContentAdmin from "./components/ContentAdmin/ContentAdmin";
import Users from "./components/ContentAdmin/Roles/Users";
import ItemsAdmin from "./components/ContentAdmin/ItemsAdmin/ItemsAdmin";

const BodyAdmin = () => {

    const [user, setUser] = React.useState(null);

    const [fetchUser, isLoading, error] = useFetching(async () => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = await UserService.getUserData(token);
            setUser(user);
        }
    });

    const [selectedOption, setSelectedOption] = React.useState('');


    useEffect(() => {
        const fetchUserData = async () => {
            await fetchUser()
        }
        fetchUserData()
    }, [])



    return (
        <div className={Class.bodyAdmin}>
            {user && (user.role === 'admin' || user.role === 'super') ?
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
                </>: <></>}
        </div>
    );
};

export default BodyAdmin;