module.exports = {
    hideEmail: function(email) {
        var s = email.slice(0);
        var end = email.indexOf('@');
        s = s.split('');
        for(var i=2; i<end; i++) {
            s[i] = '*';
        }
        s = s.join('');
        return s;
    }
}