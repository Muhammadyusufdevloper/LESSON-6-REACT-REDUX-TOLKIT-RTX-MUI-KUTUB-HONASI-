import { useParams } from "react-router-dom";
import { useSingleProductQuery } from "../../context/api/productsApi";
import { useEffect } from "react";
import "./Single.scss";
import { Card, CardContent, CardMedia, Typography } from "@mui/material";

const Single = () => {
    const { id } = useParams();
    const { data, isLoading } = useSingleProductQuery(id);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    if (isLoading) {
        return (
            <section className='single-rout'>
                <div className='container'>
                    <div className='single-rout__wrapper'>
                        <div className='single-rout__loading-wrapper'>
                            <div className='single-rout__loading-images-boxes'>
                                <div className='single-rout__loading-base-img-card loading__animation'></div>
                            </div>
                            <div className='single-rout__loading-info-boxes'>
                                <div className='loading__animation'></div>
                                <div className='loading__animation'></div>
                                <div className='loading__animation'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className='single-rout'>
            <div className='container'>
                <Card sx={{display:"flex",gap:2,justifyContent:"space-between",backgroundColor:"transparent" ,color:"#fff"}} >
                    <CardMedia
                        component="img"
                        height="250"
                        width="300"
                        image={data?.images}
                        alt={data?.title}
                        sx={{ objectFit: 'contain' }}
                    />
                    <CardContent sx={{width:2000}}>
                        <Typography gutterBottom variant="h5" component="div">
                            {data?.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{color:"#fff"}}>
                            <span>Price:</span> {data?.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{color:"#fff"}}>
                            <span>Category:</span> {data?.category}
                        </Typography>
                    </CardContent>
                </Card>
            </div>
        </section>
    );
};

export default Single;


