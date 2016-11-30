db = connect("localhost:27017/kf");

function pad(n) {
    return Number(n) < 10 ? '0' + n : n;
}

function isNumeric(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

var dates = db.transactions.find({ Datum: { $type: 2, $ne: '' }}); //.limit(20);
dates.forEach(function(x) {
    var date = x.Datum.split('.');
    if (date.length !== 3) return;
    if (!isNumeric(date[0]) || !isNumeric(date[0]) || !isNumeric(date[0])) return;
    var iso = date[2] + '-' + pad(date[1]) + '-' + pad(date[0]) + 'T00:00:00.000Z';
    x.Datum = new ISODate(iso);
    db.transactions.save(x);
    //printjson(isoDate);
});

