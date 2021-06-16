![Gabi The Label Logo](https://scontent.fsin9-2.fna.fbcdn.net/v/t1.6435-9/29243623_430084794098366_4375454635234689024_n.jpg "Gabi The Label")

**A brief story about Gabi The Label**

- A real start-up by my sister!
- Born from her love of art+design+fashion, digital marketing expertise, and entreprenuerial know-how accumulated from years of hands-on work with local start-ups
- One of the reasons why I took this course --> saw the power of e-commerce/social media .:. wanted to explore ways to grow+diversify the business

**Technologies used and the approach taken**

- Pretty run-of-the-mill boilerplate for e-commerce sites
- Cart feature was the bane of my life
  - used 2 static js files + had to be creative with my controller routing
  - used a combi of css + js to hide the ugly/phantom cart content

**Unsolved Problems**

- Unstable cart feature

**Notes to self**

- Build search function
- Code newsletter subscription sign-up feature
- Build check-out/payments process

**CRUD and RESTful Routes**

1. Index - GET /products
2. New - GET /products/:slug (add to cart), /users/register
3. Create - POST create cart, create user account
4. Show - GET /products/:slug, /cart, /users/account
5. Edit - GET /cart, /users/account
6. Update - PATCH cart, user account information
7. Destroy - DELETE cart

**Link to app**
https://gabithelabel.herokuapp.com/
