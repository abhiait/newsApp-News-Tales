import React, { Component } from 'react';
import loading from './loading.gif'

class Spinner extends Component {
  render() {
    return (
      <div className='text-center my-5 mx-5'>  
          <img src={loading} alt="loading" />
           </div>
    );
  }
}

export default Spinner;
