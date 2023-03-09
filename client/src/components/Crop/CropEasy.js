import { Button, Dialog, DialogActions, DialogContent, Slider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import getCroppedImg from './utils/cropImage';

const CropEasy = ({ image, setImage, setOpenCrop, openCrop, closeCrop }) => {

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  let aspect = 4 / 4;
  const [rotation, setRotation] = useState(0)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null)
  const cropComplete = (croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels)
  }

  const cropImage = async () => {
    const croppedPhoto = await getCroppedImg(image, croppedAreaPixels, rotation);
    setImage(croppedPhoto);
  }
  const onHandleCrop = () => {
    closeCrop()
  }

  return (
    <Dialog open={openCrop} fullWidth >
      <DialogContent
        sx={{
          background: '#333',
          position: 'relative',
          height: '400px',
          width: 'auto',
          minWidth: { sm: '500px' }
        }}
      >
        <Cropper
          image={image}
          crop={crop}
          zoom={zoom}
          rotation={rotation}
          aspect={aspect}
          onZoomChange={setZoom}
          onRotationChange={setRotation}
          onCropChange={setCrop}
          onCropComplete={cropComplete}
        />
      </DialogContent>
      <DialogActions sx={{ flexDirection: "column", mx: 3, my: 2 }}>
        <Box sx={{ width: "100%", mb: 1 }}>
          <Typography>Zoom:{zoomPercent(zoom)}</Typography>
          <Slider
            valueLabelDisplay='auto'
            valueLabelFormat={zoomPercent}
            min={1}
            max={3}
            step={0.1}
            value={zoom}
            onChange={(e, zoom) => setZoom(zoom)}
          />
        </Box>
        <Box sx={{ width: "100%", mb: 1 }}>
          <Typography>Rotation:{rotation}</Typography>
          <Slider
            valueLabelDisplay='auto'
            min={0}
            max={360}
            value={rotation}
            onChange={(e, rotation) => setRotation(rotation)}
          />
        </Box>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant='outlined'
            onClick={() => setOpenCrop(false)}
          >
            Cancel
          </Button>
          <Button
            variant='contained'
            onClick={cropImage}
          >
            Crop
          </Button>
          <Button
            variant='contained'
            onClick={onHandleCrop}
          >
            Done
          </Button>
        </Box>
        <Box sx={{ display: 'flex', flexWrap: 'wrap' }} border="1px">
          <img src={image} alt="" />
        </Box>
      </DialogActions>
    </Dialog>
  )
}

export default CropEasy;

const zoomPercent = (value) => {
  return `${Math.round(value * 100)}%`;
}
