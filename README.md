<h2>Shorten URL Microservice</h2>

<h4>User Stories</h4>
<ol>
	<li>I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.</li>
	<li>If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.</li>
	<li>When I visit that shortened URL, it will redirect me to my original link.</li>
</ol>

<cite>
	*shortened* - the hostname "https://smoore-short-url.herokuapp.com/" is longer than many URLs, which confuses the intention of this Microservice.<br />  
	It displays the ability to represent a standard URL as an integer.  This is the same functionality as <a href="http://tinyurl.com" target="_blank">tinyurl.com</a>.<br />
	This Microservice is intended for educational purposes to show NodeJS and ExpressJS Routing, as well as MongoDB CRUD and auto-increment functionality.
</cite>

<h3>Sample request</h3>
<div><code>https://smoore-short-url.herokuapp.com/new/http://www.google.com/</code></div>
<h3>Sample results</h3>
<div><code>{"original_url":"http://www.google.com/", "short_url":"https://smoore-short-url.herokuapp.com/3"}</code></div>

<div>
	short_url <code>https://smoore-short-url.herokuapp.com/3</code> 
	takes you to the original_url <code>http://www.google.com/</code>
</div>