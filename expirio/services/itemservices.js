// splits items array into expired and undexpired
function splitExpr(items){
    currDate = new Date();
    exprItems = items.filter( elem => elem.expireDate <= currDate);
    goodItems = items.filter( elem => elem.expireDate > currDate);
    return [exprItems, goodItems];
}

module.exports = {splitExpr}