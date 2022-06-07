import { app } from './app';
import { config } from 'dotenv';

const serverRunningLog = () => console.log(`Server is Running`);

app.listen(process.env.SERVER_PORT, () => {
  serverRunningLog();
});
