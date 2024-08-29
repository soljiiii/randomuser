import React, { useEffect, useState } from 'react';
import Header from "../layouts/Header";
import axios from "axios";
import UserBox from '../components/UserBox';
import './Home.css'
import Pagination from 'react-js-pagination';
import { useNavigate, useParams } from 'react-router-dom';


const Home = () => {
    
    const userPerPage = 10;
    const buttonsPerPageGroup = 10;

    const [ users, setUsers ] = useState([]);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [ search, setSearch] = useState("");
    const [select, setSelect] = useState("");


    //정보 불러오기
    useEffect(()=>{
        axios.get('https://randomuser.me/api/',{
            params:{
                results:userPerPage,
                page:currentPage
            }
        })
        .then(response => {
            console.log(response.data.results);
            setUsers(response.data.results);
            setTotalPages(Math.ceil(5000 / userPerPage));
        })
        .catch(error => {
            console.error('There was an error making the request:', error);
        });
    },[currentPage])

    function getFullName(users){
        return `${users.name.first} ${users.name.last}`
    }


    //페이지네이션
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const handlePreviousGroup = () => {
        const startPage = Math.floor((currentPage - 1) / buttonsPerPageGroup) * buttonsPerPageGroup + 1;
        if (startPage > 1) {
            setCurrentPage(startPage - buttonsPerPageGroup);
        }
    };

    const handleNextGroup = () => {
        const startPage = Math.floor((currentPage - 1) / buttonsPerPageGroup) * buttonsPerPageGroup + 1;
        if (startPage + buttonsPerPageGroup <= totalPages) {
            setCurrentPage(startPage + buttonsPerPageGroup);
        }
    };

    const startPage = Math.floor((currentPage - 1) / buttonsPerPageGroup) * buttonsPerPageGroup + 1;
    const endPage = Math.min(startPage + buttonsPerPageGroup - 1, totalPages);


    //검색 및 정렬
    const onChangeSearch = (e) => {
        setSearch(e.target.value);
    }

    const onChangeSelect = (e) => {
        setSelect(e.target.value)
    }

    const filterData = () => {
        let filteredUsers = users
        if (search !== "") {
            filteredUsers = users.filter(user => {
                let fullName = getFullName(user).toLowerCase();
                return fullName.includes(search.toLowerCase());
            });
        }
        if(select==="up"){
            filteredUsers.sort((a,b)=>{
                let fullNameA = getFullName(a);
                let fullNameB = getFullName(b);

                if(fullNameA<fullNameB) return -1;
                if(fullNameA>fullNameB) return 1;
                return 0;
            })
        }
        else if (select === "down") {
            filteredUsers.sort((a, b) => {
                let fullNameA = getFullName(a);
                let fullNameB = getFullName(b);
                
                if (fullNameA > fullNameB) return -1;
                if (fullNameA < fullNameB) return 1;
                return 0;
            });
        }
        return filteredUsers
    }

    const filteredUsers = filterData();


    if(!users){
        <div>랜덤 사용자 정보를 불러오고 있습니다..</div>
    }

    return(
        <div className='Home'>
            <Header/>
            <div className='func'>
                <select value={select} onChange={onChangeSelect}>
                    <option value="">선택</option>
                    <option value="up">오름차순</option>
                    <option value="down">내림차순</option>
                </select>
                <input
                    value={search}
                    onChange={onChangeSearch}
                    placeholder='사용자를 이름으로 검색해보세요!'
                />
            </div>
            <div className='container'>
                {filteredUsers.map((user, index)=>(
                    <UserBox
                        key={index}
                        name={`${user.name.first}${user.name.last}`}
                        gender={user.gender}
                        location={user.location.country}
                        image={user.picture.large}
                        phone={user.phone}
                        email={user.email}
                    />
                ))}
            </div>
            <div className='paging'>
                <button onClick={handlePreviousGroup} disabled={startPage === 1}>{'<'}</button>
                {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                    <button
                        key={index}
                        className={currentPage === startPage + index ? 'active' : ''}
                        onClick={() => handlePageChange(startPage + index)}
                    >
                        {startPage + index}
                    </button>
                ))}
                <button onClick={handleNextGroup} disabled={endPage === totalPages}>{'>'}</button>
            </div>

        </div>
    );
}
export default Home;


