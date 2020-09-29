import React, { useEffect } from 'react';
import { navigate } from 'gatsby';
import axios from 'axios';

export default function Index() {
  useEffect(() => {
    navigate('/');

    axios.get('http://localhost:8001/api/');
  }, [])
  return <div />;
}
