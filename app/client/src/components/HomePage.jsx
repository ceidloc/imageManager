import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Card, CardTitle, CardMedia } from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';

const styles = {
  button: {
    margin: 12,
  }
}
const HomePage = () => (
	<div>
		<div className="container">
		  <br></br>
                  <CardTitle title="Image Manager" subtitle="App to share images and keep track of them with tags." />
                  <div className="homePageImage">
                    <CardMedia >
                      <img src="http://www.gettyimages.ca/gi-resources/images/Homepage/Hero/UK/CMS_Creative_164657191_Kingfisher.jpg"/>
	            </CardMedia>
                    </div>
		  <Link to="/login">
		    <RaisedButton
		      label="Log in"
		      labelPosition="before"
		      style={styles.button}
		      containerElement="label"
		    />
		  </Link> {'  '}
	          <Link to="/signup">
	      	    <RaisedButton
		      label="Sign up"
		      labelPosition="before"
		      style={styles.button}
		      containerElement="label"
		    />
	      </Link>
		</div>
  	</div>
);

export default HomePage;
