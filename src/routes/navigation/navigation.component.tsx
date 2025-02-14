import {Outlet, Link} from 'react-router-dom'
import CrwnLogo from '../../assets/crown.svg';
import './navigation.styles.scss'

const Navigation = () => {
    return (
      <>
        <div className='navigation'>
        <Link to='/' className='logo-container'>
                <img src={CrwnLogo} alt="Crown Logo" className='logo' />
            </Link>
          <div className="nav-links-container">
            <Link to='/shop' className='nav-link'>
                SHOP
            </Link>
            <Link to='/sign-in' className='nav-link'>
                SIGN IN
            </Link>
          </div>
        </div>
        <Outlet />
      </>
    )
  }

  export default Navigation