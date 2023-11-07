import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="error-page">
      <img
        src="/images/error-image.png" // Replace with website image and error
        alt="Oops, something went wrong"
      />
      <div className="error-content">
        <h1>Oops! We Spilled the Soup!</h1>
        <p>Sorry, an unexpected error has occurred while cooking up this page.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
        <p>Don't worry, our chefs are on it and will have it fixed soon.</p>
        <button
          onClick={() => window.location.reload()} // Reloading the page
        >
          Try Again
        </button>
      </div>
    </div>
  );
}