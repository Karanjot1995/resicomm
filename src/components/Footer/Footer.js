import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './footer.scss';

function Footer({setIsLoggedIn}) {
  const navigate = useNavigate();

   return (
     <div className="pt-50">
				<section id="contact" className="section">
					<div className="contact-us">
						<div>
							<h2>Contact Us</h2>
						</div>
						<form>
							<label for="name">Name:</label>
							<input type="text" id="name" name="name" required/>
							<label for="email">Email:</label>
							<input type="email" id="email" name="email" required/>
							<label for="message">Message:</label>
							<textarea rows={7} id="message" name="message" required></textarea>
							<a className="custom-btn">Submit</a>
						</form>
					</div>
				</section>
     </div>
   );
}
 
export default Footer;
