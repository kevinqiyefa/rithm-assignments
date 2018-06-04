# How The Web Works Solutions

1.  What is HTTP?

* HTTP stands for Hypertext Transfer Protocol, it's a protocol that governs how clients get data from or send data to a server, which also means the set of rules for transferring files on World Wide Web.

2.  What is a URL?

* URL stands for Uniform Resource Locator, and is used to specify addresses on the World Wide Web.

3.  What is TCP?

* The Transmission Control Protocol (TCP) is one of the main protocols of the Internet protocol suite. It means breaking up and putting/packing the data/file all together again. If the data is missing then it will make the request again.

4.  What is IP?

* The Internet Protocol (IP) is the protocol that governs how data is sent across a network from one computer to another.

5.  What is DNS?

* The Domain Name System (DNS) is the 'phonebook' of the Internet. Also, this system will take the URLs anc convert into IP address.

6.  What is idempotent?

* Refers to an operation that can be repeated many times on a set of data and the state of the set of data will not change.

7.  What is a query string?

* A querystring is a set of characters input to a computer or Web browser and sent to a query program to recover specific information from a database.

8.  What is a path or route?

* A path may relate to a file that the web server has in its hard drive or an abstract resource that the web server is able to create, read update or delete. These are also called routes.

9.  List four HTTP Verbs and their use cases.

* GET - get some data from the server
* POST - send some data to the server
* PUT - update data
* DELETE - remove data

10. What is a client?

* A client can be a simple application or a whole system that accesses services being provided by a server.

11. What is a server?

* It's a computer that can receive requests from clients and issue responses.

12. What is an HTTP request?

* An HTTP client sends an HTTP request to a server in the form of a request message.

13. What is an HTTP response?

* The server sends the HTML page back to the requesting computer (the browser) via a HTTP response message.

14. What is an HTTP header? Give a couple examples of request and response headers you have seen.

* Headers provide additional information about the request or the response.
* Request headers can include information about: Cache-Control, Server, Cookies, User-Agent
* Response headers can include information about: Content-Type, Last-Modified, Set-Cookie, Cache-Control

15. What is REST?

* REST (REpresentational State Transfer) is an architectural style, and an approach to communications that is often used in the development of Web services.

16. What is JSON?

* JavaScript Object Notation, it's a syntax for storing and exchanging data.

17. What happens when you type in "Hello World" in google.com and press enter?

* DNS Lookup
* HTTP GET Request
* Server Receives Request
* HTTP Response
* Browser Creates DOM
* GET Requests for Images/Scripts/CSS

18. What does it mean when we say the web is "stateless"?

* This means that each command is executed independently, without any knowledge of the commands that came before it.

19. What is curl?

* curl is a command-line tool used to send data to or receive data from a server. For example, to make sample HTTP requests, we will use the curl command line tool which allows us to issue HTTP requests from the terminal: curl https://icanhazdadjoke.com/search\?term\=pirate

20. Make a GET request to the icanhazdadjoke API with curl to find all jokes involving the word "pirate." (your answer should be the curl command required).

* curl https://icanhazdadjoke.com/search\?term\=pirate
