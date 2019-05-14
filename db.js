import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

const adapter = new FileSync('db.json');
const DB = low(adapter);
DB.defaults({ instaData: [], twitData: []})
    .write();

function getDb() {
    return DB;
}



export {
    getDb
}