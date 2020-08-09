import React, { Component } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Card from "react-bootstrap/Card";
let URL = "https://reqres.in/api/users?per_page=6&page=";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info: [],
      totalPage: 0,
      page: 1,
      pagination: [],
    };
  }

  componentDidMount() {
    this.fetchadvice(this.state.page);
  }

  fetchadvice(page) {
    this.setState({ page: page });
    axios
      .get(URL + `${page}`)
      .then((res) => {
        if (res.status === 200) {
          this.setState({
            info: res.data.data,
            totalPage: res.data.total_pages,
            pagination: [...Array(res.data.total_pages)].map(
              (_, i) => ++i + ""
            ),
          });
        }
      })
      .catch((err) => console.log(err.response, "error"));
  }

  render() {
    return (
      <div className="container">
        <div className="first_container">
          {this.state.info.map((item, index) => (
            <Card className="card" key={index}>
              <Card.Img
                variant="top"
                src={item.avatar}
                height={180}
                width={130}
              />
              <Card.Body>
                <Card.Text className="card_text">
                  Email: {item.email}
                  <br />
                  Name: {item.first_name} {item.last_name}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
        <div className="pagination_container">
          <h6>Pages:</h6>
          {this.state.pagination.map((item, index) => (
            <div
              className="pagination"
              style={{
                background:
                  this.state.page === index + 1 ? "lightgrey" : "white",
              }}
              onClick={() => this.fetchadvice(index + 1)}
              key={index}
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default App;
