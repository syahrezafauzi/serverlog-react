## Credits
Author: Syahreza Fauzi <zauzi.office@gmail.com>
Date: 20 October 2021
Github: https://github.com/syahrezafauzi

## Getting Started

First install dependencies, only once at first run
```
yarn install
```

Then, run the development server:

```bash
npm run dev
# or
yarn dev
```



Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Demo Video 
<p align="center"> [https://youtu.be/rw0f8BtfJ64](https://youtu.be/rw0f8BtfJ64)<br /> </p>

[![Youtube](https://img.youtube.com/vi/rw0f8BtfJ64/0.jpg)](https://www.youtube.com/embed/rw0f8BtfJ64)


## Project Info
- React - [Next.js] (https://nextjs.org/)
- Custom server
- Socket.io
- Material component
- Bunyan log
- Stream

This project used to store your desired application log realtime.
`POST` text body on [http://localhost:3000/api](http://localhost:3000/api), to save log.
`GET` on [http://localhost:3000](http://localhost:3000) to see all log realtime and you can test submit save on available form.

this project may looks like chatting.

## Editing Info

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api](http://localhost:3000/api). This endpoint can be edited in `pages/api/index.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

the `/server.js` file is to handle all request before go to any controller.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
