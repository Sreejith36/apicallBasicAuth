import React, { Component } from 'react';

class MyPost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const username = 'test';
    const password = 'test';

    this.fetchData(username, password);
  }

  fetchData = async (username, password) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${username}:${password}`)}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
      const firstFourItems = responseData.slice(0, 4); // Extract the first 4 items

      this.setState({ data: firstFourItems });
    } catch (error) {
      console.error('Error making API call:', error);
    }
  };

  render() {
    const { data } = this.state;

    return (
      <div>
        <ul>
          {data.map((item, index) => (
            <li key={index}>{item}</li>
           
          ))}
        </ul>
      </div>
    );
  }
}

export default MyPost;
