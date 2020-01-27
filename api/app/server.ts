import app from './app';

const PORT = process.env.PORT ? process.env.PORT : 2020;

app.listen(PORT, () => {
    console.log(`Express server listening on port ${PORT} in the ${process.env.NODE_ENV} environment`);
    console.log(`API ${process.env.API_URL}`);
})