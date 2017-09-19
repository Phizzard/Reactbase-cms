import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import './App.css';

class App extends Component {
  render() {
    return (
        <div>
            <Navbar />
        <div className="container-fluid">
          <div className="row">
                <Sidebar />
            <main className="col-sm-9 ml-sm-auto col-md-10 pt-3" role="main">
                <Dashboard />
            </main>
          </div>
        </div>
  </div>
    );
  }
}

export default App;
