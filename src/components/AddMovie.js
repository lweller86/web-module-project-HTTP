import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import { baseURL } from "../Utils";



const AddMovie = (props) => {
    const navigate = useNavigate();
    const { setMovies } = props;

    const [movie, setMovie] = useState({
        title: "",
        director: "",
        genre: "",
        metascore: 0,
        description: ""
    });

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post(baseURL, movie)
            .then(res => {
                setMovies(res.data)
                navigate('/movies');
            })
            .catch(err => {
                console.log(err.response);
            })
    };



    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="modal-header">
                    <h4 className="modal-title">Adding New Movie <strong></strong></h4>
                </div>
                <div className="modal-body">
                    <div className="form-group">
                        <label>Title</label>
                        <input
                            value={movie.title}
                            onChange={handleChange}
                            name="title"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Director</label>
                        <input
                            value={movie.director}
                            onChange={handleChange}
                            name="director"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Genre</label>
                        <input
                            value={movie.genre}
                            onChange={handleChange}
                            name="genre"
                            type="text"
                            className="form-control"
                        />
                    </div>
                    <div className="form-group">
                        <label>Metascore</label>
                        <input
                            value={movie.metascore}
                            onChange={handleChange}
                            name="metascore"
                            type="number"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea
                            value={movie.description}
                            onChange={handleChange}
                            name="description"
                            className="form-control">
                        </textarea>
                    </div>

                </div>
                <div className="modal-footer">
                    <input
                        type="submit"
                        className="btn btn-info"
                        value="Save"
                    />
                    <Link
                        to={`/movies/1`}>
                        <input
                            type="button"
                            className="btn btn-default"
                            value="Cancel"
                        />
                    </Link>
                </div>
            </form>
        </div>
    )

}

export default AddMovie;