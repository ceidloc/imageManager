import React, { PropTypes } from 'react';
import { Link, IndexLink } from 'react-router';
import Auth from '../modules/Auth';


const TitleBar = ({ children }) => (
  <div>
    <div className="top-bar">
      <div className="top-bar-left">
        <IndexLink to="/">Image Manager</IndexLink>
      </div>
    </div>

    { /* child component will be rendered here */ }
    {children}

  </div>
);

TitleBar.propTypes = {
  children: PropTypes.object.isRequired
};

export default TitleBar;
