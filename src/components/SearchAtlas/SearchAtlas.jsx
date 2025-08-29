import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const SearchAtlas = () => {
  const location = useLocation();
  const uuid = import.meta.env.VITE_SEARCHATLAS_UUID;
  const enabled = import.meta.env.VITE_SEARCHATLAS_ENABLED === 'true';

  useEffect(() => {
    if (!enabled || !uuid) {
      console.log('SearchAtlas is disabled or UUID not provided');
      return;
    }

    // Function to load SearchAtlas script
    const loadSearchAtlasScript = () => {
      // Check if script already exists
      if (document.getElementById('sa-dynamic-optimization')) {
        return;
      }

      // Create and inject the SearchAtlas script
      const script = document.createElement('script');
      script.id = 'sa-dynamic-optimization';
      script.setAttribute('nowprocket', '');
      script.setAttribute('nitro-exclude', '');
      script.type = 'text/javascript';
      script.setAttribute('data-uuid', uuid);
      
      // Base64 encoded SearchAtlas script
      script.src = `data:text/javascript;base64,dmFyIHNjcmlwdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NjcmlwdCcpOwpzY3JpcHQuc3JjID0gJ2h0dHBzOi8vb3R0by5zZWFyY2hhdGxhcy5jb20vanMvZHluYW1pY19vcHRpbWl6YXRpb24uanMnOwpzY3JpcHQuc2V0QXR0cmlidXRlKCdkYXRhLXV1aWQnLCAnJyArIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCJzYS1keW5hbWljLW9wdGltaXphdGlvbiIpLmdldEF0dHJpYnV0ZSgnZGF0YS11dWlkJykpOwpkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHNjcmlwdCk7`;
      
      document.head.appendChild(script);

      // Also add the actual SearchAtlas script
      const actualScript = document.createElement('script');
      actualScript.src = 'https://otto.searchatlas.com/js/dynamic_optimization.js';
      actualScript.setAttribute('data-uuid', uuid);
      actualScript.async = true;
      document.head.appendChild(actualScript);

      console.log('SearchAtlas script loaded with UUID:', uuid);
    };

    // Load script on component mount
    loadSearchAtlasScript();

    // Track page views on route change
    if (window.SearchAtlas) {
      window.SearchAtlas.trackPageView({
        url: window.location.href,
        path: location.pathname,
        title: document.title
      });
    }

  }, [location, uuid, enabled]);

  // Track events
  useEffect(() => {
    if (!enabled) return;

    // Add global SearchAtlas tracking functions
    window.SearchAtlasTrack = {
      // Track custom events
      event: (eventName, data = {}) => {
        if (window.SearchAtlas) {
          window.SearchAtlas.track(eventName, {
            ...data,
            timestamp: new Date().toISOString(),
            url: window.location.href
          });
        }
      },

      // Track form submissions
      formSubmit: (formName, formData = {}) => {
        if (window.SearchAtlas) {
          window.SearchAtlas.track('form_submit', {
            form_name: formName,
            form_data: formData,
            timestamp: new Date().toISOString()
          });
        }
      },

      // Track content engagement
      contentEngagement: (contentType, contentId, action) => {
        if (window.SearchAtlas) {
          window.SearchAtlas.track('content_engagement', {
            content_type: contentType,
            content_id: contentId,
            action: action,
            timestamp: new Date().toISOString()
          });
        }
      },

      // Track conversion events
      conversion: (type, value = null) => {
        if (window.SearchAtlas) {
          window.SearchAtlas.track('conversion', {
            conversion_type: type,
            conversion_value: value,
            timestamp: new Date().toISOString()
          });
        }
      }
    };

    // Track early signup form submissions
    const trackSignupSubmission = (e) => {
      if (e.detail && e.detail.formType === 'early_signup') {
        window.SearchAtlasTrack.formSubmit('early_signup', e.detail.data);
        window.SearchAtlasTrack.conversion('early_signup', 1);
      }
    };

    window.addEventListener('formSubmitted', trackSignupSubmission);

    return () => {
      window.removeEventListener('formSubmitted', trackSignupSubmission);
    };
  }, [enabled]);

  return null; // This component doesn't render anything
};

export default SearchAtlas;