import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './Services.scss';

function Services({setIsLoggedIn}) {
  const navigate = useNavigate();
   return (
     <div className="pt-50">

      <section id="services" className="section">
        <h2>Our Services</h2>
        <div className="card-container">

    
          <div className="card">
            <div>
              <img src="/images/3.png"/>
            </div>
            <div>
              <h3>Fitness Center</h3>
              <p>At ResiComm Apartments, we are proud to offer our residents a top-notch gym facility designed to cater to all fitness levels and preferences. Our state-of-the-art fitness center is fully equipped with the latest cardiovascular machines, weightlifting equipment, and a dedicated functional training area, providing the perfect environment for both seasoned athletes and beginners alike. Our gym is open 24/7, allowing residents to conveniently maintain their workout routines and achieve their fitness goals at their own pace. In addition, we host a variety of group exercise classes led by professional trainers, ranging from yoga and pilates to high-energy cardio sessions. At ResiComm Apartments, we are committed to fostering a healthy and active community, and our exceptional gym facility stands as a testament to that dedication.</p>
            </div>
          </div>
    
          <div className="card">
            <div>
              <img src="./images/4.png"/>
            </div>
            <div>
              <h3>Swimming Pool</h3>
              <p>At ResiComm Apartments, we are delighted to offer our residents a luxurious swimming pool facility designed for relaxation, exercise, and socializing. Our pristine pool area boasts a beautifully landscaped environment with comfortable lounge chairs, providing the perfect oasis for residents to unwind and soak up the sun. The expansive pool itself is suitable for swimmers of all skill levels, offering both shallow and deep areas to accommodate various activities, such as leisurely swimming or lap training. Our swimming pool is meticulously maintained, ensuring clean and safe water conditions for all residents to enjoy. In addition, we host a variety of aquatic fitness classes and social events to further enrich our residents' experience. At ResiComm Apartments, we pride ourselves on fostering a vibrant and engaging community, and our exceptional swimming pool facility is just one of the many ways we strive to create an unparalleled living experience.</p>
            </div>
          </div>

          <div className="card">
            <div>
              <img src="./images/1.png"/>
            </div>
            <div>
              <h3>Maintenance</h3>
              <p>The Resicomm apartment maintenance service is a comprehensive solution for all your property upkeep needs. The service offers a variety of options to keep your property in top condition, including regular inspections, repairs, and upgrades. The maintenance team is highly skilled and equipped to handle a wide range of tasks, from fixing a leaky faucet to conducting a full-scale renovation. In addition, the website provides easy access to request maintenance services, track the progress of your request, and communicate with the maintenance team. Whether you are a property owner or a tenant, the Resicomm apartment maintenance service is designed to make your life easier and stress-free. With its commitment to quality, convenience, and customer satisfaction, you can be sure that your property is in good hands..</p>
            </div>
          </div>
    
          <div className="card">
            <div>
              <img src="./images/2.png"/>
            </div>
            <div>
              <h3>Security</h3>
              <p>maintenance service offered for the website.

The Resicomm apartment security service is designed to provide peace of mind for residents and property owners. The service offers a comprehensive approach to security, including advanced technology, trained personnel, and round-the-clock monitoring. The security team is equipped with the latest tools and technology to detect and prevent potential threats, and they are trained to respond quickly and efficiently in the event of an emergency. The website provides easy access to request security services, track the status of your request, and communicate with the security team. Whether you are a property owner or a tenant, the Resicomm apartment security service is designed to give you the confidence that your property is protected. With its commitment to safety, security, and customer satisfaction, you can be sure that your property is in good hands.</p>
            </div>
          </div>
        </div>

        
      </section>

      
     </div>
   );
}
 
export default Services;

