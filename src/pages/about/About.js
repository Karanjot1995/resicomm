import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './About.scss';

function About({setIsLoggedIn}) {
  const navigate = useNavigate();
   return (
     <div className="pt-50">
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
 
export default About;

