const fs = require('fs');
const moment = require('moment');

const statsHandler = (name, action, file) => {
    fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
            console.log(err);
        } else {
            const newAction = {"action": action,
                                "product": name,
                                "time": moment().format('DD MMM YYYY, h:mm:ss a')};
            const newStats = JSON.parse(data);
            newStats.push(newAction);
            fs.writeFile(file, JSON.stringify(newStats, null, 4), (err) => {
                if (err) {
                    console.log(err);
                }
            });
        }
    });
};

module.exports = statsHandler;
