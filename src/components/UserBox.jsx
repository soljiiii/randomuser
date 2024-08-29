import Modal from './Modal';
import './UserBox.css'
import { useState } from 'react';

const UserBox = ({name, gender, location, image, phone, email}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);

    const modalOpen = () => {
        if(isModalOpen===true){
            setIsModalOpen(false);
        }
        else{
            setIsModalOpen(true);
        }
    }
    
    return(
        <div className="UserBox" onClick={modalOpen}>
            <Modal
                isModalOpen={isModalOpen}
                name={name}
                gender={gender}
                location={location}
                image={image}
                phone={phone}
                email={email}
            />
            <img src={`${image}`}/>
            <div className='info'>
                <p>NAME : {name}</p>
                <p>e-mail : {email}</p>
                <p>PHONE : {phone}</p>
            </div>
        </div>

    );
}
export default UserBox;