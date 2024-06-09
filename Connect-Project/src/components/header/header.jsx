import React, { useContext, useEffect, useState } from 'react';
import { CiLogout } from 'react-icons/ci'; // Import all necessary icons
import { FiSearch } from "react-icons/fi";
import { GiTeapotLeaves } from "react-icons/gi";
import styles from './header.module.css';
import { useNavigate } from 'react-router-dom';
import Upload from '../create_req/uploadImg2';
import { PostList } from '../../store/posts-list-store';

const Header = () => {
  const { username } = useContext(PostList);
  const isUserLogin = sessionStorage.getItem('isUserLogin');
  const navigate = useNavigate();
  const [quotation, setQuotation] = useState('');
  const fetchRandomQuotation = () => {
    const randomIndex = Math.floor(Math.random() * quotations.length);
    setQuotation(quotations[randomIndex]);
  };


  useEffect(() => {
    // Fetch a random quotation when the component mounts
    fetchRandomQuotation();
  }, []);


  const handleLogOut = () => {
    sessionStorage.clear();
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={`d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start ${styles.headerContent}`}>
          <a href="/" className={`d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none ${styles.logo}`}>
            <GiTeapotLeaves size={24} className="mr-2" /> {/* Tea cup icon */}
          </a>
          <p className={styles.greeting}>
            Hi {username}, {quotation}
          </p>

          <form className={`col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3 text-end ${styles.searchForm}`} role="search">
            <input type="search" className={`form-control form-control-dark text-bg ${styles.searchInput}`} placeholder="Search..." aria-label="Search" />
            <FiSearch size={20} className={styles.searchIcon} /> {/* Search icon */}
          </form>

          {!isUserLogin &&
            <div className={`text-end ${styles.loginButtons}`}>
              <button type="button" className="btn btn-outline-light me-2">Login</button>
              <button type="button" className="btn btn-warning">Sign-up</button>
            </div>
          }
          {isUserLogin &&
            <div className={`text-end ${styles.logoutButton}`}>
              <div className={styles.buttonLogout} onClick={handleLogOut}>
                <CiLogout size={24} />
              </div>
            </div>
          }

        </div>
      </div>
    </header>
  );
}

export default Header;

const quotations = [
  "Scrolling through life, one page at a time.",
  "Life is like scrolling - you never know what surprises await!",
  "Scrolling: the art of exploration in the digital world.",
  "Scrolling is the window to the digital soul.",
  "Every scroll is a chance for discovery.",
  "Keep calm and scroll on!",
  "The world is at your fingertips - keep scrolling!",
  "Share your favorite moments and create lasting memories with friends!",
  "Connect with others to discover new perspectives and stories!",
  "Join the conversation and share your thoughts with a global community!",
  "Explore the world through the eyes of others and find inspiration in everyday moments!",
  "Celebrate the joy of connecting with friends, old and new!",
  "Discover new passions and interests by connecting with fellow enthusiasts!",
  "Share your adventures and experiences to inspire others to explore!",
  "Connect with kindred spirits and build friendships that last a lifetime!",
  "Create connections that go beyond likes and comments to meaningful relationships!",
  "Share the laughter, share the love, and connect with the world around you!",
  "Find your tribe and embrace the journey together!",
  "Connect with others over shared interests and passions!",
  "Share your story and let your voice be heard in a supportive community!",
  "Connect with others in moments big and small, and make every connection count!",
  "Join hands with others to spread positivity and make a difference in the world!",
  "Connect with the heart of humanity and celebrate the beauty of connection!",
  "have a tea and enjoy the scrolling"
];
