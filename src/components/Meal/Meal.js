import React from 'react';

const Meal = (props) => {
    const { strMealThumb, strMeal } = props.meal;
    return (
        <div className="col">
            <div className="card h-100">
                <img src={strMealThumb} className="card-img-top" alt={strMeal} />
                <div className="card-body text-white bg-warning">
                    <h2 className="card-title">{strMeal}</h2>
                    <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                </div>
            </div>
        </div>
    );
};

export default Meal;