
import { BrowserRouter as Router, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as ProfileIcon} from '../assets/svg/personOutlineIcon.svg'

function Navbar() { 
  const navigate = useNavigate();
  const location = useLocation();

  const pathMatchRoute = (route) =>{
    if(route === location.pathname){
        return true;
    }
  }
  return (

<footer className="navbar">
    <nav className="navbarNav">
        <ul className="navbarListItems">
            <li className="navbarListItem" onClick={() => navigate('/')}>
                <ExploreIcon fill={pathMatchRoute('/') ? '#2c2c2c' : '#8f8f8f'} height='36px' width='36px'/>
                <p className={pathMatchRoute('/') ? 
                    'navbarListItemNameActive' :
                    'navbarListItemName'
                }>Explore </p>
            </li>

            <li className="navbarListItem" onClick={() => navigate('/offers')}>
                <OfferIcon fill={pathMatchRoute('/offers') ? '#2c2c2c' : '#8f8f8f'} height='36px' width='36px'/>
                <p className={pathMatchRoute('/offers') ? 
                    'navbarListItemNameActive' :
                    'navbarListItemName'
                }>Offer </p>
            </li>

            <li className="navbarListItem" onClick={() => navigate('/profile')}>
                <ProfileIcon fill={pathMatchRoute('/profile') ? '#2c2c2c' : '#8f8f8f'} height='36px' width='36px'/>
                <p className={pathMatchRoute('/profile') ? 
                    'navbarListItemNameActive' :
                    'navbarListItemName'
                }>Profile </p>
            </li>
        </ul>
    </nav>
</footer>

  )
}

export default Navbar
