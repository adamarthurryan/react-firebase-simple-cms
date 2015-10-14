# Notes

## Architecture 

 - [https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750]
 - Higher Order Component example: [https://gist.github.com/sebmarkbage/ef0bf1f338a7182b6775]
 - https://github.com/erikras/react-redux-universal-hot-example

## Data

  - [http://engineering.wework.com/process/2015/10/01/react-reflux-to-redux/]

## Dynamic Forms

 - meh [NewForms](http://newforms.readthedocs.org/) 
 - [React Forms](http://prometheusresearch.github.io/react-forms/)
 - [34 Form Examples](http://react.rocks/tag/Form)
 - nice, but uses Kendo UI widgets [WingSpan Forms](https://github.com/wingspan/wingspan-forms)
 - [WingSpan Forms Example](http://www.dustingetz.com/2014/02/18/react-dynamic-forms.html)

## Hosting

URL rewriting should be used to serve index.html for all paths within the single page app. For Firebase hosting see:
https://www.firebase.com/docs/hosting/guide/url-redirects-rewrites.html


## Features

Item edits should have revisions. How to know when a checkpoint occurs? Perhaps all edits occur on draft revisions, which are then "published" (or not).