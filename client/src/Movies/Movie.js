import React from 'react'
import axios from 'axios'
import MovieCard from './MovieCard'
export default class Movie extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      movie: null
    }
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id)
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id)
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response))
  }

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList
    addToSavedList(this.state.movie)
  }

  editMovie = () => {
    this.props.location.state = this.state
    this.props.history.push(
      `/update-movie/${this.state.movie.id}`,
      (this.props.location.state = this.state.movie)
    )
    console.log(this.props.location.state)
  }

  deleteMovie = id => {
    axios
      .delete(`http://localhost:5000/api/movies/${this.state.movie.id}`)
      .then(res => {
        console.log(res.data)
        this.props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
  }

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>
    }

    console.log(this.state)

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button className="" onClick={this.editMovie}>
          Edit
        </button>
        <button onClick={this.deleteMovie}>Delete</button>
      </div>
    )
  }
}
