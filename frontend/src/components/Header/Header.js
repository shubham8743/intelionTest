import "./Header.css";
import { isAuth, signout } from '../../actions/auth';

const Header = () => {

return(
    <div className="header">
        <div>
            <a href="/dashboard">Dashboard</a>
        </div>
        {!isAuth() && (
            <div>
                <a href="/signup">Sign Up</a>
                <a href="/">Sign In</a>
            </div>)}
        {isAuth() && (
            <a onClick={() => signout(() => window.location.replace('/'))}>
                Logout
            </a>)}
    </div>
)
}

export default Header;