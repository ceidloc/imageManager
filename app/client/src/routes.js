import Base from './components/Base.jsx';
import HomePage from './components/HomePage.jsx';
import DashboardPage from './containers/DashboardPage.jsx';
import LoginPage from './containers/LoginPage.jsx';
import LogoutPage from './containers/LogoutPage.jsx';
import SignUpPage from './containers/SignUpPage.jsx';
import GalleryPage from './containers/GalleryPage.jsx';
import AddImagePage from './containers/AddImagePage.jsx';
import ViewImagePage from './containers/ViewImagePage.jsx';
import EditImagePage from './containers/EditImagePage.jsx';
import DeleteImage from './containers/DeleteImage.jsx';
import Auth from './modules/Auth';


const routes = {
  // base component (wrapper for the whole application).
  component: Base,
  childRoutes: [

    {
      path: '/',
      getComponent: (location, callback) => {
        if (Auth.isUserAuthenticated()) {
          callback(null, DashboardPage);
        } else {
          callback(null, HomePage);
        }
      }
    },

    {
      path: '/login',
      component: LoginPage
    },

    {
      path: '/signup',
      component: SignUpPage
    },

      {
          path: '/gallery/:user_id',
          component: GalleryPage
      },
      {
          path: '/addimage/:user_id',
          component: AddImagePage
      },
      {
          path: '/viewimage/:image_id',
          component: ViewImagePage
      },
      {
          path: '/editimage/:image_id',
          component: EditImagePage
      },

      {
          path: '/deleteimage/:user_id/:image_id',
          component: DeleteImage 
      },

    {
      path: '/logout',
      onEnter: (nextState, replace) => {
        var token = Auth.getToken();
        token = token.split(' ')[0];

        Auth.deauthenticateUser();
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'http://app.imagemanager.hasura.me/user/logout', true);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${token}`);
        xhr.responseType = 'json';
        xhr.send();

        xhr.addEventListener('load', () => {
          if (xhr.status === 200) {
          // success
          console.log("Logged out.");
          }
        }); 

        // change the current URL to /
        replace('/');
      }
      
    }

  ]
};

export default routes;
