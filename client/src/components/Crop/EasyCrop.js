import { Dialog, DialogContent, Slider } from "@mui/material";
import React, { useState } from "react";
import Cropper from 'react-easy-crop';

const EasyCrop = ({ image }) => {

  const [crop, setCrop] = useState({ x: 10, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  console.log('Image: ', image)
  return (
    <Dialog open={true} fullWidth>
      <DialogContent>
        <div className="App">
          <header className="App-header">
            <div className="crop-container">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                zoomSpeed={4}
                maxZoom={3}
                zoomWithScroll={true}
                showGrid={true}
                aspect={4 / 3}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onRotationChange={setRotation}
              />
            </div>
            <div className="controls">
              <label>
                Zoom
                <Slider
                  value={zoom}
                  min={1}
                  max={3}
                  step={0.1}
                  aria-labelledby="zoom"
                  onChange={(e, zoom) => setZoom(zoom)}
                  className="range"
                />
              </label>
            </div>
          </header>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default EasyCrop;
