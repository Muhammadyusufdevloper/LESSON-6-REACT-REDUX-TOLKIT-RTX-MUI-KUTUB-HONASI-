import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField'; // Importing TextField component for inputs
import "./Modal.scss";
import { useUpdateProductMutation } from '../../context/api/productsApi';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function TransitionsModal({ data, setUpdate }) {

    const [open, setOpen] = React.useState(data);
    const { id, title, images, category, price } = data; // Adding id to the destructuring
    const [updatedTitle, setUpdatedTitle] = React.useState(title);
    const [updatedImage, setUpdatedImage] = React.useState(images);
    const [updatedPrice, setUpdatedPrice] = React.useState(price);
    const [updatedCategory, setUpdatedCategory] = React.useState(category);
    const [updateProduct, { isSuccess }] = useUpdateProductMutation();

    const handleClose = () => {
        setOpen(false);
        setUpdate(null);
    };

    React.useEffect(() => {
        if (isSuccess) {
            handleClose();
        }
    }, [isSuccess]);

    const handleSave = () => {
        const updatedData = {
            id: id, // Include id in the updated data
            title: updatedTitle,
            images: updatedImage,
            price: updatedPrice,
            category: updatedCategory,
        };
        updateProduct(updatedData); // Pass updatedData directly to the mutation
    };

    return (
        <div>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <Box className="modal-content" sx={style}>
                        <Typography id="transition-modal-title" variant="h6" component="h2">
                            Update product
                        </Typography>
                        <Box>
                            <TextField
                                id="title"
                                label="Title"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={updatedTitle}
                                onChange={(e) => setUpdatedTitle(e.target.value)}
                            />
                            <TextField
                                id="image"
                                label="Image URL"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={updatedImage}
                                onChange={(e) => setUpdatedImage(e.target.value)}
                            />
                            <TextField
                                id="price"
                                label="Price"
                                type="number"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={updatedPrice}
                                onChange={(e) => setUpdatedPrice(e.target.value)}
                            />
                            <TextField
                                id="category"
                                label="Category"
                                variant="outlined"
                                fullWidth
                                margin="normal"
                                value={updatedCategory}
                                onChange={(e) => setUpdatedCategory(e.target.value)}
                            />
                        </Box>
                        <Button onClick={handleSave}>Save</Button>
                        <Button onClick={handleClose}>Cancel</Button>
                    </Box>
                </Fade>
            </Modal>
        </div>
    );
}
