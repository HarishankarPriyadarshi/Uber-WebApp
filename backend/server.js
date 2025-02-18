import app from './app.js'
import colors from 'colors';

const PORT = process.env.PORT || 5002
app.listen(PORT, () => {
    console.log(`server is listen on port number ${PORT}`.bgCyan.white);
}) 