// import * as  from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import "./SpreadProduct.scss";
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { wishlist } from '../../context/slice/wishlistSlice';
import Loading from '../loading';
import { useNavigate } from 'react-router-dom';

const SpreadProduct = ({ data, loading, isAdmin, deleteProduct, setUpdate }) => {
    const wishlistData = useSelector(state => state.wishlist);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleClick = (id) => {
        navigate(`/single-rout/${id}`);
    };
    const handelDelete = (id) => {
        if (!confirm("Malumotni o'chirishga ruxsat berasizmi")) return
        deleteProduct(id)
    }
    const handleWishlistClick = (e, product) => {
        e.stopPropagation();
        dispatch(wishlist(product));
    };

    const products = data?.map((product) => (
        <Card key={product.id} sx={{ backgroundColor: `#2B3844`, color: "#fff" }} className='spread-product__card' >
            <CardMedia
                onClick={() => handleClick(product.id)}
                className='spread-product__image-box'
                sx={{ height: 200, objectFit: 'contain' }}
                image={product.images}
                title={product.title}
            >
                <button
                    onClick={(e) => handleWishlistClick(e, product)}
                    className='spread-product__wishlist-btn'>
                    {wishlistData.some((el) => el.id === product.id) ?
                        <FaHeart /> :
                        <FaRegHeart />
                    }
                </button>
            </CardMedia>
            <CardContent >
                <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" >
                    <p style={{ color: "#fff" }}><span style={{ color: "#fff" }}>Price:</span>{product.price}</p>
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    <p style={{ color: "#fff" }}><span style={{ color: "#fff" }}>Category:</span>{product.category}</p>
                </Typography>
            </CardContent>
            <CardActions>
                {isAdmin && (
                    <>
                        <Button size="small" onClick={() => handelDelete(product.id)}>Delete</Button>
                        <Button size="small" onClick={() => setUpdate(product)}>Edit</Button>
                    </>
                )}
                {!isAdmin && (
                    <>
                        <Button size="small" onClick={() => handleClick(product.id)}>Share</Button>
                        <Button size="small" onClick={() => handleClick(product.id)}>Learn More</Button>
                    </>
                )}
            </CardActions>
        </Card>
    )).reverse()

    return (
        <div className="spread-product__cards">
            {loading ? <Loading /> : products}
        </div>
    );
};

SpreadProduct.propTypes = {
    data: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        images: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        price: PropTypes.string.isRequired,
        category: PropTypes.string.isRequired,
    })).isRequired,
    loading: PropTypes.bool,
    isAdmin: PropTypes.bool,
    deleteProduct: PropTypes.func
};

export default SpreadProduct;
