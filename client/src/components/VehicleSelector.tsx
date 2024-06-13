import React, { useState } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, Typography, Button, Snackbar, Alert } from '@mui/material';


type MODELS_TYPE = {
  [name: string]: {
    [key: string]: string[];
  }
}

const MODELS: MODELS_TYPE = {
  ford: {
    Ranger: ['Raptor', 'Raptor x', 'Wildtrak'],
    Falcon: ['XR6', 'XR6 Turbo', 'XR8'],
    'Falcon Ute': ['XR6', 'XR6 Turbo'],
  },
  bmw: {
    '130d': ['xDrive 26d', 'xDrive 30d'],
    '240i': ['xDrive 30d', 'xDrive 50d'],
    '320e': ['xDrive 75d', 'xDrive 80d', 'xDrive 85d'],
  },
  tesla: {
    'Model 3': ['Performance', 'Long Range', 'Dual Motor'],
  },
};

const VehicleSelector: React.FC = () => {
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [badge, setBadge] = useState('');
  const [logbook, setLogbook] = useState<File | null>(null);
  const [open, setOpen] = useState<boolean>(false)
  const [message, setMessage] = useState<string | ''>('')
  const handleMakeChange = (event: SelectChangeEvent<string>) => {
    setMake(event.target.value as string);
    setModel('');
    setBadge('');
  };

  const handleModelChange = (event: SelectChangeEvent<string>) => {
    setModel(event.target.value as string);
    setBadge('');
  };

  const handleBadgeChange = (event: SelectChangeEvent<string>) => {
    setBadge(event.target.value as string);
  };

  const handleLogbookUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setLogbook(event.target.files[0]);
    }
  };

  const handleQuickSelect = (make: string, model: string, badge: string) => {
    setMake(make);
    setModel(model);
    setBadge(badge);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!logbook) {
      alert('Please upload a logbook file.');
      return;
    }

    const formData = new FormData();
    formData.append('make', make);
    formData.append('model', model);
    formData.append('badge', badge);
    formData.append('logbook', logbook);

    try {
      const response = await fetch('/api/vehicle', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      setMessage('Submit Successfully!')
      console.log(result);
    } catch (error) {
     

      setMessage('Submit Failed!')

      console.error('Error submitting form:', error);
    }
    setOpen(true)
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Snackbar open={open} autoHideDuration={2000} 
      onClose={()=> setOpen(false)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center'
        }} >
        <Alert
          severity={message.includes('Failed')? 'error' : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>

      <Typography variant="h4">Select Your Vehicle</Typography>
      <Button variant="contained" onClick={() => handleQuickSelect('ford', 'Ranger', 'Raptor')}>
        Quick Select Ford Ranger Raptor
      </Button>

      <Button variant="contained" onClick={() => handleQuickSelect('tesla', 'Model 3', 'Performance')}>
        Quick Select Tesla Model 3 Performance
      </Button>



      <FormControl fullWidth margin="normal">
        <InputLabel id="make-label">Make</InputLabel>
        <Select
          labelId="make-label"
          value={make}
          onChange={handleMakeChange}
          label="Make"
        >
          {Object.keys(MODELS).map((make) => (
            <MenuItem key={make} value={make}>
              {make.charAt(0).toUpperCase() + make.slice(1)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {make && (
        <FormControl fullWidth margin="normal">
          <InputLabel id="model-label">Model</InputLabel>
          <Select
            labelId="model-label"
            value={model}
            onChange={handleModelChange}
            label="Model"
          >
            {Object.keys(MODELS[make]).map((model) => (
              <MenuItem key={model} value={model}>
                {model}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {model && (
        <FormControl fullWidth margin="normal">
          <InputLabel id="badge-label">Badge</InputLabel>
          <Select
            labelId="badge-label"
            value={badge}
            onChange={handleBadgeChange}
            label="Badge"
          >
            {MODELS[make][model].map((badge) => (
              <MenuItem key={badge} value={badge}>
                {badge}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
      {badge && (
        <Box marginTop={2}>
          <Button variant="contained" component="label">
            Upload Service Logbook <span style={{ fontSize: '8px' }}>(.txt,.pdf,.doc,.docx)</span>
            <input
              type="file"
              hidden
              onChange={handleLogbookUpload}
              accept=".txt,.pdf,.doc,.docx"
            />
          </Button>
          {logbook && (
            <Typography variant="body1" marginTop={2}>
              {logbook.name}
            </Typography>
          )}
        </Box>
      )}
      <Button type="submit" variant="contained" color="primary" disabled={!make || !model || !badge || !logbook}>
        Submit
      </Button>

    </Box>
  );
};

export default VehicleSelector;
