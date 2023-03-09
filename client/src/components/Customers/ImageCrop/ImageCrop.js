import { TextField } from '@mui/material';
import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import CropDialog from './CropDialog';

const ImageCrop = () => {
    const { t } = useTranslation();

    const [image, setImage] = useState('');
    const [cars, setCars] = useState({
        id: 1,
        imageUrl: image,
        croppedImageUrl: null
    });

    const [selectedCar, setSelectedCar] = useState(null);
    const onSetImage = (e) => {
        setImage(e.target.value);
        setCars({ ...cars, imageUrl: e.target.value })

    }
    const onCancel = () => {
        setSelectedCar(null);
    }
    const setCroppedImageFor = (id, crop, zoom, aspect, croppedImageUrl) => {
        const newCarsList = [...cars];
        const carIndex = cars.findIndex(x => x.id === id);
        const car = cars[carIndex];
        const newCar = { ...car, croppedImageUrl, crop, zoom, aspect };
        newCarsList[carIndex] = newCar;
        setCars(newCarsList);
        setSelectedCar(null);
    }

    return (
        <div className='imageCard'>

            {
                image ?
                    <CropDialog
                        id={cars.id}
                        imageUrl={cars.imageUrl}
                        cropInit={cars.crop}
                        zoomInit={cars.zoom}
                        aspectInit={cars.aspect}
                        onCancel={onCancel}
                        setCroppedImageFor={setCroppedImageFor
                        }
                    />
                    : null
            }
            <TextField
                margin="dense"
                type="file"
                fullWidth
                variant="outlined"
                value={image}
                error={false}
                helperText={t('select_profile_picture')}
                onChange={onSetImage}
            />
        </div>
    )
}

export default ImageCrop
