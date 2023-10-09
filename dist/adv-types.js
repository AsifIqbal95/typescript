"use strict";
var _a;
let e1 = {
    name: 'A',
    priveledges: ['B', 'C'],
    startDate: new Date()
};
let a = 1;
function combine(a, b) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}
let result = combine('A', 'B');
let result1 = combine(1, 2);
result.split('');
let user = {
    id: 1,
    name: 'sample',
    job: { 'level': 'AD', 'desig': 'ceo' }
};
let des = (_a = user === null || user === void 0 ? void 0 : user.job) === null || _a === void 0 ? void 0 : _a.desig;
//# sourceMappingURL=adv-types.js.map