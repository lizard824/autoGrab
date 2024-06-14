import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react';
import VehicleSelector from './VehicleSelector';

describe('VehicleSelector Component', () => {
    test('renders correctly and allows selecting vehicle details', async () => {
        await act(async () => {
            render(<VehicleSelector />);
        });

        // Check that the make dropdown is present
        expect(screen.getByLabelText(/make/i)).toBeInTheDocument();

        // Open make dropdown and select 'Ford'
        await act(async () => {
            userEvent.click(screen.getByLabelText(/make/i));
        });

        // Use a custom text matcher function to find 'Ford'
        const fordOption = screen.getByRole('option', { name: (content, element) => element?.textContent === 'Ford' });
        await act(async () => {

            userEvent.click(fordOption);
        })

        // Check that the model dropdown is present
        await waitFor(() => {
            expect(screen.getByLabelText(/model/i)).toBeInTheDocument();
        });

        // Open model dropdown and select 'Ranger'
        await act(async () => {
            userEvent.click(screen.getByLabelText(/model/i));
        });

        const rangerOption = screen.getByRole('option', { name: (content, element) => element?.textContent === 'Ranger' });
        await act(async () => {

            userEvent.click(rangerOption);
        })

        // Check that the badge dropdown is present
        await waitFor(() => {
            expect(screen.getByLabelText(/badge/i)).toBeInTheDocument();
        });

        // Open badge dropdown and select 'Raptor'
        await act(async () => {
            userEvent.click(screen.getByLabelText(/badge/i));
        });

        const raptorOption = screen.getByRole('option', { name: (content, element) => element?.textContent === 'Raptor' });
        await act(async () => {

            userEvent.click(raptorOption);
        })

        // Check that the upload button is present
        expect(screen.getByText(/upload service logbook/i)).toBeInTheDocument();

        // Simulate file upload
        const file = new File(['service logbook content'], 'logbook.txt', { type: 'text/plain' });
        const input = screen.getByLabelText(/upload service logbook/i);

        await act(async () => {
            userEvent.upload(input, file);
        });

        // Check that the uploaded file name is displayed
        await waitFor(() => {
            expect(screen.getByText('logbook.txt')).toBeInTheDocument();
        });

    });

    test('quick select buttons work correctly', async () => {
        await act(async () => {
            render(<VehicleSelector />);
        });

        // Click the quick select button for Ford Ranger Raptor
        await act(async () => {
            userEvent.click(screen.getByRole('button', { name: /quick select ford ranger raptor/i }));
        });

        // Check that the dropdowns are correctly populated
        await waitFor(() => {
            expect(screen.getByText('Ford')).toBeInTheDocument();
            expect(screen.getByText('Ranger')).toBeInTheDocument();
            expect(screen.getByText('Raptor')).toBeInTheDocument();

        });

        // Click the quick select button for Tesla Model 3 Performance
        await act(async () => {
            userEvent.click(screen.getByText(/quick select tesla model 3 performance/i));
        });

        // Check that the dropdowns are correctly populated
        await waitFor(() => {
            expect(screen.getByText('Tesla')).toBeInTheDocument();
            expect(screen.getByText('Model 3')).toBeInTheDocument();
            expect(screen.getByText('Performance')).toBeInTheDocument();
        });
    });
});
