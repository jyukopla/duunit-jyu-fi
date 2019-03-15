import React from 'react';
import { LocationProvider } from '@reach/router';
import { navigate, withPrefix } from 'gatsby';
import objectFitImages from 'object-fit-images';

const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent);
};

const isStandalone = () => {
  return (window.matchMedia('(display-mode: standalone)').matches);
};

// Save navigated location; Restore it on reload
const useStickyLocation = current => {
  let previous = localStorage.getItem('location') || null;
  localStorage.setItem('location', current);
  if (window.history.length <= 1 && previous !== null && previous !== current) {
    const prefix = withPrefix('/');
    while (prefix !== '/' && previous.startsWith(prefix)) {
      previous = `/${previous.substr(withPrefix('/').length)}`;
    }
    navigate(previous);
  }
};

export const wrapRootElement = ({ element }) => (
  <LocationProvider>
    {({ location }) => {
      if ((isIos() && window.navigator.standalone) || isStandalone()) {
        useStickyLocation(location.pathname + (location.hash || ''));
      }
      return element;
    }}
  </LocationProvider>
);

export const onInitialClientRender = () => {
  objectFitImages();
};
