import { useNavigate } from 'react-router-dom';
import './Header.css'

const Header = () => {

    const nav = useNavigate();

    return(
        <div className='Header'>
            <div className='title'>
                👩‍💻 Random User 👩‍💻
            </div>
        </div>
    );
}
export default Header;