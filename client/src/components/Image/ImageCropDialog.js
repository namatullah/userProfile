import { Dialog, DialogContent } from '@mui/material';
import React, { useState, useCallback } from 'react'
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropImage';

import '../../index.css'
const aspectRatios = [
    { value: 4 / 3, text: "4/3" },
    { value: 16 / 9, text: "16/9" },
    { value: 1 / 2, text: "1/2" },
    { value: 4 / 4, text: "4/4" },
]

const ImageCropDialog = ({ id, imageUrl, cropInit, zoomInit, aspectInit, onCancel, setCroppedImageFor }) => {
    if (zoomInit == null) {
        zoomInit = 1;
    }
    if (cropInit == null) {
        cropInit = { x: 0, y: 0 };
    }
    if (aspectInit == null) {
        aspectInit = aspectRatios[0];
    }
    const [zoom, setZoom] = useState(zoomInit)
    const [crop, setCrop] = useState(cropInit)
    const [aspect, setAspect] = useState(aspectInit)
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
    const onCropChange = (crop) => {
        setCrop(crop)
    }
    const onZoomChange = (zoom) => {
        setZoom(zoom)
    }
    const onAspectChange = (e) => {
        const value = e.target.value;
        const ratio = aspectRatios.find((ratio) => ratio.value == value);
        setAspect(ratio);
    }
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }
    const onCrop = async () => {
        const croppedImageUrl = await getCroppedImg(imageUrl, croppedAreaPixels);
        console.log(croppedImageUrl)
        setCroppedImageFor(id, crop, zoom, aspect, croppedImageUrl);
    }
    return (
        <Dialog open={true} fullWidth>
            <DialogContent>
                <div>
                    <div className='crop-container'>
                        <Cropper
                            image={imageUrl}
                            zoom={zoom}
                            crop={crop}
                            aspect={aspect.value}
                            onCropChange={onCropChange}
                            onZoomChange={onZoomChange}
                            onCropComplete={onCropComplete}
                        />
                    </div>
                    <div className='controls'>
                        <div>
                            <select onChange={onAspectChange}>
                                {aspectRatios.map(ratio =>
                                    <option key={ratio.text} value={ratio.value} selected={ratio.value === aspect.value}>
                                        {ratio.text}
                                    </option>)
                                }
                            </select>
                        </div>
                        <div className='button-area'>
                            <button onClick={onCancel}>Cancel</button>
                            <button>Reset</button>
                            <button onClick={onCrop}>Crop</button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default ImageCropDialog
