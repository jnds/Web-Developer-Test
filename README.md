# Intro
- Open index.HTML to run the demo
- See Dev folder for source code 
- See "Library" folder for processed code (CSS & JS are left unminified for readability)


# HTML 
- markup added and validated according to w3c Markup Validation Service


# CSS
- used Sass CSS processor with separate files for components. 
- Includes basic layouts & mobile first approach for responsive design
- See Dev > SCSS for uncompiled scss components
- See Library > CSS > style.css for compiled CSS file


# JavaScript 
Used object literal pattern (with jQuery) to demonstrate the following:
- simple modular javascript approach
- scalability & separation of concerns 
- efficient DOM usage


# Task Runners 
- run "npm install" to install Gulp dependencies

## Gulp commands

- gulp sass     :     Watch .scss files
- gulp scripts  :     Concatenate and uglify JS
- gulp watch    :     Watch and compile CSS and JS
- gulp build    :     Build task 
- gulp          :     Default task = build


# To do:
- Disable Buy Now button when basket is empty
- Implement AJAX to post JSON formatted product data to a REST API endpoint
- Determine a more suitable pattern for checkout module / incorporate a JS framework
- Refine styles to accurately match the creative mockup
- Test Microsoft Edge
