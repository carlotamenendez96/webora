import { useEffect } from 'react';

interface DocumentHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  canonical?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  author?: string;
  robots?: string;
  lang?: string;
}

export const useDocumentHead = (props: DocumentHeadProps) => {
  useEffect(() => {
    const { 
      title, 
      description, 
      keywords, 
      ogTitle, 
      ogDescription, 
      ogImage, 
      ogUrl,
      canonical,
      twitterCard,
      twitterTitle,
      twitterDescription,
      twitterImage,
      author,
      robots,
      lang
    } = props;

    // Update document title
    if (title) {
      document.title = title;
    }

    // Update meta description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (!metaDescription) {
        metaDescription = document.createElement('meta');
        metaDescription.setAttribute('name', 'description');
        document.head.appendChild(metaDescription);
      }
      metaDescription.setAttribute('content', description);
    }

    // Update meta keywords
    if (keywords) {
      let metaKeywords = document.querySelector('meta[name="keywords"]');
      if (!metaKeywords) {
        metaKeywords = document.createElement('meta');
        metaKeywords.setAttribute('name', 'keywords');
        document.head.appendChild(metaKeywords);
      }
      metaKeywords.setAttribute('content', keywords);
    }

    // Update Open Graph meta tags
    if (ogTitle) {
      let ogTitleMeta = document.querySelector('meta[property="og:title"]');
      if (!ogTitleMeta) {
        ogTitleMeta = document.createElement('meta');
        ogTitleMeta.setAttribute('property', 'og:title');
        document.head.appendChild(ogTitleMeta);
      }
      ogTitleMeta.setAttribute('content', ogTitle);
    }

    if (ogDescription) {
      let ogDescMeta = document.querySelector('meta[property="og:description"]');
      if (!ogDescMeta) {
        ogDescMeta = document.createElement('meta');
        ogDescMeta.setAttribute('property', 'og:description');
        document.head.appendChild(ogDescMeta);
      }
      ogDescMeta.setAttribute('content', ogDescription);
    }

    if (ogImage) {
      let ogImageMeta = document.querySelector('meta[property="og:image"]');
      if (!ogImageMeta) {
        ogImageMeta = document.createElement('meta');
        ogImageMeta.setAttribute('property', 'og:image');
        document.head.appendChild(ogImageMeta);
      }
      ogImageMeta.setAttribute('content', ogImage);
    }

    // Update canonical URL
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      if (!canonicalLink) {
        canonicalLink = document.createElement('link');
        canonicalLink.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalLink);
      }
      canonicalLink.setAttribute('href', canonical);
    }

    // Update Open Graph URL
    if (ogUrl) {
      let ogUrlMeta = document.querySelector('meta[property="og:url"]');
      if (!ogUrlMeta) {
        ogUrlMeta = document.createElement('meta');
        ogUrlMeta.setAttribute('property', 'og:url');
        document.head.appendChild(ogUrlMeta);
      }
      ogUrlMeta.setAttribute('content', ogUrl);
    }

    // Update Twitter Card meta tags
    if (twitterCard) {
      let twitterCardMeta = document.querySelector('meta[name="twitter:card"]');
      if (!twitterCardMeta) {
        twitterCardMeta = document.createElement('meta');
        twitterCardMeta.setAttribute('name', 'twitter:card');
        document.head.appendChild(twitterCardMeta);
      }
      twitterCardMeta.setAttribute('content', twitterCard);
    }

    if (twitterTitle) {
      let twitterTitleMeta = document.querySelector('meta[name="twitter:title"]');
      if (!twitterTitleMeta) {
        twitterTitleMeta = document.createElement('meta');
        twitterTitleMeta.setAttribute('name', 'twitter:title');
        document.head.appendChild(twitterTitleMeta);
      }
      twitterTitleMeta.setAttribute('content', twitterTitle);
    }

    if (twitterDescription) {
      let twitterDescMeta = document.querySelector('meta[name="twitter:description"]');
      if (!twitterDescMeta) {
        twitterDescMeta = document.createElement('meta');
        twitterDescMeta.setAttribute('name', 'twitter:description');
        document.head.appendChild(twitterDescMeta);
      }
      twitterDescMeta.setAttribute('content', twitterDescription);
    }

    if (twitterImage) {
      let twitterImageMeta = document.querySelector('meta[name="twitter:image"]');
      if (!twitterImageMeta) {
        twitterImageMeta = document.createElement('meta');
        twitterImageMeta.setAttribute('name', 'twitter:image');
        document.head.appendChild(twitterImageMeta);
      }
      twitterImageMeta.setAttribute('content', twitterImage);
    }

    // Update author
    if (author) {
      let authorMeta = document.querySelector('meta[name="author"]');
      if (!authorMeta) {
        authorMeta = document.createElement('meta');
        authorMeta.setAttribute('name', 'author');
        document.head.appendChild(authorMeta);
      }
      authorMeta.setAttribute('content', author);
    }

    // Update robots
    if (robots) {
      let robotsMeta = document.querySelector('meta[name="robots"]');
      if (!robotsMeta) {
        robotsMeta = document.createElement('meta');
        robotsMeta.setAttribute('name', 'robots');
        document.head.appendChild(robotsMeta);
      }
      robotsMeta.setAttribute('content', robots);
    }

    // Update language
    if (lang) {
      document.documentElement.lang = lang;
    }
  }, [props]);
};

// Component wrapper for easier use
export const DocumentHead: React.FC<DocumentHeadProps> = (props) => {
  useDocumentHead(props);
  return null;
};
