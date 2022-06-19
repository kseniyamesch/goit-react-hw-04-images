import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import s from './App.module.css';
import getRequest from 'services/API';

import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

export function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [data, setData] = useState(null);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState('idle');
  const [totalHits, setTotalHits] = useState(null);


  const onSearchSubmit = data => {
    if (data.toLowerCase() === searchQuery.toLowerCase()) return;
    setSearchQuery(data);
    setPage(1);
    setData([]);
    setTotalHits(null);
  };

  useEffect(() => {
    if (!searchQuery) {
      return;
    }
    setStatus('pending');
    getRequest(searchQuery, page)
      .then(response => {
        if (response.data.totalHits !== 0) {
          setData(state => [...state, ...response.data.hits]);
          setTotalHits(response.data.totalHits);
          setStatus('resolved');

        } else {
          toast.error(`${searchQuery} not found!`);
          setStatus('rejected');
          return toast.error(`There are no results on search ${searchQuery}`);
        }
      })
      .catch(error => {
        toast.error(error.message);
        setStatus('rejected');
      });
      window.scrollBy({
        top: document.body.clientHeight,
        behavior: 'smooth',
      });
  }, [searchQuery, page]);

  return (
    <div className={s.App}>
      
      <Searchbar onSubmit={onSearchSubmit}></Searchbar>

        {status === 'resolved' && data.length > 0 && (
        <ImageGallery images={data}></ImageGallery>
      )}

      {status === 'pending' && <Loader></Loader>}
      {status === 'resolved' && data.length > 0 && data.length < totalHits && (
        <Button onLoadMore={() => setPage(prevPage => prevPage + 1)}></Button>
      )}
      <ToastContainer/>
    </div>
  );

}
