import "./About.css"

function About() {
  return (
    <>
      <div className="about-container">

        <h1>About Shoes Arena</h1>

        <p className="about-intro">
          Shoes Arena is an online footwear store built for sneaker lovers
          and fashion enthusiasts. Our goal is to provide high quality
          shoes that combine comfort, durability and modern design.
        </p>

        <div className="about-section">

          <div className="about-card">
            <h2>Our Mission</h2>
            <p>
              Our mission is to bring stylish and comfortable footwear to
              everyone. We carefully select every product so customers
              receive the best experience possible.
            </p>
          </div>

          <div className="about-card">
            <h2>What We Offer</h2>
            <p>
              From casual sneakers to premium designer shoes, our
              collection offers something for every style and occasion.
            </p>
          </div>

          <div className="about-card">
            <h2>Customer First</h2>
            <p>
              Customer satisfaction is our priority. We constantly improve
              our service to ensure a smooth shopping experience.
            </p>
          </div>

        </div>

      </div>
    </>
  )
}

export default About