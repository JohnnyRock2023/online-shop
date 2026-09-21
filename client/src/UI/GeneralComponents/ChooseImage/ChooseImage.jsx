import {useEffect, useRef, useState} from 'react';
import Class from './ChooseImage.module.css'
import defaultItem from '../../../DefaultImages/default-item.png'
import Uploads from "../../../API/Uploads";

const ChooseImage = ({setImage, defaultImage, className}) => {

    let clsName = [Class.chooseImage]

    if (className) {
        clsName.push(className)
    }

    const [preview, setPreview] = useState(null);

    const handleChooseImage = (e) => {
        setImage(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }
    return (
        <div className={clsName.join(' ')}>
            <img className={Class.chooseImage__image} src={preview ? Uploads.getImageLink(preview): defaultImage} alt={preview ? preview: defaultItem} />
            <input className={Class.chooseImage__input} type='file' accept="image/*" onChange={handleChooseImage}/>
        </div>
    );
};

export default ChooseImage;