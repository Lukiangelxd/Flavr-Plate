import React from 'react';

function Home() {
  return (
    <div className="site-wrapper">
      <header>
        <nav>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Services</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <h1>Welcome to Our Website</h1>
        <p>This is the home page of our website. You can add your content here.</p>
        
        <div className="category-container">
          <h2>Category 1</h2>
          {/* Add content for Category 1 here */}
        </div>
        
        <div className="category-container">
          <h2>Category 2</h2>
          {/* Add content for Category 2 here */}
        </div>
        
        <div className="category-container">
          <h2>Category 3</h2>
          {/* Add content for Category 3 here */}
        </div>
        
        <div className="category-container">
          <h2>Category 4</h2>
          {/* Add content for Category 4 here */}
        </div>
      </main>

      <footer className="footer">
        &copy; 2023 Your Website
      </footer>
    </div>
  );
}

export default Home;