import React, { useState } from 'react';
import image1 from './image/download.png'
import image2 from './image/download.jpeg'
import '../../index.css'
import ImageCropDialog from './ImageCropDialog';

const initData = [
    {
        id: 1,
        imageUrl: image1,
        croppedImageUrl: null
    },
    {
        id: 2,
        imageUrl: image2,
        croppedImageUrl: null
    },
];
const Image = () => {
    const [cars, setCars] = useState(initData);
    const [selectedCar, setSelectedCar] = useState(null);
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
                selectedCar ?
                    <ImageCropDialog
                        id={selectedCar.id}
                        imageUrl={selectedCar.imageUrl}
                        cropInit={selectedCar.crop}
                        zoomInit={selectedCar.zoom}
                        aspectInit={selectedCar.aspect}
                        onCancel={onCancel}
                        setCroppedImageFor={setCroppedImageFor
                        }
                    />
                    : null
            }
            {cars.map((car) => (
                <div key={car.id}>
                    <img
                        src={car.croppedImageUrl ? car.croppedImageUrl : car.imageUrl}
                        alt=""
                        onClick={() => setSelectedCar(car)}
                    />
                </div>
            ))}
        </div>
    )
}

export default Image