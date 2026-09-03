import React from 'react';
import Class from './ChooseImage.module.css'
import defaultItem from '..//..//..//..//..//DefaultImages/default-item.png'

const ChooseImage = ({setImage, defaultImage, className}) => {

    let clsName = [Class.chooseImage]

    if (className) {
        clsName.push(className)
    }

    const [preview, setPreview] = React.useState(null);

    const handleChooseImage = (e) => {
        setImage(e.target.files[0]);
        setPreview(URL.createObjectURL(e.target.files[0]));
    }

    return (
        <div className={clsName.join(' ')}>
            <img className={Class.chooseImage__image} src={preview ? preview: defaultImage} alt="preview ? preview: defaultItem" />
            <input className={Class.chooseImage__input} type='file' accept="image/*" onChange={handleChooseImage}/>
        </div>
    );
};

export default ChooseImage;