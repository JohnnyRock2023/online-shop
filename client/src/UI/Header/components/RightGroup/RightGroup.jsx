import React from 'react';
import Class from './RightGroup.module.css'
import CartHeader from "./CartHeader/CartHeader";
import ProfileHeader from "./ProfileHeader/ProfileHeader";

const RightGroup = ({setVisible}) => {
    return (
        <div className={Class.rightGroup}>
            <CartHeader setVisible={setVisible}></CartHeader>
            <ProfileHeader></ProfileHeader>
        </div>
    );
};

export default RightGroup;