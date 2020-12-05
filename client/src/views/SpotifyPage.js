import React, { useState, useEffect } from 'react';

import Header2 from '../components/Header2';
import SearchForSpotify from '../components/SearchForSpotify';
import axios from 'axios';
import Footer from '../components/Footer'
import Background from '../assets/background.jpg';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Table from "react-bootstrap/Table";

const spotify_styles = makeStyles({
  button: {
    width: "500px",
    height: "50px",
    fontSize: "15px"
  },

});

const SpotifyPage = props => {
  let [media_result, setMedia] = useState([]);
  let [title, setTitle] = useState('');
  let [type, setType] = useState('');
  const styles = spotify_styles();
  const code = localStorage.getItem('spotify_token')

  // console.log(media_result);

  const handleKeyDown = async event => {
    if (event.key === 'Enter') {
      console.log('do validate')
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .all([
          axios.get('http://localhost:3001/api/web/spotify/search?code=' + code + '&media=' + title + '&type=show')
        ])
        .then(
          axios.spread((result1) => {
            console.log(result1.data.body.shows); //shows correct response
            setMedia(result1.data.body.shows);
          })
        );
    };
    fetchData();
    }, [title]);

  const search = async val => {
    const res = await axios(
      'http://localhost:3001/api/web/spotify/search?code=' + code + '&media=' + title + '&type=show'
    );
    return res
};

const search_spot = () => {
  axios
    .get('http://localhost:3001/api/web/spotify/search?code=' + code + '&media=' + title + '&type=show')
    .then((res) => {
      return res
    })
    .catch((err) => {
      console.log(err);
    });
};
  
  const filterTitle = (value) => {
    // console.log('value=> ' + value)
    setTitle(value)
  };


	return (
		<div>
      <Header2 />
      <div class="container">
        <div class="crop-height flip">
            <img class="scale flip" src={Background} />
        </div>
      </div>
      <Paper className={styles.container}>
      <SearchForSpotify get_title={filterTitle} handleKeyDown={handleKeyDown} />
      <Table striped bordered hover>
				<thead>
					<tr>
						<th class="align-middle">Title</th>
						<th class="align-middle">Description</th>
					</tr>
				</thead>
				<tbody>
        {media_result.items ? media_result.items.map(m => {
            return (
              <tr key={m.id} name={m.name}>
                <td class="align-middle">{m.name}</td>
                <td class="align-middle">{m.description}</td>
              </tr>
            );
					}) : ""}
				</tbody>
			</Table>
      </Paper>
      <Footer/>
		</div>
	);
};


export default SpotifyPage;