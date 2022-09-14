import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    const handleSubmit = event  => {
        event.preventDefault();
        const search = document.getElementById("search").value
        navigate('/Searched?query=' + search);
    }
    return (
        <div id='Home'>
            <section className='search'>
                <form action="#" onSubmit={handleSubmit}>
                    <div className='wrap-input'>
                        <input className='search-input' id='search' type="text" />
                        <button className='search-button'><i className="bi bi-search" /></button>
                    </div>
                </form>
            </section>
        </div>
    )
}

export default Home