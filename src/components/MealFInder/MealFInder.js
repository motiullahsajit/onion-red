import React, { useEffect, useState } from 'react';
import Meal from '../Meal/Meal';

const MealFInder = (props) => {
    const user = props.user
    const setUser = props.state
    const [loading, setLoading] = useState(true);
    const [search, setSerch] = useState('');
    const [meals, setMeals] = useState([]);
    const handleChange = event => {
        const search = (event.target.value)
        setSerch(search)
    }
    useEffect(() => {
        setLoading(true)
        const fetchData = async () => {
            const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`;
            const res = await fetch(url);
            const data = res.json()
            setLoading(false)
            return data;
        }
        fetchData().then(data => setMeals(data?.meals));
    }, [search])

    return (
        <div className='bg-dark p-3'>
            <button className='float-end btn btn-warning text-white' onClick={()=>setUser(!user)}>Sing Out</button>
            <h1 className='text-center text-warning py-4'>Welcome {user.email.substring(0, user.email.indexOf("@"))} Find Your Fav Foods</h1>
            <div className="d-flex justify-content-between p-4 px-5 container">
                <input type="text" className='w-75' onChange={handleChange} placeholder='Search for meals...' />
                {
                    loading && <div className="spinner-border text-warning" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                }
                <h3 className='text-warning'>Meals found : {meals?.length || 0}</h3>
            </div>
            <div className='container'>
                <div className="d-flex justify-content-center">

                </div>
                <div className="row row-cols-1 row-cols-md-3 g-4">
                    {
                        meals === null ? <h1 className='text-center text-danger'>No Results Found</h1> : meals?.map(meal => <Meal key={meal.idMeal} meal={meal} />)
                    }
                </div>
            </div>
        </div>
    );
};

export default MealFInder;
