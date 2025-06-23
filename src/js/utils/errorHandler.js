export class ErrorHandler {
    static showError(message, type = 'error') {
        const errorContainer = document.createElement('div');
        errorContainer.className = `alert alert-${type}`;
        errorContainer.innerHTML = `
            <div class="alert-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
                <button class="close-alert">×</button>
            </div>
        `;

        document.body.appendChild(errorContainer);

        // Auto-remove after 5 seconds
        setTimeout(() => {
            errorContainer.remove();
        }, 5000);

        // Allow manual close
        errorContainer.querySelector('.close-alert').addEventListener('click', () => {
            errorContainer.remove();
        });
    }

    static handleApiError(error) {
        console.error('API Error:', error);
        
        let message = 'An unexpected error occurred. Please try again later.';
        
        if (error.response) {
            // Server responded with error
            switch (error.response.status) {
                case 404:
                    message = 'The requested resource was not found.';
                    break;
                case 403:
                    message = 'You do not have permission to perform this action.';
                    break;
                case 429:
                    message = 'Too many requests. Please try again later.';
                    break;
                default:
                    message = error.response.data?.message || message;
            }
        } else if (error.request) {
            // Request made but no response
            message = 'Unable to connect to the server. Please check your internet connection.';
        }

        this.showError(message);
    }

    static handleLoadError(element, fallbackUrl) {
        element.onerror = () => {
            console.warn(`Failed to load: ${element.src}`);
            if (fallbackUrl) {
                element.src = fallbackUrl;
            }
        };
    }
}

// Loading state handler
export class LoadingState {
    constructor(container) {
        this.container = container;
        this.loadingElement = null;
    }

    show() {
        this.loadingElement = document.createElement('div');
        this.loadingElement.className = 'loading-spinner';
        this.loadingElement.innerHTML = `
            <div class="spinner"></div>
            <p>Loading...</p>
        `;
        this.container.appendChild(this.loadingElement);
    }

    hide() {
        if (this.loadingElement) {
            this.loadingElement.remove();
            this.loadingElement = null;
        }
    }
} 