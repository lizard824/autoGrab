/*
 * @Description: 
 * @Version: 1.0
 * @Author: shenkai03
 * @Date: 2024-06-13 15:27:52
 * @LastEditors: shenkai03
 * @LastEditTime: 2024-06-13 15:53:22
 * @FilePath: /client/src/App.tsx
 * Copyright (C) 2024 shenkai03. All rights reserved.
 */

import VehicleSelector from './components/VehicleSelector';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Car Selector
        </p>
      </header>
      <section>
          <VehicleSelector/>
      </section>
    </div>
  );
}

export default App;
