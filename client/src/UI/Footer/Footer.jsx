import React from 'react';
import Class from './Footer.module.css'
import {Link} from "react-router-dom";

import git from './icons/github.png'
import linkedin from './icons/linkedin.png'
import telegram from './icons/telegram.png'
import tiktok from './icons/tik-tok.png'
import youtube from './icons/youtube.png'
import x from './icons/twitter.png'
import instagram from './icons/instagram.png'

const media = [{icon: git, link: 'https://github.com/JohnnyRock2023'},
    {icon: linkedin, link: 'https://www.linkedin.com/in/roman-kutsenko-36a3a8419/'},{icon: telegram, link: ''},
    {icon: tiktok, link: ''},{icon: youtube, link: ''},
    {icon: x, link: ''},{icon: instagram, link: ''}]

const info = ["About us","Legal terms","Careers","Contacts"]
const help = ["Delivering", "Payment", "Refund"]

const Footer = () => {
    return (
        <div className={Class.footer}>
            <div className={Class.inline}>
                <div className={Class.social_media}>
                    <h3>Our socials</h3>
                    <hr></hr>
                    <div className={Class.social_media__elements}>
                        {media.map(e => <Link className={Class.social_media__element} to={e.link}><img src={e.icon}></img></Link>)}
                    </div>
                </div>
                <ul className={Class.block}>
                    <h3>Information about the company</h3>
                    <hr></hr>
                    {info.map(e => <li className={Class.block__element}><Link className={Class.block__element__link}>{e}</Link></li>)}
                </ul>
                <ul className={Class.block}>
                    <h3>Help</h3>
                    <hr></hr>
                    {help.map(e => <li className={Class.block__element}><Link className={Class.block__element__link}>{e}</Link></li>)}
                </ul>
                <ul className={Class.block}>
                    <h3>For partners</h3>
                    <hr></hr>
                    <li className={Class.block__element}><Link className={Class.block__element__link}>Partnership</Link></li>
                </ul>
            </div>
            <p className={Class.footer__text}>© 2026 JOHNNY'S SHOP Made by Roman Kutsenko aka JohnnyRock</p>
        </div>
    );
};

export default Footer;