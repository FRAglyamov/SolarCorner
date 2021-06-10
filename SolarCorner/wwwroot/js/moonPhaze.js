/*
 © 2017
 made for http://www.abc2home.ru/
*/
var todayall = new Date();
//(2017, 02, 02, 08, 0, 0, 0) // 2017, 01, 15, 22, 25, 0, 0
var exdate = '15 Feb 2017 22:25:00';
if (location.search.length > 1) {
    var argstr = location.search.substring(1, location.search.length);
    var args = argstr.split('&');
    for (var x in args)
        eval(decodeURI(args[x]));
    todayall = new Date(exdate)
}
;
var zod = "Овен, Телец, Близнецы, Рак, Лев, Дева, Весы, Скорпион, Стрелец, Козерог, Водолей, Рыбы, Змееносец, Кит";
var zodur = "znak_oven,znak-telets,znak-bliznetsy,znak-rak,znak_lev,znak-deva,znak-vesy,znak-skorpion,znak-strelets,znak-kozerog,znak-vodoley,znak-ryby";
var Mnfrs = "супер Луна, сильная Луна, средняя Луна, слабая Луна, микро Луна";
var phazreg = 0
    , dti = 0.5
    , idt = ''
    , TimeMachine = todayall.getTime();
var out1, int2, out2;

function getZodText(dateTimestamp) {
    todayall = new Date(dateTimestamp * 1000);
    return zod.split(",")[Math.floor(getPos().MnLong / 30)].replace(/\s/g, "");
}

function getZod(dateTimestamp) {
    todayall = new Date(dateTimestamp * 1000);
    return Math.floor(getPos().MnLong / 30);
}

function setElementTextById(id, text) {
    document.getElementById(id).innerText = text;
}

function getPos() {
    var b, c, d, f, k;
    todayall.getTimezoneOffset();
    b = todayall.getFullYear();
    c = todayall.getMonth() + 1;
    d = todayall.getDate();
    f = todayall.getHours() + todayall.getTimezoneOffset() / 60;
    k = todayall.getMinutes();
    b = day2000(b, c, d, f + k / 60);
    EcMoon = [0, 0, 0, 0];
    EqMoon = [0, 0, 0, 0];
    Nutat = [0, 0, 0, 0];
    EcMoonNut = [0, 0, 0, 0];
    EcMoon = Moon(b);
    nutat = nutation(b);
    EcMoonNut[1] = EcMoon[1] + nutat[1];
    EcMoonNut[2] = EcMoon[2] + nutat[2];
    EcMoonNut[3] = EcMoon[3] + nutat[3];
    EqMoon = equatorial(b, EcMoonNut);
    b = round(EcMoonNut[1] * RAD2DEG, 3);
    c = round(EcMoonNut[2] * RAD2DEG, 3);
    d = round(EcMoonNut[3], 0);
    f = round(EqMoon[1] / 15 * RAD2DEG, 4);
    k = round(EqMoon[2] * RAD2DEG, 3);
    7 < c && (c = round(c - 360, 3));
    return {
        MnLong: b,
        MnLat: c,
        MnDist: d,
        MnRA: f,
        MnDec: k
    }
}
function selenogr() {
    var b, c, d, f, k, m, h, n, r, g, l, e, p, t, q;
    b = todayall.getFullYear();
    k = todayall.getMonth() + 1;
    c = todayall.getDate();
    f = todayall.getHours() + todayall.getTimezoneOffset() / 60;
    l = todayall.getMinutes();
    b = day2000(b, k, c, f + l / 60) / 36525;
    c = range(280.466 + 36000.8 * b);
    d = range(357.529 + 35999 * b - 1.536E-4 * b * b + b * b * b / 2449E4);
    f = (1.915 - .004817 * b - 1.4E-5 * b * b) * dsin(d);
    f += (.01999 - 1.01E-4 * b) * dsin(2 * d);
    f += 2.9E-4 * dsin(3 * d);
    k = .99972 / (1 + (.01671 - 4.204E-5 * b - 1.236E-7 * b * b) * dcos(d + f));
    f = c + f;
    c = range(125.04 - 1934.1 * b);
    c = f - .00569 - .00478 * dsin(c);
    m = (84381.448 - 46.815 * b) / 3600;
    datan2(dsin(f) * dcos(m) - dtan(0) * dsin(m), dcos(f));
    dasin(dsin(0) * dcos(m) + dcos(0) * dsin(m) * dsin(f));
    h = range(93.2721 + 483202 * b - .003403 * b * b - b * b * b / 3526E3);
    n = range(218.316 + 481268 * b);
    r = range(125.045 - 1934.14 * b + .002071 * b * b + b * b * b / 45E4);
    g = range(134.963 + 477199 * b + .008997 * b * b + b * b * b / 69700);
    D2 = 2 * range(297.85 + 445267 * b - .00163 * b * b + b * b * b / 545900);
    b = 1 + (-20954 * dcos(g) - 3699 * dcos(D2 - g) - 2956 * dcos(D2)) / 385E3;
    f = b / k / 379.168831168831;
    l = 5.128 * dsin(h) + .2806 * dsin(g + h);
    l = l + .2777 * dsin(g - h) + .1732 * dsin(D2 - h);
    e = 6.289 * dsin(g) + 1.274 * dsin(D2 - g) + .6583 * dsin(D2);
    e = e + .2136 * dsin(2 * g) - .1851 * dsin(d) - .1143 * dsin(2 * h);
    e += .0588 * dsin(D2 - 2 * g);
    e = e + .0572 * dsin(D2 - d - g) + .0533 * dsin(D2 + g);
    e += n;
    datan2(dsin(e) * dcos(m) - dtan(l) * dsin(m), dcos(e));
    dasin(dsin(l) * dcos(m) + dcos(l) * dsin(m) * dsin(e));
    p = range(c + 180 + 180 / Math.PI * f * dcos(l) * dsin(c - e));
    t = f * l;
    I = 1.54242;
    q = e - r;
    g = dcos(q) * dcos(l);
    n = dsin(q) * dcos(l) * dcos(I) - dsin(l) * dsin(I);
    g = datan2(n, g);
    d = g - h;
    m = dasin(-dsin(q) * dcos(l) * dsin(I) - dsin(l) * dcos(I));
    q = range(p - r);
    g = dcos(q) * dcos(t);
    n = dsin(q) * dcos(t) * dcos(I) - dsin(t) * dsin(I);
    g = datan2(n, g);
    SL = range(g - h);
    SB = dasin(-dsin(q) * dcos(t) * dsin(I) - dsin(t) * dcos(I));
    h = 90 > SL ? 90 - SL : 450 - SL;
    h = 90 < h && 270 > h ? 180 - h : 90 > h ? 0 - h : 360 - h;
    g = dcos(l) * dcos(e - c);
    c = 90 - datan(g / Math.sqrt(1 - g * g));
    n = k * dsin(c);
    k = datan2(n, f - k * g);
    c = (1 + dcos(k)) / 2;
    k = round(m, 1);
    f = round(d, 1);
    l = round(SB, 1);
    e = round(SL, 1);
    d = round(h, 1);
    c = round(100 * c, 1);
    b = round(60.268511 * b * 6371, 0);
    return {
        SLatLib: k,
        SLongLib: f,
        SLatSun: l,
        SLongSun: e,
        SLongTerm: d,
        "\u041cLum": c,
        SDist: b
    }
}
var DEG2RAD = Math.PI / 180
    , RAD2DEG = 180 / Math.PI
    , TwoPi = 2 * Math.PI;
