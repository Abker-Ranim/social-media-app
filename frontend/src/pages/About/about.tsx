import React from 'react';
import './about.css'; 
const About: React.FC = () => {
  return (
   
      <div className="about-content">
        <h1>Welcome to NEXUM! 🌐✨</h1>
        <p>
          At <strong>NEXUM</strong>, we believe in the power of authentic connections and meaningful interactions.
          We’ve built a dynamic platform where users can share moments, engage with friends, and connect with new
          people around the world.
        </p>

        <h2>What makes NEXUM unique?</h2>
        <ul>
          <li>
            <strong>Post and share moments</strong>: Share photos, or text to express what matters most
            to you.
          </li>
          <li>
            <strong>Like and comment</strong>: Show support for others' posts by giving a "Like" or leaving a
            comment.
          </li>
          <li>
            <strong>Personalize your profile</strong>: Change your profile picture and cover photo anytime, and
            showcase your personality.
          </li>
          <li>
            <strong>Follow and be followed</strong>: Build connections with people around the globe.
          </li>
          <li>
            <strong>Communicate in real-time</strong>: Use our instant messaging system to chat with friends.
          </li>
        </ul>

        <h2>Our mission</h2>
        <p>
          We created NEXUM to offer a complete social experience with a focus on ease of use and authentic
          interactions. Join us today and start sharing, interacting, and discovering new people from around the
          world!
        </p>
      </div>
  );
};

export default About;
