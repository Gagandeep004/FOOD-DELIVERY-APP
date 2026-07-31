function Hero({ searchTerm, setSearchTerm }) {
  return (
    <section className="hero">
      <h1>Delicious Food Delivered To Your Door</h1>
      <p>Order from top restaurants & favorite dishes in minutes.</p>

      {setSearchTerm && (
        <div className="search-container">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            className="search-input"
            placeholder="Search restaurants, cuisines, or dishes..."
            value={searchTerm || ""}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}
    </section>
  );
}

export default Hero;