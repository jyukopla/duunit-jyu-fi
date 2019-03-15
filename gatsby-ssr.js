import React from 'react';
import { withPrefix } from 'gatsby';

export const onRenderBody = ({ setHeadComponents, setHtmlAttributes }) => {
  setHtmlAttributes({ lang: 'en' });
  setHeadComponents([
    <link
      key={'apple-touch-icon'}
      rel="apple-touch-icon"
      href={withPrefix('/icons/icon-48x48.png')}
    />,
    <link
      key={'apple-touch-icon-72'}
      rel="apple-touch-icon"
      sizes="72x72"
      href={withPrefix('/icons/icon-72x72.png')}
    />,
    <link
      key={'apple-touch-icon-96'}
      rel="apple-touch-icon"
      sizes="96x96"
      href={withPrefix('/icons/icon-96x96.png')}
    />,
    <link
      key={'apple-touch-icon-144'}
      rel="apple-touch-icon"
      sizes="144x144"
      href={withPrefix('/icons/icon-144x144.png')}
    />,
    <link
      key={'apple-touch-icon-192'}
      rel="apple-touch-icon"
      sizes="192x192"
      href={withPrefix('/icons/icon-192x192.png')}
    />,
    <link
      key={'apple-touch-icon-256'}
      rel="apple-touch-icon"
      sizes="256x256"
      href={withPrefix('/icons/icon-256x256.png')}
    />,
    <link
      key={'apple-touch-icon-384'}
      rel="apple-touch-icon"
      sizes="384x384"
      href={withPrefix('/icons/icon-384x384.png')}
    />,
    <link
      key={'apple-touch-icon-512'}
      rel="apple-touch-icon"
      sizes="512x512"
      href={withPrefix('/icons/icon-512x512.png')}
    />,
  ]);
};
