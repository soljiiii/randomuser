import './Modal.css'

const Modal = ({isModalOpen, name, gender, location, image, phone, email}) => {
    return(
        <div className="Modal">
            {isModalOpen&&(
                <div className="content">
                    <img src={`${image}`}/>
                    <p><strong>NAME</strong> : {name}</p>
                    <p><strong>GENDER</strong> : {gender}</p>
                    <p><strong>LOC</strong> :{location}</p>
                    <p><strong>TEL</strong> :{phone}</p>
                    <p><strong>MAIL</strong> :{email}</p>
                </div>
            )}
        </div>
    );
}
export default Modal;