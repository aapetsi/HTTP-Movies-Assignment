import React, { useState } from 'react'
import axios from 'axios'

const AddMovie = props => {
  const [movie, setMovie] = useState({
    title: '',
    director: '',
    metascore: '',
    stars: ''
  })

  const handleChange = e => {
    setMovie({ ...movie, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()

    axios
      .post(`http://localhost:5000/api/movies`, movie)
      .then(res => {
        console.log(res.data)
        props.history.push('/')
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

        <button>Add</button>
      </form>
    </div>
  )
}

export default AddMovie
