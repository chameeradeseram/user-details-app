// DataFetchingComponent.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from '../SearchBar/SearchBar';
import List from '../ListComponent/List';
import SortButton from '../SortButton/SortButton';
import './DataFetchingComponent.css';

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSorted, setIsSorted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responses = await Promise.all(Array.from({ length: 8 }, () => axios.get('https://randomuser.me/api/')));
        const selectedPeopleDetails = responses.map((response) => response.data.results[0]);
        setData(selectedPeopleDetails);
        setFilteredData(selectedPeopleDetails);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const sortData = () => {
    const sortedData = [...filteredData];
    sortedData.sort((a, b) => a.name.first.localeCompare(b.name.first));
    setFilteredData(isSorted ? sortedData.reverse() : sortedData);
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
          <SearchBar searchTerm={searchTerm} onSearch={handleSearch} onChange={handleChange} />
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

export default DataFetchingComponent;
