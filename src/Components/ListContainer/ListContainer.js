import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import List from '../ListComponent/List';
import SortButton from '../SortButton/SortButton';
import './ListContainer.css';

const ListContainer = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    //get 8 user details from the API
    const fetchData = async () => {
      try {
        const responses = await axios.get('https://randomuser.me/api?results=8');
        setData(responses.data.results);
        setFilteredData(responses.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  //list down users according to the input(user name) in the search bar
  const handleSearch = (term) => {
    if (term === '') {
      setFilteredData(data);
    } else {
      const filtered = data.filter((item) =>
        `${item.name.first} ${item.name.last}`.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredData(filtered);
    }
  };

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    handleSearch(term);
  };

  //sort users by the first name
  const sortData = () => {
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => a.name.first.localeCompare(b.name.first));
    setFilteredData(isSorted ? sortedData.toReversed() : sortedData);
  };

  const handleSortClick = () => {
    setIsSorted(!isSorted);
    sortData();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="container">
      <div className="header">
        <h1>Details of Users</h1>
      </div>
      <div className="search-sort-container">
        <div className="search-bar-div">
          <SearchBar searchTerm={searchTerm} onChange={handleChange} />
        </div>
        <div className="sort-button-div">
          <SortButton isSorted={isSorted} onClick={handleSortClick} />
        </div>
      </div>
      <div className="list-container">
        <List data={filteredData} searchTerm={searchTerm} />
      </div>
    </div>
  );
};

export default ListContainer;
