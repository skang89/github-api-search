/**
 * 
 * src/components/LoadingSpinner/LoadingSpinner.jsx
 * 
 * loading spinner component
 * 
 */

const LoadingSpinner = () => {
	return (
		<div
			className="loading-spinner-container"
			role="status"
			aria-live="polite"
		>
			<div className="loading-spinner" aria-label="Loading">
				<div className="spinner"></div>
			</div>

			<p className="loading-spinner-message">
				Loading repositories...
			</p>
		</div>
	);
};

export default LoadingSpinner;
