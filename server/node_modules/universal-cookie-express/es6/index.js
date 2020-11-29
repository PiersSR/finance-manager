// @ts-ignore
import Cookies from 'universal-cookie';
export default function universalCookieMiddleware() {
    return function (req, res, next) {
        req.universalCookies = new Cookies(req.headers.cookie || '');
        req.universalCookies.addChangeListener((change) => {
            if (!res.cookie || res.headersSent) {
                return;
            }
            if (change.value === undefined) {
                res.clearCookie(change.name, change.options);
            }
            else {
                const expressOpt = Object.assign({}, change.options);
                if (expressOpt.maxAge && change.options && change.options.maxAge) {
                    // the standard for maxAge is seconds but express uses milliseconds
                    expressOpt.maxAge = change.options.maxAge * 1000;
                }
                res.cookie(change.name, change.value, expressOpt);
            }
        });
        next();
    };
}
