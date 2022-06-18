import { Component } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar';
import s from './App.module.css';
// import axios from 'axios';
import getRequest from 'services/API';

import ImageGallery from './ImageGallery';
import Button from './Button';
import Loader from './Loader';

export class App extends Component {
  state = {
    searchQuery: '',
    data: null,
    page: 1,
    error: null,
    status: 'idle',
    totalHits: null,
  };

  onSearchSubmit = data => {
    this.setState({ searchQuery: data, page: 1, data: [] });
  };

  componentDidUpdate(_, prevState) {
    if (
      this.state.searchQuery !== prevState.searchQuery ||
      this.state.page !== prevState.page
    ) {
      this.setState({ status: 'pending' });
      getRequest(this.state.searchQuery, this.state.page)
        .then(response => {
          if (response.data.totalHits !== 0) {
            this.setState(prevState => ({
              data: [...prevState.data, ...response.data.hits],
              status: 'resolved',
              totalHits: response.data.totalHits,
            }));
          } else {
            this.setState({
              error: `${this.state.searchQuery} not found!`,
              status: 'rejected',
            });
            return toast.error(
              `There are no results on search ${this.state.searchQuery}`
            );
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  handleClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  render() {
    const { searchQuery, data, status, page, totalHits } = this.state;
    const totalPages = totalHits / 12;
    return (
      <div className={s.App}>
        <ToastContainer />
        <Searchbar onSubmit={this.onSearchSubmit}></Searchbar>

        {status === 'resolved' && searchQuery && (
          <ImageGallery images={data}></ImageGallery>
        )}

        {status === 'pending' && <Loader></Loader>}

        {status === 'resolved' && totalPages > page && (
          <Button onLoadMore={this.handleClick}></Button>
        )}
      </div>
    );
  }
}
