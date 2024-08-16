import React, { useState, useEffect } from 'react';
import axios from 'axios';

function withUserData(WrappedComponent, columnFields) {
  return function EnhancedComponent(props) {
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [sortColumn, setSortColumn] = useState(columnFields[0]?.value || '');
    const [sortDirection, setSortDirection] = useState('asc');

    useEffect(() => {
      const fetchData = async () => {
        try {
          const { data: users } = await axios.get('/api/v1/users');
          setUsers(users);
          setFilteredUsers(users);
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      };
      fetchData();
    }, []);

    useEffect(() => {
      let filtered = users.filter(
        user =>
          user.name.toLowerCase().includes(searchName.toLowerCase()) &&
          user.email.toLowerCase().includes(searchEmail.toLowerCase())
      );

      if (sortColumn) {
        filtered.sort((a, b) => {
          const x = a[sortColumn];
          const y = b[sortColumn];
          if (x < y) return sortDirection === 'asc' ? -1 : 1;
          if (x > y) return sortDirection === 'asc' ? 1 : -1;
          return 0;
        });
      }

      setFilteredUsers(filtered);
    }, [searchName, searchEmail, users, sortColumn, sortDirection]);

    const handleOnSearch = (event) => {
      const { name, value } = event.target;

      if (name === 'name') {
        setSearchName(value);
      } else if (name === 'email') {
        setSearchEmail(value);
      } else {
        throw new Error('Unknown search element');
      }
    };

    const handleSort = (column) => {
      if (sortColumn === column) {
        setSortDirection(prevDirection => (prevDirection === 'asc' ? 'desc' : 'asc'));
      } else {
        setSortColumn(column);
        setSortDirection('asc');
      }
    };

    return (
      <WrappedComponent
        users={filteredUsers}
        columnFields={columnFields}
        handleOnSearch={handleOnSearch}
        handleSort={handleSort}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        {...props}
      />
    );
  };
}

export default withUserData;
