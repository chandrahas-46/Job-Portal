export const setLastVisit = (req, res, next) => {
    // 1. if cookie is set, then add a local variable with last visit time data.
    // client sending the request back
    if(req.cookies.lastVisit){      // {lastVisit}: cookies name
        res.locals.lastVisit = new Date(req.cookies.lastVisit).toLocaleString();
    }

    // Send cookie to the client
    res.cookie('lastVisit', new Date().toISOString(), {
        maxAge: 2*24*60*60+1000           // 2days
    });
    next();
};