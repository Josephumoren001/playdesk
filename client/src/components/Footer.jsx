import envelope from "../assets/envelope.svg";
import LinkedinFooter from "../assets/smalllinkedin.svg";
import discord from "../assets/discord.svg";
import youtube from "../assets/youtube-logo.svg";
import facebook from "../assets/facebook-logo.svg"
import { Link } from "react-router-dom";
const Footer = () => {
 
  return (
    <div className="bg-[#0C273D] px-5 lg:px-20 text-white py-12 lg:py-12">
     

      <div className="text-[#AAA] flex justify-between pt-24 text-[20px] font-semibold">
        <div>
          <p>©2024 PlayDesk</p>
        </div>
        <div>
            <p>
            FAQs
            </p>
        </div>
        <div>
            <p>Privacy Policy</p>
        </div>
        <div>
          <Link to='/consulting'>
            <p>Feedback</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
