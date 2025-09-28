import { Component } from 'react';
import './App.css';

export class App extends Component {

  state = {
    page: 1,
    api: `https://pixabay.com/api/?key=52507954-bca6ba319c77b4e167a13f2e7&per_page=30&page=1`,
    data: [],
    query: '',
  }

  findImages = (query) => {
    this.setState({
      query: query,
      api: `https://pixabay.com/api/?key=52507954-bca6ba319c77b4e167a13f2e7&per_page=30&page=${this.state.page}&q=${query}`
    }, () => {
      this.getImages();
    });
  }

  getImages = () => {
    fetch(this.state.api)
      .then(response => response.json())
      .then(data => {
        this.setState({ data: data.hits });
        console.log(data.hits);
      })
      .catch(error => console.error('Error fetching images:', error));
  }

  componentDidMount() {
    this.getImages();
  }
  prev = () => {
    if (this.state.page > 1) {
      this.setState(prevState => ({
        page: prevState.page - 1,
        api: `https://pixabay.com/api/?key=52507954-bca6ba319c77b4e167a13f2e7&per_page=30&page=${prevState.page - 1}&q=${prevState.query}`
      }), () => {
        this.getImages();
      });
    }
  }

  next = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
      api: `https://pixabay.com/api/?key=52507954-bca6ba319c77b4e167a13f2e7&per_page=30&page=${prevState.page + 1}&q=${prevState.query}`
    }), () => {
      this.getImages();
    });
  }

  render() {
    return (
      <>
        <div className='div'>
          <button onClick={this.prev}>Prev</button>
          <input type="text" onChange={(e) => this.findImages(e.target.value)} />
          <button onClick={this.next}>Next</button>
        </div>
        <ul>
          {this.state.data.map(item => (
            <li key={item.id}>
              <img src={item.largeImageURL} alt={item.tags} />
            </li>
          ))}
        </ul>
      </>
    );
  }
}
