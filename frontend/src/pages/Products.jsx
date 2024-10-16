import React, { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';
import bgHero from "../assets/bgHero.png";  
import { useNavigate } from 'react-router-dom';

const CropRecommendationCard = () => {
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const cardData = [
        {
            image: "https://storage.googleapis.com/kaggle-datasets-images/2891746/4985987/b2d60ecb83da08b41502185097895593/dataset-cover.jpeg?t=2023-02-13-07-14-27",
            title: "Crop Recommendation",
            description: "Find the best crops based on soil and environmental data.",   
            link: "/crop",
            details: (
                <ul>
                    <li>Nitrogen, Phosphorus, Potassium (NPK) levels.</li>
                    <li>Soil pH and moisture levels.</li>
                    <li>Temperature and rainfall data.</li>
                    <li>Crop adaptability and resistance to local pests.</li>
                </ul>
            )
        },
        {
            image: "https://img.freepik.com/premium-photo/digital-design-fertilization-role-nutrients-plant-soil_117255-1850.jpg",
            title: "Fertilizer Prediction",
            description: "Get recommendations for the best fertilizers for your crops.",
            link: "/fertilizer",
            details: (
                <ul>
                    <li>Tailored recommendations based on soil nutrient analysis.</li>
                    <li>Balanced nutrient profiles for different crops.</li>
                    <li>Guidance on organic vs. synthetic fertilizers.</li>
                    <li>Recommendations to improve long-term soil health.</li>
                </ul>
            )
        }
    ];

    const handleCardClick = (card) => {
        setSelectedCard(card);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setSelectedCard(null);
    };

    return (
        <>
            {loading ? <Spinner /> : (
                <div className="max-w-full mt-16 mx-auto px-4 pb-10 pt-5 sm:px-6 lg:px-8" style={{ backgroundImage: `url(${bgHero})` }}>
                    {/* Title Section */}
                    <h1 className="text-2xl text-center text-green-500 font-bold">Explore Our Products</h1>

                    {/* Cards Section */}
                    <div className="flex justify-center gap-10 mt-5">
                        {cardData.map((card, index) => (
                            <div
                                key={index}
                                className="p-4 border-2 border-green-500 shadow-lg rounded-lg cursor-pointer hover:scale-105 hover:rotate-1 hover:shadow-xl transition-all duration-300 ease-in-out"
                                onClick={() => handleCardClick(card)}
                            >
                                <img src={card.image} alt={card.title} className="w-full h-48 object-cover rounded-t-lg" />
                                <div className="p-4">
                                    <h2 className="text-xl font-bold text-green-500">{card.title}</h2>
                                    <p className="mt-2 text-gray-700">{card.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Modal for showing additional details */}
                    {showModal && selectedCard && (
                        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex justify-center items-center z-50">
                            <div className="bg-white rounded-lg p-6 max-w-md w-full">
                                <h2 className="text-2xl font-bold text-green-500">{selectedCard.title}</h2>
                                <p className="mt-4 text-gray-700">{selectedCard.details}</p>

                                {/* Try Now Button */}
                                <button
                                    className="mt-4 w-full px-3 py-2 rounded bg-green-500 text-white font-bold"
                                    onClick={() => navigate(selectedCard.link)}
                                >
                                    Try Now
                                </button>

                                {/* Close Button */}
                                <button
                                    className="mt-2 w-full px-3 py-2 rounded bg-red-500 text-white font-bold"
                                    onClick={closeModal}
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </>
    );
};

export default CropRecommendationCard;
