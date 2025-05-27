import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import './Admin.css';
import Admin from './Admin';
import { fetchInstagramPosts } from './lib/instagramClient';

function PublicSite() {
  const [instagramPosts, setInstagramPosts] = useState<{ id: string; media_url: string; permalink: string; caption: string; media_type: string; thumbnail_url?: string }[]>([]);
  const [visiblePosts, setVisiblePosts] = useState(12);
  const [loading, setLoading] = useState(true); // Track loading state
  const INSTAGRAM_API_TOKEN = import.meta.env.VITE_INSTAGRAM_API_TOKEN || '';

  const nutritionTips = [
    "Drink plenty of water to stay hydrated.",
    "Include more fruits and vegetables in your diet.",
    "Choose whole grains over refined grains.",
    "Limit your intake of added sugars and salt.",
    "Incorporate healthy fats like avocados and nuts.",
    "Plan your meals to avoid unhealthy snacking.",
    "Eat a variety of foods to get all the nutrients you need.",
    "Practice mindful eating and enjoy your meals."
  ];

  const randomTip = nutritionTips[Math.floor(Math.random() * nutritionTips.length)];

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await fetchInstagramPosts(INSTAGRAM_API_TOKEN);

        if (!posts || posts.length === 0) {
          console.error('Error: No Instagram posts fetched.');
          return;
        }

        setInstagramPosts(posts);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setLoading(false); // Stop loading once the fetch is complete
      }
    };

    fetchPosts();
  }, []);

  const handleViewMore = () => {
    setVisiblePosts((prev) => Math.min(prev + 3, instagramPosts.length)); // Show 5 more posts or all remaining posts
  };

  return (
    <div className="app">
      {/* Navigation */}
      <nav className="nav">
        <Link to="/" className="nav-logo">Alana Eats</Link>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#recipes">Recipes</a>
          <a href="#blog">Blog</a>
          <a href="#certifications">Certifications</a>
          <Link to="/admin">Admin</Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Healthy Eating Made Delicious</h1>
          <p>Discover nutritious recipes, wellness tips, and food inspiration for a healthier lifestyle.</p>
        </div>
      </section>

      {/* Combined About Me and Instagram Section */}
      <section id="about-instagram" className="section">
        <div className="section-content combined-section">
          <div className="about-me">
            <h2 className="section-title">About Me</h2>
            <div className="profile-block">
              <img src="../assets/sb-burger.jpg" alt="Profile" className="profile-picture" />
              <div className="description">
                <p>Hi, I’m Alana! I’m a Registered Dietitian and food enthusiast dedicated to making healthy eating both delicious and accessible. With years of experience in nutrition and cooking, I share my knowledge through recipes, Instagram posts, and cooking tips.</p>
                <p>My mission is to inspire others to embrace a healthy lifestyle without compromising on taste. Through my platform, I aim to show that nutritious food can be both satisfying and enjoyable.</p>
              </div>
            </div>
          </div>
          <div className="instagram-posts">
            <h2 className="section-title">Latest Instagram Posts</h2>
            {loading ? (
              <div className="loading-indicator">
                <img src="../assets/avo.svg" alt="Loading..." className="spinning-icon" />
                <p>{randomTip}</p>
              </div>
            ) : (
              <div className="instagram-grid">
                {instagramPosts.slice(0, visiblePosts).map((post) => (
                  <a key={post.id} href={post.permalink} target="_blank" rel="noopener noreferrer" className="instagram-post">
                    <div className="instagram-post-image">
                      {post.media_type === 'VIDEO' ? (
                        post.thumbnail_url ? (
                          <img src={post.thumbnail_url} alt={post.caption || 'Instagram Video'} />
                        ) : (
                          <video controls>
                            <source src={post.media_url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        )
                      ) : (
                        <img src={post.media_url} alt={post.caption || 'Instagram Post'} />
                      )}
                      <div className="instagram-post-caption">{post.caption || 'View Post'}</div>
                    </div>
                  </a>
                ))}
              </div>
            )}
            {!loading && visiblePosts < instagramPosts.length && (
              <button className="view-more-button" onClick={handleViewMore}>
                View More
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section id="recipes" className="section">
        <div className="section-content">
          <h2 className="section-title">Featured Recipes</h2>
          <div className="recipe-grid">
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <h3>Alana Eats</h3>
          <div className="footer-links">
            <a href="#about">About</a>
            <a href="#instagram">Posts</a>
            <a href="#recipes">Recipes</a>
            <a href="#contact">Contact</a>
          </div>
          <p>© {new Date().getFullYear()} Alana Eats. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;