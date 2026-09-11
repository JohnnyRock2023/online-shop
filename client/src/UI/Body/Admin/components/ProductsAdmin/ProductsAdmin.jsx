import React, {useEffect} from 'react';
import Class from './ProductsAdmin.module.css'
import LabelInput from "../../../../GeneralComponents/FIELDS/LabelInput/LabelInput";
import LabelTextArea from "../../../../GeneralComponents/FIELDS/LabelTextArea/LabelTextArea";
import CustomButton from "../../../../GeneralComponents/CustomButton/CustomButton";
import ProductService from "../../../../../API/ProductService";
import Message from "../../../../Modals/Message/Message";
import ChooseImage from "../../../../GeneralComponents/ChooseImage/ChooseImage";
import {handleRequest} from "../../../../../utils/handleRequest";
import Search from "../../../../GeneralComponents/Search/Search";
import defaultItem from '../../../../../DefaultImages/default-item.png'

const ProductsAdmin = () => {
    const [item, setItem] = React.useState(null);

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [description, setDescription] = React.useState("");
    const token = localStorage.getItem("token");

    const [visible, setVisible] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const [image, setImage] = React.useState("");


    useEffect(() => {
        if (item) {
            setImage(item.image)
            setName(item.name);
            setPrice(item.price);
            setDescription(item.description);
        }
    }, [item]);

    const addItem = async () => {
        const formData = new FormData();
        if (image) {
            formData.append("image", image);
        }
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);

        setVisible(true);
        const {data, error} = await handleRequest(async () => await ProductService.addItem(token, formData));
        if (!error) {
            setMessage('A new item has been added successfully!');
        }
        else {
            setMessage('Something went wrong!');
        }
    }

    const updateItem = async () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);

        if (image) {
            formData.append("image", image);
        }

        setVisible(true);
        const {data, error} = await handleRequest(async () => await ProductService.changeItem(token, item.id, formData))
        if (!error) {
            setMessage('The item has been updated!');
        }
        else {
            setMessage('Something went wrong!');
        }
    }

    const deleteItem = async () => {
        setVisible(true);
        const {data, error} = await handleRequest(async () => await ProductService.deleteItem(token, item.id));
        if (!error) {
            setMessage('The item has been deleted!');
        }
        else {
            setMessage('Something went wrong!');
        }

    }

    const clearFields = () => {
        setItem(null);
        setName("");
        setPrice("");
        setImage("")
        setDescription("");
    }

    return (
        <div className={Class.itemsAdmin}>
            <Message message={message} visible={visible} setVisible={setVisible}></Message>
            <Search fetch={ProductService.searchProducts} setItem={setItem} className={Class.search} />
            <div className={Class.content}>
                <div className={Class.itemData}>
                    <ChooseImage setImage={setImage} defaultImage={defaultItem}></ChooseImage>
                    <LabelInput label="Name" value={name} onChange={e => setName(e.target.value)}/>
                    <LabelInput label="Price" type='number' value={price} onChange={e => setPrice(e.target.value)}/>
                    <LabelTextArea label="Description" value={description} setValue={setDescription}/>
                </div>

                {item &&
                    <div className={Class.buttons}>
                        <CustomButton className={Class.saveBtn} onClick={updateItem}>Save</CustomButton>
                        <CustomButton className={Class.delBtn} onClick={deleteItem}>Delete</CustomButton>
                    </div>
                }

                {!item &&
                    <div className={Class.buttons}>
                        <CustomButton className={Class.saveBtn} onClick={addItem}>Add item</CustomButton>
                        <CustomButton className={Class.delBtn} onClick={clearFields}>Clear</CustomButton>
                    </div>
                }

                {item && <CustomButton className={Class.newItemBtn} onClick={clearFields}>Create a new item</CustomButton>}
            </div>
        </div>
    );
};

export default ProductsAdmin;