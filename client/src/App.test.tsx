/*
 * @Description: 
 * @Version: 1.0
 * @Author: shenkai03
 * @Date: 2024-06-13 15:39:14
 * @LastEditors: shenkai03
 * @LastEditTime: 2024-06-13 22:30:42
 * @FilePath: /autoGrab/client/src/App.test.tsx
 * Copyright (C) 2024 shenkai03. All rights reserved.
 */
import { act } from 'react'; // Import act from react
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders Car Selector text', async() => {
    render(<App />);
  const linkElement = screen.getByText(/Car Selector/i);
  expect(linkElement).toBeInTheDocument();
});
