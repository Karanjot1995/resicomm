import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './home.scss';

function Home({setIsLoggedIn}) {
  const navigate = useNavigate();
   return (
     <div className="pt-50">
      <section id="home" className="section">
        <h2>Welcome to RESICOMM</h2>

      </section>

      <section id="services" className="section">
        <h2>Our Services</h2>
        <div className="card-container">

    
          <div className="card">
            <div>
              <img src="/images/3.png"/>
            </div>
            <div>
              <h3>Fitness Center</h3>
              <p>Yoga, Zumba, Gym and a lot of other facilities.</p>
            </div>
          </div>
    
          <div className="card">
            <div>
              <img src="./images/4.png"/>
            </div>
            <div>
              <h3>Swimming Pool</h3>
              <p>Kids and Adult swimming pools with 24hr safety.</p>
            </div>
          </div>

          <div className="card">
            <div>
              <img src="./images/1.png"/>
            </div>
            <div>
              <h3>Maintenance</h3>
              <p>24 hr on demand maintenance.</p>
            </div>
          </div>
    
          <div className="card">
            <div>
              <img src="./images/2.png"/>
            </div>
            <div>
              <h3>Security</h3>
              <p>Security camera in every corner and every hallway.</p>
            </div>
          </div>
        </div>

        
      </section>

      <section id="about" className="section">
        <div className="content">
          <h2>About Us</h2>
          <p>Welcome to Terrazas Apartments! Our beautiful complex is located in the heart of the city and is the perfect 
            place for those seeking a convenient and comfortable living experience. We offer a range of spacious and 
            modern floor plans, from studios to two-bedroom apartments, each designed with the needs of our residents 
            in mind. Our apartments feature a range of amenities, such as walk-in closets, in-unit washer/dryers, and balconies 
            with beautiful views. At Terrazas, we take great pride in creating a welcoming environment that feels like home. 
            Our team is made up of friendly and experienced professionals who are available to answer any questions or concerns 
            that you may have. We believe that community is the heart of a great living experience, which is why we offer 
            regular events and activities designed to bring residents together and foster a sense of belonging. Thank you for 
            considering Terrazas for your next home. We look forward to welcoming you into our community and providing you with 
            an exceptional living experience. If you have any questions or would like to schedule a tour, please don't hesitate 
            to contact us.
          </p>
        </div>
      </section>
     </div>
   );
}
 
export default Home;

