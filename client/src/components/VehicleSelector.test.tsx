import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { act } from 'react'; // Import act from react
import VehicleSelector from './VehicleSelector';

describe('VehicleSelector Component', () => {
//   test('renders the component with initial state', () => {
//     render(<VehicleSelector />);
//     expect(screen.getByText('Select Your Vehicle')).toBeInTheDocument();
//     expect(screen.getByLabelText('Make')).toBeInTheDocument();
//   });

//   test('renders models when a make is selected', async () => {
//     render(<VehicleSelector />);
    
//     await act(async () => {
//       fireEvent.mouseDown(screen.getByLabelText('Make'));
//       fireEvent.click(screen.getByText('Ford'));
//     });

//     await waitFor(() => {
//       expect(screen.getByLabelText('Model')).toBeInTheDocument();
//     });
//   });

//   test('renders badges when a model is selected', async () => {
//     render(<VehicleSelector />);
    
//     await act(async () => {
//       fireEvent.mouseDown(screen.getByLabelText('Make'));
//       fireEvent.click(screen.getByText('Ford'));
//     });

//     await act(async () => {
//       fireEvent.mouseDown(screen.getByLabelText('Model'));
//       fireEvent.click(screen.getByText('Ranger'));
//     });

//     await waitFor(() => {
//       expect(screen.getByLabelText('Badge')).toBeInTheDocument();
//     });
//   });

//   test('allows file upload when a badge is selected', async () => {
//     render(<VehicleSelector />);
    
//     await act(async () => {
//       fireEvent.mouseDown(screen.getByLabelText('Make'));
//       fireEvent.click(screen.getByText('Ford'));
//     });

//     await act(async () => {
//       fireEvent.mouseDown(screen.getByLabelText('Model'));
//       fireEvent.click(screen.getByText('Ranger'));
//     });

//     await act(async () => {
//       fireEvent.mouseDown(screen.getByLabelText('Badge'));
//       fireEvent.click(screen.getByText('Raptor'));
//     });

//     const fileInput = screen.getByLabelText(/upload service logbook/i);
//     const file = new File(['service log'], 'service-log.txt', { type: 'text/plain' });

//     await act(async () => {
//       fireEvent.change(fileInput, { target: { files: [file] } });
//     });

//     expect(screen.getByText('service-log.txt')).toBeInTheDocument();
//   });
});
