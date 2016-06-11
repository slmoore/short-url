#Shorten URL Microservice

##User Stories

<ol>
	<li>I can pass a URL as a parameter and I will receive a shortened URL in the JSON response.</li>
	<li>If I pass an invalid URL that doesn't follow the valid http://www.example.com format, the JSON response will contain an error instead.</li>
	<li>When I visit that shortened URL, it will redirect me to my original link.</li>
</ol>

##Sample request
<div><code>https://smoore-short-url.herokuapp.com/new/https://www.google.com/</code></div>
##Sample results
<div><code>{"original_url":"https://www.google.com/", "short_url":"https://smoore-short-url.herokuapp.com/8170"}</code></div>
##The short_url
<div><code>https://smoore-short-url.herokuapp.com/8170</code></div>
##Redirects to the original_url
<div><code>https://www.google.com/</code></div>