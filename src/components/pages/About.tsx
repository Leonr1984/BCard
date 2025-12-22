export const About: React.FC = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h1>About BCard</h1>

        <section>
          <h2>What is BCard?</h2>
          <p>
            BCard is a professional business card management platform that
            allows businesses and entrepreneurs to create, share, and manage
            their digital business cards online.
          </p>
        </section>

        <section>
          <h2>Features</h2>
          <ul>
            <li>Create professional business cards</li>
            <li>Share cards with a global audience</li>
            <li>Mark favorite cards for easy access</li>
            <li>Search and discover businesses</li>
            <li>Dark mode support for better viewing experience</li>
            <li>Admin CRM system for user management</li>
          </ul>
        </section>

        <section>
          <h2>How It Works</h2>
          <ol>
            <li>Sign up for a free account</li>
            <li>Create your business card with all your information</li>
            <li>Share your card with the community</li>
            <li>Browse and save favorite cards</li>
            <li>Manage your profile and cards</li>
          </ol>
        </section>

        <section>
          <h2>Contact Us</h2>
          <p>Email: support@bcard.com</p>
          <p>Phone: +97239504019</p>
        </section>
      </div>
    </div>
  );
};
