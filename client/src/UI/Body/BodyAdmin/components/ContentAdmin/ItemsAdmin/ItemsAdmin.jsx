import React, {useEffect} from 'react';
import Class from './ItemsAdmin.module.css'
import SearchItems from "./SearchItems/SearchItems";
import LabelInput from "../../LabelInput/LabelInput";
import LabelTextArea from "../../LabelTextArea/LabelTextArea";
import CustomButton from "../../../../../Components/CustomButton/CustomButton";
import ItemService from "../../../../../../API/ItemService";
import Message from "../../../../../Modals/Message/Message";
import ChooseImage from "../../ChooseImage/ChooseImage";

const ItemsAdmin = () => {
    const [item, setItem] = React.useState(null);

    const [name, setName] = React.useState("");
    const [price, setPrice] = React.useState("");
    const [description, setDescription] = React.useState("");
    const token = localStorage.getItem("token");

    const [visible, setVisible] = React.useState(false);
    const [message, setMessage] = React.useState("");

    const [image, setImage] = React.useState("default-item.png");


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
        formData.append("image", image);
        formData.append("name", name);
        formData.append("price", price);
        formData.append("description", description);

        setVisible(true);
        const success = await ItemService.addItem(token, formData);
        if (success) {
            setMessage('ListItem has been added successfully!');
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
        const success = await ItemService.changeItem(token, item.id, formData)
        if (success) {
            setMessage('ListItem has been updated!');
        }
        else {
            setMessage('Something went wrong!');
        }
    }

    const deleteItem = async () => {
        setVisible(true);
        const success = await ItemService.deleteItem(token, item.id);
        if (success) {
            setMessage('ListItem has been deleted!');
        }
        else {
            setMessage('Something went wrong!');
        }

    }

    const clearFields = () => {
        setItem(null);
        setName("");
        setPrice("");
        setImage("default-item.png")
        setDescription("");
    }

    return (
        <div className={Class.itemsAdmin}>
            <Message message={message} visible={visible} setVisible={setVisible}></Message>
            <SearchItems item={item} setItem={setItem} />
            <div className={Class.content}>
                <div className={Class.itemData}>
                    <ChooseImage setImage={setImage} defaultImage={image}></ChooseImage>
                    <LabelInput label="Name" value={name} onChange={e => setName(e.target.value)}/>
                    <LabelInput label="Price" type='number' value={price} onChange={e => setPrice(e.target.value)}/>
                    <LabelTextArea label="Description" value={description} onChange={e => setDescription(e.target.value)}/>
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

export default ItemsAdmin;