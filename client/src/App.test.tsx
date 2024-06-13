/*
 * @Description: 
 * @Version: 1.0
 * @Author: shenkai03
 * @Date: 2024-06-13 15:39:14
 * @LastEditors: shenkai03
 * @LastEditTime: 2024-06-13 15:40:32
 * @FilePath: /client/src/App.test.tsx
 * Copyright (C) 2024 shenkai03. All rights reserved.
 */
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';

test('renders Car Selector text', () => {
  render(<App />);
  const linkElement = screen.getByText(/Car Selector/i);
  expect(linkElement).toBeInTheDocument();
});
