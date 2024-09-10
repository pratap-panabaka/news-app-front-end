# News App

[Link to Backend](https://github.com/PRATAP-KUMAR/news-app-back-end)

### Prerequisite packages

1. You need to setup backend (server) first to use the frontend. [Guide to setup server](https://github.com/PRATAP-KUMAR/news-app-back-end)
2. [Live link](https://pratap-panabaka-aconews.web.app/)

### If you need to update the frontend

```
git clone https://github.com/PRATAP-KUMAR/news-app-front-end/
cd news-app-front-end
npm install
npm run dev
```
![image](https://github.com/user-attachments/assets/c289fcb8-6a37-4563-8a63-ec85f2f99489)

![image](https://github.com/user-attachments/assets/da498b60-ac00-4233-989b-04d4f28b3d63)

## My approach to build the Aconews web app

### GNews API

1. Understood gnews api.
2. created account with gnews and got my Authorization key for API.
3. Tried few API calls on the browser.

### Express APP

1. Initiated a basic express app.
2. Created two routes one for news end point and one for top-headlines end point.
3. From the gnews api documentation, I understood that the main parameters to "search" the news with query parameters are
query string(q), language(lang) and country. This made me to think about implementing these 3 options from the
front end to request to the backend.
4. In the same way for "top-headlines" end point the main parameters to queary for are
category, language(lang) and country. So implemented these in the form of filters in the front end.
5. From the above details, Implemented two routes news and headlines.
6. Both the routes have two methods GET and POST.
7. Both the methods will still call the GNEWS API to fetch data to give response to the Frontend. [stuck here*]
GET method with default query parameters and POST method will call GNEWS api with users input as query parameters.

### React APP
1. Initiated React Vite App from my existing template.
2. Setup basic routes, '/' and '/headlines'. '/' is for news.
3. When the app starts It will make a fetch request with the express app and express app will get the data from GNEWS. [stuck here*]
4. When users searches with key words and filters with language and country in the "news" page and hit "search news" button. A request will go to express with these search parameters
and state of the articles will update based on the response and renders the new fetchd data.
5. On the headlines page, when users filters any one from category, language or country, a call to backend will go to fetch the data from "top-headlines" end point with filtered query parameters.

### Firebase Deployment (Frontend)
1. This is my first time using Firebase
2. After going through documentation and youtube videos, I could deploy Frontend with Firebase and here is the [link](https://pratap-panabaka-aconews.web.app/)

### Backend Deployment
1. I tried to deploy it with firebase and seems its asking to pay for it.
2. Tried netlify and it did not work.
3. Came across railway app and back4app. After researching I did not signup with them.
Finally could not deploy backend but still I am trying.

[stuck here*] = I got stuck at this point. I never come across with such a chaining API calls. Infact React APP it self can fetch the required data from
GNEWS without the need for server in this case. I have searched for hours and hours for this approach and found only one link which is [node-fetch](https://rapidapi.com/guides/call-apis-in-express-via-node-fetch) but it did not work.
Also many links I came across which are deprecated. Occassionally the calls from front-end to express and to GNEWS are getting success. So incase of the failure of API call, I made express app to give response
to the front-end with pre built data. I am still looking for a solution to this.

Thanks for reading this long.
