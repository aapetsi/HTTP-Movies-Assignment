import React, { useState } from 'react'
import axios from 'axios'

const EditMovie = props => {
  let movieToUpdate = props.location.state
  const [movie, setMovie] = useState({
    id: movieToUpdate.id,
    title: movieToUpdate.title,
    director: movieToUpdate.director,
    metascore: movieToUpdate.metascore,
    stars: [...movieToUpdate.stars]
  })
  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value })
  }
  const handleSubmit = e => {
    e.preventDefault()
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        console.log(res.data)
        // props.history.push('/')
      })
      .catch(err => {
        console.log(err)
      })
    console.log('clicked')
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Title
          <input
            onChange={handleChange}
            name="title"
            type="text"
            placeholder="title"
            value={movie.title}
          />
        </label>
        <br />
        <label>
          Director
          <input
            onChange={handleChange}
            name="director"
            type="text"
            placeholder="director"
            value={movie.director}
          />
        </label>
        <br />
        <label>
          Metascore
          <input
            onChange={handleChange}
            name="metascore"
            type="number"
            placeholder="metascore"
            value={movie.metascore}
          />
        </label>
        <br />
        <label>
          Stars
          <textarea onChange={handleChange} name="stars" value={movie.stars} />
        </label>
        <br />

        <button>Edit</button>
      </form>
    </div>
  )
}

export default EditMovie
