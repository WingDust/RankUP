     const {
         PythonShell
     } = require('python-shell')
     let pyshell = new PythonShell('.\\src\\python\\GetAllWindowTitle.py', {
         mode: 'json'
     })
     // pyshell.send('gettitle')
     let listentitle = {
         title: 0
     };
     // Object.defineProperties(listentitle, 'title', {
     //     get: function() {
     //         console.log('get ', title);
     //         return title
     //     },
     //     set: function(value) {
     //         age = value
     //         console.log('set ', age);
     //     }
     // })
     pyshell.on('message', function(message) {
         console.log(message);
         return listentitle.title = message
     })
     pyshell.end(function(err, code, signal) {
         if (err) throw err
         console.log('The exit code was: ' + code)
         console.log('The exit signal was: ' + signal)
     })
     // export default {}