function dsin(b) {
    return Math.sin(Math.PI / 180 * b)
}
function dcos(b) {
    return Math.cos(Math.PI / 180 * b)
}
function dtan(b) {
    return Math.tan(Math.PI / 180 * b)
}
function dasin(b) {
    return 180 / Math.PI * Math.asin(b)
}
function dacos(b) {
    return 180 / Math.PI * Math.acos(b)
}
function datan(b) {
    return 180 / Math.PI * Math.atan(b)
}
function datan2(b, c) {
    var d;
    if (0 == c && 0 == b)
        return 0;
    d = datan(b / c);
    0 > c && (d += 180);
    0 > b && 0 < c && (d += 360);
    return d
}
function Moon(b) {
    b /= 36525;
    var c = b * b
        , d = c * b
        , f = d * b;
    ecliptic = [0, 0, 0, 0];
    var k = angle(297.8502042 + 445267.1115168 * b - .00163 * c + d / 545868 + f / 113065E3)
        , m = angle(357.5291092 + 35999.0502909 * b - 1.536E-4 * c + d / 2449E4)
        , h = angle(134.9634114 + 477198.8676313 * b + .008997 * c - d / 3536E3 + f / 14712E3)
        , n = angle(218.3164591 + 481267.88134236 * b - .0013268 * c + d / 538841 - f / 65194E3)
        , d = angle(93.2720993 + 483202.0175273 * b - .0034029 * c - d / 3526E3 + f / 86331E4);
    DcA = [0, 2, 2, 0, 0, 0, 2, 2, 2, 2, 0, 1, 0, 2, 0, 0, 4, 0, 4, 2, 2, 1, 1, 2, 2, 4, 2, 0, 2, 2, 1, 2, 0, 0, 2, 2, 2, 4, 0, 3, 2, 4, 0, 2, 2, 2, 4, 0, 4, 1, 2, 0, 1, 3, 4, 2, 0, 1, 2, 2];
    McA = [0, 0, 0, 0, 1, 0, 0, -1, 0, -1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, -1, 0, 0, 0, 1, 0, -1, 0, -2, 1, 2, -2, 0, 0, -1, 0, 0, 1, -1, 2, 2, 1, -1, 0, 0, -1, 0, 1, 0, 1, 0, 0, -1, 2, 1, 0, 0];
    MpcA = [1, -1, 0, 2, 0, 0, -2, -1, 1, 0, -1, 0, 1, 0, 1, 1, -1, 3, -2, -1, 0, -1, 0, 1, 2, 0, -3, -2, -1, -2, 1, 0, 2, 0, -1, 1, 0, -1, 2, -1, 1, -2, -1, -1, -2, 0, 1, 4, 0, -2, 0, 2, 1, -2, -3, 2, 1, -1, 3, -1];
    FcA = [0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, -2, 2, -2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, -2, 2, 0, 2, 0, 0, 0, 0, 0, 0, -2, 0, 0, 0, 0, -2, -2, 0, 0, 0, 0, 0, 0, 0, -2];
    ScA = [6288774, 1274027, 658314, 213618, -185116, -114332, 58793, 57066, 53322, 45758, -40923, -34720, -30383, 15327, -12528, 10980, 10675, 10034, 8548, -7888, -6766, -5163, 4987, 4036, 3994, 3861, 3665, -2689, -2602, 2390, -2348, 2236, -2120, -2069, 2048, -1773, -1595, 1215, -1110, -892, -810, 759, -713, -700, 691, 596, 549, 537, 520, -487, -399, -381, 351, -340, 330, 327, -323, 299, 294];
    ScAR = [-20905355, -3699111, -2955968, -569925, 48888, -3149, 246158, -152138, -170733, -204586, -129620, 108743, 104755, 10321, 0, 79661, -34782, -23210, -21636, 24208, 30824, -8379, -16675, -12831, -10445, -11650, 14403, -7003, 0, 10056, 6322, -9884, 5751, 0, -4950, 4130, 0, -3958, 0, 3258, 2616, -1897, -2117, 2354, 0, 0, -1423, -1117, -1571, -1739, 0, -4421, 0, 0, 0, 0, 1165, 0, 0, 8752];
    DcB = [0, 0, 0, 2, 2, 2, 2, 0, 2, 0, 2, 2, 2, 2, 2, 2, 2, 0, 4, 0, 0, 0, 1, 0, 0, 0, 1, 0, 4, 4, 0, 4, 2, 2, 2, 2, 0, 2, 2, 2, 2, 4, 2, 2, 0, 2, 1, 1, 0, 2, 1, 2, 0, 4, 4, 1, 4, 1, 4, 2];
    McB = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 1, -1, -1, -1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 1, 0, -1, -2, 0, 1, 1, 1, 1, 1, 0, -1, 1, 0, -1, 0, 0, 0, -1, -2];
    MpcB = [0, 1, 1, 0, -1, -1, 0, 2, 1, 2, 0, -2, 1, 0, -1, 0, -1, -1, -1, 0, 0, -1, 0, 1, 1, 0, 0, 3, 0, -1, 1, -2, 0, 2, 1, -2, 3, 2, -3, -1, 0, 0, 1, 0, 1, 1, 0, 0, -2, -1, 1, -2, 2, -2, -1, 1, 1, -1, 0, 0];
    FcB = [1, 1, -1, -1, 1, -1, 1, 1, -1, -1, -1, -1, 1, -1, 1, 1, -1, -1, -1, 1, 3, 1, 1, 1, -1, -1, -1, 1, -1, 1, -3, 1, -3, -1, -1, 1, -1, 1, -1, 1, 1, 1, 1, -1, 3, -1, -1, 1, -1, -1, 1, -1, 1, -1, -1, -1, -1, -1, -1, 1];
    ScB = [5128122, 280602, 277693, 173237, 55413, 46271, 32573, 17198, 9266, 8822, 8216, 4324, 4200, -3359, 2463, 2211, 2065, -1870, 1828, -1794, -1749, -1565, -1492, -1475, -1410, -1344, -1335, 1107, 1021, 833, 777, 671, 607, 596, 491, -451, 439, 422, 421, -366, -351, 331, 315, 302, -283, -229, 223, 223, -220, -220, -185, 181, -177, 176, 166, -164, 132, -119, 115, 107];
    for (var c = 1 - .002516 * b - 7.4E-6 * c, f = c * c, r = 0, g = 0, l = 0, e = 0; e < ScA.length; ++e) {
        var p = 1;
        if (1 == MpcA[e] || -1 == MpcA[e])
            p = c;
        else if (2 == MpcA[e] || -2 == MpcA[e])
            p = f;
        r += ScA[e] * Math.sin(DcA[e] * k + McA[e] * p * m + MpcA[e] * h + FcA[e] * d);
        l += ScAR[e] * Math.cos(DcA[e] * k + McA[e] * p * m + MpcA[e] * h + FcA[e] * d)
    }
    for (e = 0; e < ScB.length; ++e) {
        p = 1;
        if (1 == MpcB[e] || -1 == MpcB[e])
            p = c;
        else if (2 == MpcB[e] || -2 == MpcB[e])
            p = f;
        g += ScB[e] * Math.sin(DcB[e] * k + McB[e] * p * m + MpcB[e] * h + FcB[e] * d)
    }
    A1 = angle(119.75 + 131.849 * b);
    A2 = angle(53.09 + 479264.29 * b);
    A3 = angle(313.45 + 481266 * b);
    r += 3958 * Math.sin(A1) + 1962 * Math.sin(n - d) + 318 * Math.sin(A2);
    g += 382 * Math.sin(A3) - 2235 * Math.sin(n) + 175 * Math.sin(A1 - d) + 175 * Math.sin(A1 + d) + 127 * Math.sin(n - h) - 115 * Math.sin(n + h);
    ecliptic[1] = modrad(n + angle(r / 1E6));
    ecliptic[2] = angle(g / 1E6);
    ecliptic[3] = l / 1E3 + 385000.56;
    return ecliptic
}
function obliquity(b) {
    b /= 36525;
    return angle((84381.448 + b * (-46.815 + b * (-5.9E-4 + .001813 * b))) / 3600)
}
function nutation(b) {
    var c = b / 36525;
    b = angle(125.04452 - 1934.136261 * c);
    var d = angle(218.3165 + 481267.8813 * c)
        , f = angle(280.4665 + 36000.7698 * c)
        , c = -17.2 * Math.sin(b) - 1.32 * Math.sin(2 * f) - .23 * Math.sin(2 * d) + .21 * Math.sin(2 * b);
    b = 9.2 * Math.cos(b) + .57 * Math.cos(2 * f) + .1 * Math.cos(2 * d) - .09 * Math.cos(2 * b);
    nut = [0, 0, 0, 0];
    nut[1] = c * DEG2RAD / 3600;
    nut[2] = b * DEG2RAD / 3600;
    return nut
}
function equatorial(b, c) {
    var d = obliquity(b)
        , f = Math.cos(d)
        , d = Math.sin(d)
        , k = Math.sin(c[1])
        , m = k * f - Math.tan(c[2]) * d;
    eq = [0, 0, 0, 0];
    eq[1] = ratan2(m, Math.cos(c[1]));
    eq[2] = Math.asin(Math.sin(c[2]) * f + Math.cos(c[2]) * d * k);
    eq[3] = c[3];
    return eq
}
function ratan2(b, c) {
    var d;
    if (0 == c && 0 == b)
        return 0;
    d = Math.atan(b / c);
    0 > c && (d += Math.PI);
    0 > b && 0 < c && (d += 2 * Math.PI);
    return d
}
function angle(b) {
    return range(b) * DEG2RAD
}
function modrad(b) {
    b /= TwoPi;
    b = TwoPi * (b - ipart(b));
    0 > b && (b += TwoPi);
    return b
}
function day2000(b, c, d, f) {
    if (1 == c || 2 == c)
        --b,
            c += 12;
    a = Math.floor(b / 100);
    return 2 - a + Math.floor(a / 4) + Math.floor(365.25 * b) + Math.floor(30.6001 * (c + 1)) - 730550.5 + d + f / 24
}
function isleap(b) {
    var c;
    c = 0;
    0 == b % 4 && (c = 1);
    0 == b % 100 && (c = 0);
    0 == b % 400 && (c = 1);
    return c
}
function goodmonthday(b, c, d) {
    var f;
    f = isleap(b);
    b = 1;
    0 == d && (b = 0);
    2 == c && 1 == f && 29 < d && (b = 0);
    2 == c && 28 < d && 0 == f && (b = 0);
    (4 == c || 6 == c || 9 == c || 11 == c) && 30 < d && (b = 0);
    31 < d && (b = 0);
    return b
}
function ipart(b) {
    return 0 < b ? Math.floor(b) : Math.ceil(b)
}
function fpart(b) {
    return b % 1
}
function range(b) {
    b /= 360;
    b = 360 * (b - ipart(b));
    0 > b && (b += 360);
    return b
}
function round(b, c) {
    return Math.round(b * Math.pow(10, c)) / Math.pow(10, c)
}
function zz(b) {
    return ("" + Mps.MnLong).replace(".", ",")
}
;
function showDate(a) {
    var d = "#3490F8"
        , c = "" + a.getHours()
        , c = 2 > c.length ? "0" + c : c
        , e = "" + a.getMinutes()
        , e = 2 > e.length ? "0" + e : e;
    a.getSeconds();
    var b = "" + a.getMonth()
        , k = "" + (a.getMonth() + 1)
        , h = "" + a.getFullYear()
        , n = "" + a.getDay();
    if (1 > n || 5 < n)
        d = "#F00";
    a = "" + a.getDate();
    a = 2 > a.length ? "0" + a : a;
    1 == b && 20 == a && (d = "#3490F8");
    if (0 == b && 9 > a || 1 == b && (24 == a || 23 == a) || 2 == b && 8 == a || 4 == b && (1 == a || 8 == a || 9 == a) || 5 == b && 12 == a || 6 == a && 10 == b)
        d = "#F00";
    k = "" + a + "." + (2 > k.length ? "0" + k : k) + "." + h + " " + c + ":" + e;
    b = getmonthName(b);
    n = "\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u0438\u0435 \u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a \u0412\u0442\u043e\u0440\u043d\u0438\u043a \u0421\u0440\u0435\u0434\u0430 \u0427\u0435\u0442\u0432\u0435\u0440\u0433 \u041f\u044f\u0442\u043d\u0438\u0446\u0430 \u0421\u0443\u0431\u0431\u043e\u0442\u0430".split(" ")[n];
    d = '<a href="http://www.abc2home.ru/lunnyj_calendar/" style="text-decoration:none;"><span class="stl9 stl6">' + (2 == phazreg ? "\u0411\u0443\u0434\u0443\u0449\u0435\u0435 " : "\u0421\u0435\u0439\u0447\u0430\u0441 ") + '<span class="sc2">' + c + ":" + e + '</span><span style="color:' + d + ';">, ' + a + " " + b + " " + h + '</span> \u0433\u043e\u0434\u0430 <br /><span style="color:' + d + ';">' + n + "</span></a></span>";
    1 == phazreg && (k = '<b>' + k + "</b>");
    document.getElementById("picDate").innerHTML = k;
    document.getElementById("today").innerHTML = d
}
function phaza() {
    showDate(todayall);
    var a = getPos()
        , d = selenogr()
        , c = todayall
        , e = getNowFullYear(c)
        , b = c.getMonth() + 1
        , k = c.getDate();
    c.getTimezoneOffset();
    var h = MoonPhase(e, b, k, (c.getHours() + (c.getMinutes() - 24) / 60 - 3))
        , n = MoonMon(e, b, k, 0)
        , l = julian(e, b, k, c.getHours())
        , m = n.newm
        , p = n.fullm
        , c = m;
    m < l ? (n = MoonMon(e, b, k, 1),
        m = n.newm,
        p < l && (p = n.fullm)) : c = MoonMon(e, b, k, -1).newm;
    e = JDtoCD(m + .125 - .5 / 24 / 60);
    e = '\u041e\u0436\u0438\u0434\u0430\u0435\u043c\u043e\u0435&nbsp; <span class="novlun">\u043d\u043e\u0432\u043e\u043b\u0443\u043d\u0438\u0435</span>:  &nbsp; <span class="stl9">' + e.dd + " " + getmonthName(e.mm - 1) + " " + e.yy + ' </span> <span class="sc2"> ' + (10 > e.hh ? " 0" : " ") + e.hh + (10 > e.hm ? ":0" : ":") + e.hm + "</span>";
    b = JDtoCD(p + .125 - .5 / 24 / 60);
    b = '\u0411\u043b\u0438\u0436\u0430\u0439\u0448\u0435\u0435 \u043f\u043e\u043b\u043d\u043e\u043b\u0443\u043d\u0438\u0435: <span class="stl9">' + b.dd + " " + getmonthName(b.mm - 1) + " " + b.yy + ' </span> <span class="sc2"> ' + (10 > b.hh ? " 0" : " ") + b.hh + (10 > b.hm ? ":0" : ":") + b.hm + "</span>";
    e = m > p ? b + "<br />" + e : e + "<br />" + b;
    document.getElementById("new_moon").innerHTML = e;
    document.getElementById("svet").innerHTML = "" + h.lum + "%";
    document.getElementById("svettab").innerHTML = '\u041e\u0441\u0432\u0435\u0449\u0435\u043d\u043d\u043e\u0441\u0442\u044c \u041b\u0443\u043d\u044b: <span class="sc2">' + h.lum + "</span>%";
    var m = "", f, g;
    0 < h.kt && .25 > h.kt && (g = "1 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044c",
        m = fzstat(0));
    2 > h.lum && (f = 0,
        m = "");
    2 <= h.lum && 49 > h.lum && (f = 1);
    .25 < h.kt && .5 > h.kt && (g = "2 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044c",
        m = fzstat(1));
    49 <= h.lum && 51 > h.lum && (f = 2,
        m = "");
    51 <= h.lum && 99 > h.lum && (f = 3);
    99 <= h.lum && (f = 4,
        m = "");
    .5 < h.kt && (.75 >= h.kt && (g = "3 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044c",
        m = fzstat(2)),
        51 <= h.lum && 99 > h.lum && (f = 5),
        .75 < h.kt && 1 >= h.kt && (g = "4 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044c",
            m = fzstat(3)),
        49 <= h.lum && 51 > h.lum && (f = 6,
            m = ""),
        2 <= h.lum && 49 > h.lum && (f = 7));
    document.getElementById("stadiya").innerHTML = fznam(f);
    document.getElementById("phase_name").innerHTML = g;
    document.getElementById("vidzcop\u0443").innerHTML = '\u00a9 2016-2017 abc2home.ru <a  href="http://www.abc2home.ru/lunnyj_calendar/faza_luny_seychas.html"  style="float:right">\u0424\u0430\u0437\u044b \u041b\u0443\u043d\u044b</a>';
    document.getElementById("fzinter").innerHTML = '\u041c\u0435\u0436\u0434\u0443\u043d\u0430\u0440\u043e\u0434\u043d\u043e\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435 \u0444\u0430\u0437\u044b: <span class="stl9">' + fznamen(f) + "</span>";
    document.getElementById("stadtab").innerHTML = '\u0424\u0430\u0437\u0430 \u041b\u0443\u043d\u044b: <span class="stl9">' + fznam(f) + '</span> <b class="sc2">' + m + "</b>";
    document.getElementById("fzrus").innerHTML = '\u0420\u0443\u0441\u0441\u043a\u0438\u0439 \u043d\u0430\u0440\u043e\u0434\u043d\u044b\u0439 \u0442\u0438\u0442\u0443\u043b \u0444\u0430\u0437\u044b: <span class="stl9">' + fzrus(f) + '</span><br /> <span style="font-weight:normal; font-size:14px;"> (' + fzrusOld(f) + ")</span>";
    f = JDtoCD(c);
    f = new Date(f.yy, f.mm - 1, f.dd, f.hh, f.hm, f.hs);
    f = Math.round(todayall.getTime() - f.getTime() - 108E5) / 6E4;
    g = "";
    document.getElementById("moon_edg").innerHTML = '\u0412\u043e\u0437\u0440\u0430\u0441\u0442 \u041b\u0443\u043d\u044b: <span class="sc2"> ' + (g = "" + Math.floor(f / 1440)) + " </span> " + (2 == g.length && 1 == +g.substr(0, 1) ? "\u0434\u043d\u0435\u0439" : 1 == (g = +g.substring(g.length - 1, g.length)) ? " \u0434\u0435\u043d\u044c" : 4 >= g ? 1 < g ? "\u0434\u043d\u044f" : "\u0434\u043d\u0435\u0439" : "\u0434\u043d\u0435\u0439") + '<span class="sc2"> ' + (g = "" + Math.floor(f % 1440 / 60)) + "</span> " + (2 == g.length && 1 == +g.substr(0, 1) ? "\u0447\u0430\u0441\u043e\u0432" : 1 == (g = +g.substring(g.length - 1, g.length)) ? " \u0447\u0430\u0441" : 4 >= g ? 1 < g ? "\u0447\u0430\u0441\u0430" : "\u0447\u0430\u0441\u043e\u0432" : "\u0447\u0430\u0441\u043e\u0432") + ' <span class="sc2">' + (g = "" + Math.floor(f % 60)) + "</span>" + (2 == g.length && 1 == +g.substr(0, 1) ? " \u043c\u0438\u043d\u0443\u0442" : 1 == (g = +g.substring(g.length - 1, g.length)) ? " \u043c\u0438\u043d\u0443\u0442\u0430" : 4 >= g ? 1 < g ? " \u043c\u0438\u043d\u0443\u0442\u044b" : " \u043c\u0438\u043d\u0443\u0442" : " \u043c\u0438\u043d\u0443\u0442");
    idt = window.location.href;
    document.getElementById("moon_force").innerHTML = '\u0420\u0430\u0441\u0441\u0442\u043e\u044f\u043d\u0438\u0435 \u0434\u043e \u041b\u0443\u043d\u044b: <span class="sc2">' + d.SDist + '</span> \u043a\u043c, <span class="stl9">' + Mnfrs.split(",")[Math.floor(7.1425E-5 * d.SDist - 24.9285)] + "</span>";
    d = Math.floor(a.MnLong / 30);
    f = a.MnLong;
    var q;
    document.getElementById("zodia\u0441_name").innerHTML = zod.split(",")[d];
    document.getElementById("zodia\u0441-simbol").innerHTML = '<a href="http://www.abc2home.ru/znaki_zodiaka/' + zodur.split(",")[d] + '/"><img src="http://www.abc2home.ru/znaki_zodiaka/img/' + zodur.split(",")[d] + '-simbol.png" width="50" height="50" alt="' + zod.split(",")[d] + '" /></a>';
    30 >= f ? (g = 11,
        5 < f && 15 > f && -1 > a.MnLat && (g = 13)) : g = d - 1;
    54 < f && 90 > f ? g = 1 : 117 < f && 138 > f ? g = 3 : g;
    138 < f && 173 > f && (g = 4);
    173 < f && 217 > f && (g = 5);
    217 < f && 241 > f && (g = 6);
    241 < f && 250 > f && (g = 7);
    250 < f && 265 > f && (g = 12);
    265 < f && 300 > f && (g = 8);
    300 < f && 327 > f && (g = 9);
    327 < f && 349 > f && (g = 10);
    349 < f && 360 >= f && (g = 11);
    "bc2h" !== idt.slice(12, 16) && "ites" != idt.slice(12, 16) && "\u0447\u0442\u043e \u0437\u0430 \u0445\u0430\u043a?".reload();
    document.getElementById("moon_pos").innerHTML = '\u0417\u043d\u0430\u043a \u0437\u043e\u0434\u0438\u0430\u043a\u0430: \u041b\u0443\u043d\u0430 \u0432 \u0437\u043d\u0430\u043a\u0435 <span class="sc2"><strong> ' + zod.split(",")[d] + "</strong></span>,&nbsp;  \u03bb: " + Math.floor(a.MnLong) + "\u00b0" + (2 > (q = "" + Math.floor(a.MnLong % 1 * 60)).length ? "0" + q : q) + '&rsquo; <br />\u0421\u043e\u0437\u0432\u0435\u0437\u0434\u0438\u0435: \u041b\u0443\u043d\u0430 \u0432\u0438\u0434\u043d\u0430 \u0432 <span class="stl9">\u0441\u043e\u0437\u0432\u0435\u0437\u0434\u0438\u0438 ' + zod.split(",")[g] + "</span>";
    dti = h.kt;
    1 == phazreg && (setTimeout(phaza, 1E3),
        todayall = new Date);
    2 == phazreg && (setTimeout(phaza, 1E3),
        todayall = new Date(TimeMachine),
        TimeMachine += 18060500)
}
phaza();
function redraw() {
    RL = 125;
    fdelay = 1E3;
    window.onclick = can.init;
    phazreg += 1;
    phaza();
    2 < phazreg && (phazreg = 0)
}
function decTomin(a) {
    var d;
    return 2 > (d = "" + Math.abs(Math.floor(a % 1 * 60))).length ? "0" + d : d
}
function fzrusOld(a) {
    return "\u043c\u0435\u0436\u043b\u0443\u043d\u0438\u0435, \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u0435 \u041b\u0443\u043d\u044b, \u0431\u0435\u0437\u043b\u0443\u043d\u043d\u044b\u0435 \u043d\u043e\u0447\u0438;\u041d\u043e\u0432\u0438\u043a, \u043d\u0430\u0440\u043e\u0434\u0438\u0432\u0448\u0438\u0439\u0441\u044f \u041c\u0435\u0441\u044f\u0446, \u0440\u0430\u043d\u043d\u0438\u0439 \u0441\u0435\u0440\u043f;\u043c\u043e\u043b\u043e\u0434\u0430\u044f \u041f\u043e\u043b\u043e\u0432\u0438\u043d\u043a\u0430, \u041a\u0440\u0430\u044e\u0448\u043a\u0430;\u0442\u043e\u043b\u0441\u0442\u044b\u0439 \u041c\u0435\u0441\u044f\u0446, \u041b\u0443\u043d\u0430 \u043d\u0430 \u0441\u043d\u043e\u0441\u044f\u0445;\u043a\u0440\u0443\u0433\u043b\u043e\u043b\u0438\u0446\u0430\u044f \u041b\u0443\u043d\u0430, \u043a\u0440\u0443\u0433\u043b\u0430\u044f \u041b\u0443\u043d\u0432;\u041b\u0443\u043d\u0430 \u0432 \u0443\u0431\u044b\u0442\u043a\u0435, \u043f\u0443\u0437\u0430\u0442\u044b\u0439 \u043c\u0435\u0441\u044f\u0446 \u043d\u0430 \u0443\u0431\u044b\u043b\u0438;\u0441\u0442\u0430\u0440\u0448\u0430\u044f \u041f\u043e\u043b\u043e\u0432\u0438\u043d\u043a\u0430;\u0432\u0435\u0442\u0445\u0438\u0439 \u043c\u0435\u0441\u044f\u0446, \u0443\u0449\u0435\u0440\u0431\u043d\u044b\u0439 \u0441\u0435\u0440\u043f, \u0443\u0431\u044b\u043b\u044c".split(";")[a]
}
function fzrus(a) {
    return "\u041d\u043e\u0432\u0430\u044f \u041b\u0443\u043d\u0430; \u041c\u043e\u043b\u043e\u0434\u043e\u0439 \u041c\u0435\u0441\u044f\u0446; \u041f\u043e\u043b\u043e\u0432\u0438\u043d\u0430 \u041b\u0443\u043d\u044b; \u041f\u043e\u043b\u043d\u0435\u044e\u0449\u0430\u044f \u041b\u0443\u043d\u0430; \u041f\u043e\u043b\u043d\u0430\u044f \u041b\u0443\u043d\u0430; \u0423\u0449\u0435\u0440\u0431\u043d\u0430\u044f \u041b\u0443\u043d\u0430; \u0422\u0440\u0438 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438;  \u0421\u0442\u0430\u0440\u044b\u0439 \u043c\u0435\u0441\u044f\u0446".split(";")[a]
}
function fzstat(a) {
    return ["\u0432 1-\u0439 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438", " \u0432\u043e 2-\u0439 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438", " \u0432 3-\u0439 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438", " \u0432 \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0435\u0439 \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u0438"][a]
}
function fznamen(a) {
    return "New moon; Waxing crescent; First quarter; Waxing gibbous; Full moon; Waning gibbous; Last quarter; Waning crescent".split(";")[a]
}
function fznam(a) {
    return "\u041d\u043e\u0432\u043e\u043b\u0443\u043d\u0438\u0435; \u0420\u0430\u0441\u0442\u0443\u0449\u0430\u044f \u041b\u0443\u043d\u0430; \u0427\u0435\u0442\u0432\u0435\u0440\u0442\u044c \u0440\u043e\u0432\u043d\u043e; \u0420\u0430\u0441\u0442\u0443\u0449\u0430\u044f \u041b\u0443\u043d\u0430; \u041f\u043e\u043b\u043d\u043e\u043b\u0443\u043d\u0438\u0435; \u0423\u0431\u044b\u0432\u0430\u044e\u0449\u0430\u044f \u043b\u0443\u043d\u0430;  \u041f\u043e\u0441\u043b\u0435\u0434\u043d\u044f\u044f \u0447\u0435\u0442\u0432\u0435\u0440\u0442\u044c; \u0423\u0431\u044b\u0432\u0430\u044e\u0449\u0430\u044f".split(";")[a]
}
function getmonthName(a) {
    return "\u044f\u043d\u0432\u0430\u0440\u044f \u0444\u0435\u0432\u0440\u0430\u043b\u044f \u043c\u0430\u0440\u0442\u0430 \u0430\u043f\u0440\u0435\u043b\u044f \u043c\u0430\u044f \u0438\u044e\u043d\u044f \u0438\u044e\u043b\u044f \u0430\u0432\u0433\u0443\u0441\u0442\u0430 \u0441\u0435\u043d\u0442\u044f\u0431\u0440\u044f \u043e\u043a\u0442\u044f\u0431\u0440\u044f \u043d\u043e\u044f\u0431\u0440\u044f \u0434\u0435\u043a\u0430\u0431\u0440\u044f".split(" ")[a]
}
function MoonPhase(a, d, c, e) {
    d = (dayno(a, d, c, e) + 2451543.5 - 2451545) / 36525;
    c = d * d;
    e = c * d;
    var b = e * d;
    a = 297.8501921 + 445267.1114034 * d - .0018819 * c + e / 545868 - b / 113065E3;
    b = 134.9633964 + 477198.8675055 * d + .0087414 * c + e / 69699 - b / 14712E3;
    d = 357.5291092 + 35999.0502909 * d - 1.536E-4 * c + e / 2449E4;
    c = 180 - a - 6.289 * sind(b) + 2.1 * sind(d) - 1.274 * sind(2 * a - b) - .658 * sind(2 * a) - .214 * sind(2 * b) - .11 * sind(a);
    a = rev(c);
    d = .5 < a / 360 ? 1.5 - a / 360 : .5 - a / 360;
    c = Math.round(100 * (1 + cosd(c)) / 2);
    return {
        kt: d,
        lum: c,
        an: a
    }
}
function MoonMon(a, d, c, e) {
    d = Math.floor(12.3685 * (a + (d - 1 + c / 30) / 12 - 2E3) + e);
    var b = d / 1236.85;
    c = 1 - .002516 * b - 7.4E-6 * b * b;
    var k, h, n, l = [];
    e = 2451550.09765 + 29.530588853 * d + 1.337E-4 * b * b - 1.5E-7 * b * b * b + 7.3E-10 * b * b * b * b - 58.184 / 86400;
    var m = function (a) {
        k = rev(2.5534 + 29.10535669 * a - 2.18E-5 * b * b);
        MP = rev(201.5643 + 385.81693528 * a + .0107438 * b * b + 1.239E-5 * b * b * b - 1.1E-7 * b * b * b);
        h = rev(160.7108 + 390.67050274 * a - .0016341 * b * b - 2.27E-6 * b * b * b + 1.1E-8 * b * b * b * b);
        n = rev(124.7746 - 1.5637558 * a + .0020691 * b * b + 2.15E-6 * b * b * b);
        l[1] = rev(299.77 + .107408 * a - .009173 * b * b);
        l[2] = rev(251.88 + .016321 * a);
        l[3] = rev(251.83 + 26.651886 * a);
        l[4] = rev(349.42 + 36.412478 * a);
        l[5] = rev(84.88 + 18.206239 * a);
        l[6] = rev(141.74 + 53.303771 * a);
        l[7] = rev(207.14 + 2.453732 * a)
    };
    m(d);
    var p = e - .4072 * sind(MP) + .17241 * c * sind(k) + .01608 * sind(2 * MP) + .01039 * sind(2 * h) + .00739 * c * sind(MP - k) - .00514 * c * sind(MP + k) + .00208 * c * c * sind(2 * k) - .00111 * sind(MP - 2 * h) - 5.7E-4 * sind(MP + 2 * h) + 5.6E-4 * c * sind(2 * MP + k) - 4.2E-4 * sind(3 * MP) + 4.2E-4 * c * sind(k + 2 * h) + 3.8E-4 * c * sind(k - 2 * h) - 2.4E-4 * c * sind(2 * MP - k) - 1.7E-4 * sind(n) - 7E-5 * sind(MP + 2 * k);
    a = p + 3.25E-4 * sind(l[1]) + 1.65E-4 * sind(l[2]) + 1.64E-4 * sind(l[3]) + 1.26E-4 * sind(l[4]) + 1.1E-4 * sind(l[5]) + 6.2E-5 * sind(l[6]) + 6E-5 * sind(l[7]);
    m(d + .5);
    p = e + 14.7652944265 - .40614 * sind(MP) + .17302 * c * sind(k) + .01614 * sind(2 * MP) + .01043 * sind(2 * h) + .00734 * c * sind(MP - k) - .00515 * c * sind(MP + k) + .00209 * c * c * sind(2 * k) - .00111 * sind(MP - 2 * h) - 5.7E-4 * sind(MP + 2 * h) + 5.6E-4 * c * sind(2 * MP + k) - 4.2E-4 * sind(3 * MP) + 4.2E-4 * c * sind(k + 2 * h) + 3.8E-4 * c * sind(k - 2 * h) - 2.4E-4 * c * sind(2 * MP - k) - 1.7E-4 * sind(n) - 7E-5 * sind(MP + 2 * k);
    d = p + 3.25E-4 * sind(l[1]) + 1.65E-4 * sind(l[2]) + 1.64E-4 * sind(l[3]) + 1.26E-4 * sind(l[4]) + 1.1E-4 * sind(l[5]) + 6.2E-5 * sind(l[6]) + 6E-5 * sind(l[7]);
    return {
        newm: a,
        fullm: d
    }
}
function getNowFullYear(a) {
    a = a.getYear();
    0 == a && (a = 2E3);
    1900 > a && (a += 1900);
    return a
}
function getDatStr(a, d, c) {
    return "" + (10 > c ? "0" : "") + c + (10 > d ? ".0" : ".") + d + "." + a
}
function rev(a) {
    return a - 360 * Math.floor(a / 360)
}
function sind(a) {
    return Math.sin(a * Math.PI / 180)
}
function cosd(a) {
    return Math.cos(a * Math.PI / 180)
}
function tand(a) {
    return Math.tan(a * Math.PI / 180)
}
function asind(a) {
    return 180 / Math.PI * Math.asin(a)
}
function acosd(a) {
    return 180 / Math.PI * Math.acos(a)
}
function atan2d(a, d) {
    return 180 / Math.PI * Math.atan(a / d) - 180 * (0 > d)
}
function dayno(a, d, c, e) {
    return 367 * a - Math.floor(7 * (a + Math.floor((d + 9) / 12)) / 4) + Math.floor(275 * d / 9) + c - 730530 + e / 24
}
function julian(a, d, c, e) {
    return dayno(a, d, c, e) + 2451543.5
}
function JDtoCD(a) {
    var d = Math.floor(a + .5);
    if (2299161 > d)
        var c = d;
    else
        c = Math.floor((d - 1867216.25) / 36524.25),
            c = d + 1 + c - Math.floor(c / 4);
    var e = c + 1524
        , c = Math.floor((e - 122.1) / 365.25)
        , b = Math.floor(365.25 * c)
        , k = Math.floor((e - b) / 30.6001)
        , e = e - b - Math.floor(30.6001 * k) + (a + .5 - d)
        , d = 14 > k ? k - 1 : k - 13
        , k = Math.floor(e)
        , b = 24 * (e - k)
        , e = Math.floor(b)
        , h = 60 * (b - e)
        , b = Math.floor(h)
        , h = Math.round(60 * (h - b));
    60 <= h && (b += 1,
        h -= 60);
    60 <= b && (e += 1,
        b = 0);
    return {
        yy: 2 < d ? c - 4716 : c - 4715,
        mm: d,
        dd: k,
        wd: Math.floor(a + 1.5) - 7 * Math.floor((a + 1.5) / 7),
        hh: e,
        hm: b,
        hs: h
    }
}
;