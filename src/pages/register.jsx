import React, { useReducer, useEffect } from 'react';
import axios from 'axios';

export default function Register() {

  useEffect(() => {

    axios.get('http://localhost:8001/api/register')
      .then(res => {
        console.log('avatars', res.data);
        console.log('hi');
      })

  }, [])

  return (
    <div>hi</div>
  )

}